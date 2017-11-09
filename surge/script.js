function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,         function(m,key,value) {
      vars[key] = value;
    });
  return vars;
}
var ct = 1;
var userName = getUrlVars()['name'] || 'Player';
var avatarID = getUrlVars()['avatar'] || 3;
var reset = getUrlVars()['reset'];

console.log(reset);



var replacePlus = function (str) {
  return str.replace(/\+/g, ' ');
}

userName = replacePlus(userName);



var heroProx = 'https://g-blackjackapi.herokuapp.com/api/deck/';
var heroDex = 'https://g-blackjackapi.herokuapp.com/api/deck/new/shuffle/?deck_count=6';
var myID = 'i17qib8s5tgt';



// var xhr = $.getJSON(heroDex);
var xhr = $.getJSON(heroProx+myID+'/shuffle/');


var deckID, card, cardValue, hiddenID, dealerDisplay, playerCt, dealerCt;
var potAmt = 0;
var betAmt = 0;

// let userName = JSON.parse(localStorage.getItem('userName')) || {name: }
let dealerWins = JSON.parse(localStorage.getItem('dealerWins')) || { wins: 0 };
let userWins = JSON.parse(localStorage.getItem('userWins')) || { wins: 0 };

let playerChips = JSON.parse(localStorage.getItem('playerChips')) || {chips: 1000};
console.log(playerChips);




var playerArr = [];
var dealerArr = [];


