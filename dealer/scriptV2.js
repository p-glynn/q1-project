var heroProx = 'https://g-blackjackapi.herokuapp.com/api/deck/';
var heroDex = 'https://g-blackjackapi.herokuapp.com/api/deck/new/shuffle/?deck_count=6';
var myID = 'i17qib8s5tgt';


// var xhr = $.getJSON(heroDex);
var xhr = $.getJSON(heroProx+myID+'/shuffle/');


var deckID, card, cardValue;
var playerCounter = 0;
var dealerCounter = 0;
var dealerDisplay = 0;
// var cardValue;
var cardArr = [];
var scoreArr = [];
var hiddenID;


$('document').ready(function () {

  xhr.done(function (data) {
    deckID = data.deck_id;
    console.log(data);
  });

  var hit = function(event) {
    var drawOne = heroProx+myID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      card = drawOneData.cards[0].value;
      if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
        playerCounter += 10;
      } else if (card === 'ACE') {
        if (playerCounter + 11 > 21) {
          playerCounter += 1;
        } else {
          playerCounter += 11;
        }
      } else {
        playerCounter += parseInt(card)
      }
      $('.player-counter').text(playerCounter);
      $('.player-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawOneData.cards[0].code+'.png', class:'card-img'}))
      setTimeout(checkPlayer(), 1000);
    });
  };
  var dealerHit = function(event) {

    var drawOne = heroProx+myID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      card = drawOneData.cards[0].value;
      // console.log(getCardValue());
      if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
        dealerCounter += 10;
      } else if (card === 'ACE') {
        if (dealerCounter + 11 > 21) {
          dealerCounter += 1;
        } else {
          dealerCounter += 11;
        }
      } else {
        dealerCounter += parseInt(card)
      }
      $('.dealer-counter').text(dealerCounter);
      $('.dealer-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawOneData.cards[0].code+'.png', class:'card-img'}))
      setTimeout(checkDealer(), 1000);
    });
  };



  // function getCardValue (card) {
  //
  //   if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
  //     cardValue = 10;
  //   } else if (card === 'ACE') {
  //     cardValue = 'ace';
  //   } else {
  //     cardValue = parseInt(card);
  //   }
  //   return cardValue;
  // }

  var checkDealer = function () {
    setTimeout(function () {
      if (dealerCounter < 17) {
      dealerHit();
      } else if (dealerCounter > 21) {
        $('.dealer-card-container').empty();
        $('.dealer-card-container').append($("<img src='img/bust.png' class='bust-img'/>"));
        $('.dealer-counter').append(' - BUST');
        end();
      } else {
        end();
      }
    }, 500);
  }

  var checkPlayer = function () {
    setTimeout(function () {
      if (playerCounter > 21) {
        $('.player-card-container').empty();
        $('.player-card-container').append($("<img src='img/bust.png' class='bust-img'/>"));
        $('.player-counter').append(' - BUST');
        end();
        // figure out a way to overlay the bust img over top of the cards?
      }
    }, 500);
  }

  var end = function () {
    console.log("PC >>>", playerCounter);
    console.log("DC >>>", dealerCounter);
    if (playerCounter > 21) {
      alert("Player busts!\nDealer wins.");
    } else if (dealerCounter > 21) {
      alert("Dealer busts.\nPlayer wins!");
    } else if (playerCounter > dealerCounter) {
      alert(`Player (${playerCounter}) beats dealer (${dealerCounter})!`);
    } else if (playerCounter === dealerCounter) {
      alert(`It's a tie! (${dealerCounter})`);
    } else {
      alert(`Dealer (${dealerCounter}) beats player (${playerCounter}).`);
    }
    // playerCounter = 0;
    setTimeout (function () {
    $('.player-card-container').empty();
    $('.dealer-card-container').empty();
    $('.default').append($("<img src='img/back1.jpg' class='default-img'/>"));
    dealerCounter = 0;
    dealerDisplay = 0;
    playerCounter = 0;
    $('.dealer-counter').text(dealerCounter);
    $('.player-counter').text(playerCounter);
    $('#draw').prop("disabled", true);
    $('#end').prop("disabled", true);
    $('#start').prop("disabled", false);
    cardArr = [];
  }, 2000);
  }

  var stay = function () {
    $('#placeholder').remove();
    $('.dealer-card-container').prepend($('<img>',{src:'http://deckofcardsapi.com/static/img/'+hiddenID+'.png', class:'card-img'}));
    $('.dealer-counter').text(dealerCounter);
    setTimeout(checkDealer(), 1000);
  }

  var deal = function () {
    $('#draw').prop("disabled", false);
    $('#end').prop("disabled", false);
    $('#start').prop("disabled", true);
    $('.default').empty();
    $('.dealer-card-container').append($('<img>',{src:'img/back1.jpg', class:'card-img', id:'placeholder'}));
    var drawFour = heroProx+myID+'/draw/?count=4';
    var drawXHR = $.getJSON(drawFour);
    drawXHR.done(function (drawFourData) {
      console.log(drawFourData);
      $('.dealer-card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawFourData.cards[3].code+'.png', class:'card-img'}));
      hiddenID = drawFourData.cards[1].code;
      for (let i=0; i<4; i++) {
        var card = drawFourData.cards[i].value;
        if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
          cardValue = 10;
        } else if (card === 'ACE') {
          cardValue = 11;
        } else {
          cardValue = parseInt(card);
        }
        cardArr.push(cardValue);
        if (i % 2 === 0) {
          $('.player-card-container').append($('<img>',{id:`img${i}`,src:'http://deckofcardsapi.com/static/img/'+drawFourData.cards[i].code+'.png', class:'card-img'}));
          playerCounter += cardValue;
        } else {
          dealerCounter += cardValue;
          if (i === 3) {
            dealerDisplay += cardValue
            $('.dealer-counter').text(dealerDisplay);
          }

        }
      }
      $('.player-counter').text(playerCounter);
      console.log(cardArr);
      console.log("PC >>>", playerCounter);
      console.log("DC >>>", dealerCounter);

    });
  };



  $('#draw').click(hit);
  $('#end').click(stay);
  $('#start').click(deal);






})







// var deckAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
