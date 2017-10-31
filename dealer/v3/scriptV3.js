var heroProx = 'https://g-blackjackapi.herokuapp.com/api/deck/';
var heroDex = 'https://g-blackjackapi.herokuapp.com/api/deck/new/shuffle/?deck_count=6';
var myID = 'i17qib8s5tgt';


// var xhr = $.getJSON(heroDex);
var xhr = $.getJSON(heroProx+myID+'/shuffle/');


var deckID, card, cardValue, hiddenID, dealerDisplay, playerCt, dealerCt;

var playerArr = [];
var dealerArr = [];


$('document').ready(function () {

  xhr.done(function (data) {
    deckID = data.deck_id;
    console.log(data);
  });

  var deal = function () {
    $('#hit').prop("hidden", false);
    $('#stay').prop("hidden", false);
    $('#deal').prop("hidden", true);
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

  var getValue = function (arr) {
    arr.sort();
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
    } else if (dealerCt > 21) {
      alert("Dealer busts.\nPlayer wins!");
    } else if (playerCt > dealerCt) {
      alert(`Player (${playerCt}) beats dealer (${dealerCt})!`);
    } else if (playerCt === dealerCt) {
      alert(`It's a tie! (${dealerCt})`);
    } else {
      alert(`Dealer (${dealerCt}) beats player (${playerCt}).`);
    }
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
    $('#deal').prop("hidden", false);
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





  $('#hit').click(hit);
  $('#stay').click(stay);
  $('#deal').click(deal);






})







// var deckAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