$('document').ready(function () {
  chipCt = parseInt(JSON.stringify(playerChips));

  if (!chipCt) {
    chipCt = parseInt(JSON.stringify(playerChips.chips));
  }

  console.log(chipCt);


  $('#player-name').text(userName);
  $('.player-info').prepend($('<img>',{src:'img/avatars/'+avatarID+'.png', class:'avatar'}))

  var updateText = function () {
    $('.chip-count').text(`Chips: ${chipCt}`);
    $('#bet-val').text(betAmt);
  }

  function checkReset (reset) {
    if (reset === 'yes') {
      localStorage.setItem('playerChips', JSON.stringify(1000));
      localStorage.setItem('dealerWins', JSON.stringify(0));
      localStorage.setItem('userWins', JSON.stringify(0));
    }
  }
  checkReset(reset);

  var initialize = function () {
    betAmt += 10;
    chipCt -= 10;
    $('.chip-container').append($('<img>', {src:'img/chip.png', class:'chip-img', id:`10`}))
    updateText();
  }

  var aceReplace = function (arr) {
    var out = [];
    var aceCt = 0;
    for (let card of arr) {
        if (card === 'ACE') {
          aceCt ++;
        } else {
          out.push(card);
        }
      }
    for (let i=0; i<aceCt; i++) {out.push('ACE')}
    return out;
  }

  var getValue = function (arr) {
    arr = aceReplace(arr);
    var arrVal = 0;
    for (let card of arr) {
      if (card === 'ACE')  {
        if (arrVal + 11 > 21) {
          arrVal += 1;
        } else {
          arrVal += 11;
        }
      } else if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
        arrVal += 10;
      } else {
        arrVal += parseInt(card);
      }
    }
    return arrVal;
  }

  var updatePlayerCount = function () {
    playerCt = getValue(playerArr);
    $('.player-counter').text(`Count: ${playerCt}`);
  }

  var updateDealerCount = function () {
    dealerCt = getValue(dealerArr);
    $('.dealer-counter').text(`Count: ${dealerCt}`);
  }

  updateText();
  initialize();


  xhr.done(function (data) {
    deckID = data.deck_id;
  });

  var deal = function () {
    $('.chip-container').append($('<img>', {src:'img/chip.png', class:'chip-img', id:`10`}))
    updateText();

    $('#bet-more').prop("hidden", true);
    $('#bet-less').prop("hidden", true);
    // $('#confirm-bet').prop("hidden", false);
    $('#deal').prop("hidden", true);
    // $('.pot-tracker').prop("hidden", false);
    // $('.bet-tracker').prop("hidden", false);
    // $('#check-score').prop("hidden", true);
    // $('#right-block').css('display', 'block');
    $('#hit').prop("hidden", false);
    $('#stay').prop("hidden", false);
    $('.def-img').empty();
    $('.dealer-card-container').append($('<img>',{src:'img/back1.jpg', class:'card-img', id:'placeholder'}));

    var drawFour = heroProx+myID+'/draw/?count=4';
    var drawXHR = $.getJSON(drawFour);
    drawXHR.done(function (drawFourData) {

      $('.dealer-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawFourData.cards[3].code+'.png', class:'card-img'}));
      hiddenID = drawFourData.cards[1].code;

      for (let i=0; i<4; i++) {
        var card = drawFourData.cards[i].value;

        if (i % 2 === 0) {
          $('.player-card-container').append($('<img>',{id:`img${i}`,src:'http://deckofcardsapi.com/static/img/'+drawFourData.cards[i].code+'.png', class:'card-img'}));
          playerArr.push(card);
        } else {
          dealerArr.push(card);
        }
      }
      updatePlayerCount();
      dealerCt = getValue(dealerArr.slice(1));
      $('.dealer-counter').text(`Count: ${dealerCt}`);

    });
    updateText();
  };





  // var draw = function () {
  //   var drawOne = heroProx+myID+'/draw/?count=1';
  //   var drawXHR = $.getJSON(drawOne);
  //   drawXHR.done(function (drawOneData) {
  //     card = drawOneData.cards[0].value;
  //   })
  //   return card;
  // }
  function getRand () {
    return Math.floor(Math.random() * 5 + 1);
  }

  function hitAud() {
    var rI = getRand();
    var hit = $(`#hit-${rI}`);
    hit[0].play();
  }

  function stayAud() {
    var rI = getRand();
    var stay = $(`#stay-${rI}`);
    stay[0].play();
  }


  var hit = function(event) {
    hitAud();
    var drawOne = heroProx+myID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      card = drawOneData.cards[0].value;
      playerArr.push(card);
      updatePlayerCount();
      $('.player-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawOneData.cards[0].code+'.png', class:'card-img'}))
      setTimeout(checkPlayer(), 2000);
    });
  };

  var dealerHit = function(event) {

    var drawOne = heroProx+myID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      card = drawOneData.cards[0].value;
      dealerArr.push(card);
      // $('.dealer-counter').text(getValue(dealerArr));
      updateDealerCount();
      $('.dealer-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawOneData.cards[0].code+'.png', class:'card-img'}))
      setTimeout(checkDealer(), 2000);
    });
  };





  var checkDealer = function () {
    dealerCt = getValue(dealerArr);
    playerCt = getValue(playerArr);
    setTimeout(function () {
      if (dealerCt < playerCt) {
      dealerHit();
      } else if (dealerCt > 21) {
        // $('#dealer-bust').css('display', 'block');
        $('.dealer-counter').append(' - BUST');
        end();
      } else {
        end();
      }
    }, 1250);
  }

  var checkPlayer = function () {
    setTimeout(function () {
      if (playerCt > 21) {
        // $('#player-bust').css('display', 'block');
        $('.player-counter').append(' - BUST');
        end();
        // figure out a way to overlay the bust img over top of the cards?
      }
    }, 500);
  }

  var end = function () {
    $('#stay').prop('hidden', true);
    $('#hit').prop('hidden', true);
    if (playerCt > 21) {
      swal(`${userName} busted!`, "Dealer wins.", 'error');
      updateText();
      dealerWins.wins ++;
      localStorage.setItem('playerChips', JSON.stringify(chipCt));
      localStorage.setItem('dealerWins', JSON.stringify(dealerWins));
    } else if (dealerCt > 21) {
      swal(`${userName} wins!`, "Dealer busted.", "success");
      chipCt += betAmt*2;
      updateText();
      localStorage.setItem('playerChips', JSON.stringify(chipCt));
      userWins.wins ++;
      localStorage.setItem('userWins', JSON.stringify(userWins))

    } else if (playerCt === dealerCt) {
      chipCt += betAmt;
      swal({
        text: `It's a tie! (${dealerCt})`,
        type: 'warning',
      });
    } else {
      updateText();
      swal({
        text:`Dealer (${dealerCt}) beats ${userName} (${playerCt}).`,
        type:'error',
      });
      dealerWins.wins ++;
      localStorage.setItem('playerChips', JSON.stringify(chipCt));
      localStorage.setItem('dealerWins', JSON.stringify(dealerWins));
    }

    setTimeout (function () {
      betAmt = 0;
      ct = 1;
      $('.player-card-container').empty();
      $('.dealer-card-container').empty();
      $('.def-img').append($("<img src='img/back1.jpg' class='default-img'/>"));
      dealerArr = [];
      updateDealerCount();
      playerArr = [];
      updatePlayerCount();
      $('#dealer-playing').prop("hidden", true);
      $('.chip-container').empty()
      $('#deal').prop("hidden", false);
      $('#check-score').prop("hidden", false);
      // $('.bet-tracker').prop("hidden", true);
      initialize();
      $('#bet-more').prop("hidden", false);
      $('#bet-less').prop("hidden", false);
      updateText();
  }, 1500);
  }

  var stay = function () {
    stayAud();
    $('#placeholder').remove();
    $('#hit').prop("hidden", true);
    $('#stay').prop("hidden", true);
    $('#dealer-playing').prop("hidden", false);
    $('.dealer-card-container').prepend($('<img>',{src:'http://deckofcardsapi.com/static/img/'+hiddenID+'.png', class:'card-img'}));
    $('.dealer-counter').text(getValue(dealerArr));
    setTimeout(checkDealer(), 1000);
  }


  var checkScore = function (event) {
    swal(`${userName}: ${userWins.wins} wins.<br>Dealer: ${dealerWins.wins} wins.`)
  }



  var betMore = function (event) {
    if (betAmt < 91) {
      ct ++;
      console.log(ct);
      chipCt -= 10;
      betAmt += 10;
      $('.chip-container').append($('<img>', {src:'img/chip.png', class:'chip-img', id:`${ct}`}));
    }

    updateText();
  }

  var betLess = function (event) {
    if (betAmt > 10) {
      $(`#${ct}`).remove();
      ct--;
      chipCt += 10;
      betAmt -= 10;

    }

    updateText();
  }

  // var confirmBet = function (event) {
  //   $('#bet-more').prop("hidden", true);
  //   $('#bet-less').prop("hidden", true);
  //   $('#confirm-bet').prop("hidden", true);

  // }





  $('#hit').click(hit);
  $('#stay').click(stay);
  $('#deal').click(deal);
  $('.player-info').click(checkScore);
  $('#bet-more').click(betMore);
  $('#bet-less').click(betLess);
  // $('#confirm-bet').click(confirmBet);







})







// var deckAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
