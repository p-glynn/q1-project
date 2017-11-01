var heroProx = 'https://g-blackjackapi.herokuapp.com/api/deck/';
var heroDex = 'https://g-blackjackapi.herokuapp.com/api/deck/new/shuffle/?deck_count=6';
var myID = 'i17qib8s5tgt';


// Daenerys Stormborn of the House Targaryen, First of Her Name, the Unburnt, Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea, Breaker of Chains, and Mother of Dragons

//ken-mode?

// var xhr = $.getJSON(heroDex);
var xhr = $.getJSON(heroProx+myID+'/shuffle/');


var deckID, card, cardValue, hiddenID, dealerDisplay, playerCt, dealerCt;

let dealerWins = JSON.parse(localStorage.getItem('dealerWins')) || { wins: 0 };
let userWins = JSON.parse(localStorage.getItem('userWins')) || { wins: 0 };

var playerArr = [];
var dealerArr = [];

var userName = prompt('Enter your username:', 'Player');
var resetLocal = prompt('Type "reset" to reset user wins/losses (if you are a new user)')

function capitalize (str) {
  var nameArr = [];
  for (let i of str) { nameArr.push(i) }
  nameArr[0] = nameArr[0].toUpperCase();
  return nameArr.join('');
}




console.log("user >>", userName);


$('document').ready(function () {

  function checkReset (str) {
    if (str.toLowerCase() === 'reset') {
      localStorage.removeItem('dealerWins');
      localStorage.removeItem('userWins');
    }
  }

  $('#player-name').text(capitalize(userName));
  checkReset(resetLocal);

  xhr.done(function (data) {
    deckID = data.deck_id;
    console.log(data);
  });

  var deal = function () {
    $('#hit').prop("hidden", false);
    $('#stay').prop("hidden", false);
    $('#deal').prop("hidden", true);
    $('#check-score').prop("hidden", true);
    $('.default').empty();
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
      playerCt = getValue(playerArr);
      dealerCt = getValue(dealerArr.slice(1));
      $('.player-counter').text(playerCt);
      $('.dealer-counter').text(dealerCt);

      console.log(playerArr, "player ct>>", playerCt);
      console.log(dealerArr, "dealer ct>>", dealerCt);
    });
  };

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
    console.log(aceCt);
    return out;
  } //check out re-factoring this function later on

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
    console.log("current val >>>", arrVal);
    return arrVal;
  }

  var hit = function(event) {
    var drawOne = heroProx+myID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      card = drawOneData.cards[0].value;
      playerArr.push(card);
      playerCt = getValue(playerArr);
      console.log(playerCt);

      $('.player-counter').text(playerCt);
      $('.player-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawOneData.cards[0].code+'.png', class:'card-img'}))
      setTimeout(checkPlayer(), 1000);
    });
  };

  var dealerHit = function(event) {

    var drawOne = heroProx+myID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      card = drawOneData.cards[0].value;
      dealerArr.push(card);
      // console.log(getValue(dealerArr));
      $('.dealer-counter').text(getValue(dealerArr));
      $('.dealer-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawOneData.cards[0].code+'.png', class:'card-img'}))
      setTimeout(checkDealer(), 1000);
    });
  };





  var checkDealer = function () {
    dealerCt = getValue(dealerArr);
    setTimeout(function () {
      if (dealerCt < 17) {
      dealerHit();
    } else if (dealerCt > 21) {
        $('.dealer-card-container').empty();
        $('.dealer-card-container').append($("<img src='img/bust.png' class='bust-img'/>"));
        $('.dealer-counter').append(' - BUST');
        end();
      } else {
        end();
      }
    }, 850);
  }

  var checkPlayer = function () {
    setTimeout(function () {
      if (playerCt > 21) {
        $('.player-card-container').empty();
        $('.player-card-container').append($("<img src='img/bust.png' class='bust-img'/>"));
        $('.player-counter').append(' - BUST');
        end();
        // figure out a way to overlay the bust img over top of the cards?
      }
    }, 500);
  }

  var end = function () {
    console.log("PC >>>", playerCt);
    console.log("DC >>>", dealerCt);
    if (playerCt > 21) {
      alert("Player busts!\nDealer wins.");
      dealerWins.wins ++;
      localStorage.setItem('dealerWins', JSON.stringify(dealerWins));
    } else if (dealerCt > 21) {
      alert("Dealer busts.\nPlayer wins!");
      userWins.wins ++;
      localStorage.setItem('userWins', JSON.stringify(userWins))
    } else if (playerCt > dealerCt) {
      alert(`Player (${playerCt}) beats dealer (${dealerCt})!`);
      userWins.wins ++;
      localStorage.setItem('userWins', JSON.stringify(userWins))
    } else if (playerCt === dealerCt) {
      alert(`It's a tie! (${dealerCt})`);
    } else {
      alert(`Dealer (${dealerCt}) beats player (${playerCt}).`);
      dealerWins.wins ++;
      localStorage.setItem('dealerWins', JSON.stringify(dealerWins));
    }
    console.log("user wins >>", userWins);
    console.log("dealer wins >>", dealerWins);
    setTimeout (function () {
    $('.player-card-container').empty();
    $('.dealer-card-container').empty();
    $('.default').append($("<img src='img/back1.jpg' class='default-img'/>"));
    dealerArr = [];
    dealerCt = getValue(dealerArr);
    $('.dealer-counter').text(dealerCt);
    playerArr = [];
    playerCt = getValue(playerArr);
    $('.player-counter').text(playerCt);
    $('#dealer-playing').prop("hidden", true);
    $('#stay').prop('hidden', true);
    $('#hit').prop('hidden', true);
    $('#deal').prop("hidden", false);
    $('#check-score').prop("hidden", false);
  }, 1500);
  }

  var stay = function () {
    $('#placeholder').remove();
    $('#hit').prop("hidden", true);
    $('#stay').prop("hidden", true);
    $('#dealer-playing').prop("hidden", false);
    $('.dealer-card-container').prepend($('<img>',{src:'http://deckofcardsapi.com/static/img/'+hiddenID+'.png', class:'card-img'}));
    $('.dealer-counter').text(getValue(dealerArr));
    setTimeout(checkDealer(), 1000);
  }


  var checkScore = function (event) {
    alert(`${userName}: ${userWins.wins} wins.\nDealer: ${dealerWins.wins} wins.`)
  }


  $('#hit').click(hit);
  $('#stay').click(stay);
  $('#deal').click(deal);
  $('#check-score').click(checkScore);






})







// var deckAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
