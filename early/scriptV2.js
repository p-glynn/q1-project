var heroProx = 'https://g-blackjackapi.herokuapp.com/api/deck/';
var heroDex = 'https://g-blackjackapi.herokuapp.com/api/deck/new/shuffle/?deck_count=6';
var myID = 'i17qib8s5tgt';


// var xhr = $.getJSON(heroDex);
var xhr = $.getJSON(heroProx+myID+'/shuffle/');


var deckID;
var counter = 0;

var scoreArr = [];
// var inPlay = true;
var playerCounter = 1;

$('document').ready(function () {
  // $('#draw').prop("disabled");


  xhr.done(function (data) {
    deckID = data.deck_id;
    console.log(data);
  });

  var hit = function(event) {
    var drawOne = heroProx+myID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      var card = drawOneData.cards[0].value;

      if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
        counter += 10;
      } else if (card === 'ACE') {
        if (counter + 11 > 21) {
          counter += 1;
        } else {
          counter += 11;
        }
      } else {
        counter += parseInt(card)
      }
      $('.counter-head').text(counter);
      // $('.cardImg').attr("src", drawOneData.cards["0"].image);
      $('.card-container').append($('<img>',{src:'http://deckofcardsapi.com/static/img/'+drawOneData.cards[0].code+'.png', class:'card-img'}))
      check();
    });
  };


  var shuffle = function (event) {
    var shuffleID = heroProx+myID+'/shuffle/';
    var shuffleXHR = $.getJSON(shuffleID)
    shuffleXHR.done (function (shuffleData) {
      console.log(shuffleData);

    });
  };


  var clear = function (event) {
    counter = 0;
    $('.card-container').empty();
    $('.card-container').append($("<img src='img/back1.jpg' />"));
    $('.counter-head').text(counter);
  }

  var check = function () {
    if (counter > 21) {
      $('.card-container').append($("<img src='img/bust.png' />"));
      $('counter-head').text('BUST');
      setTimeout(end(), 1000);
    }
  }

  var end = function () {
    if (counter > 21) {counter = 0}
    scoreArr.push(counter);
    counter = 0;
    $('.card-container').empty();
    $('.card-container').append($("<img src='img/back1.jpg' />"));
    $('.counter-head').text(counter);
    console.log(scoreArr);
    playerCounter++;
    if (playerCounter<3) {alert(`Player ${playerCounter}'s turn. \nPlease press ok to clear the screen.`)}

    if (playerCounter === 3) {

      if (scoreArr[0] === scoreArr[1]) {
        console.log("It's a tie.");
        alert("It's a tie.")
      } else if (scoreArr[0] > scoreArr[1]) {
        console.log('Player 1 wins.');
        alert("Player 1 wins.")
      } else {
        console.log('Player 2 wins.');
        alert("Player 2 wins.")
      }
      playerCounter = 1;
      scoreArr = [];
    }
  }

  var deal = function () {
    $('#draw').prop("disabled", false);
    $('#end').prop("disabled", false);
    var drawTwo = heroProx+myID+'/draw/?count=2';
    var drawXHR = $.getJSON(drawTwo);
    drawXHR.done(function (drawTwoData) {
      console.log(drawTwoData);
      $('.card-container').empty();
      for (let i in drawTwoData.cards) {
        var card = drawTwoData.cards[i].value;
        if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
          counter += 10;
        } else if (card === 'ACE') {
          if (counter + 11 > 21) {
            counter += 1;
          } else {
            counter += 11;
          }
        } else {
          counter += parseInt(card)
        }
        $('.counter-head').text(counter);
        $('.card-container').prepend($('<img>',{id:`img${i}`,src:'http://deckofcardsapi.com/static/img/'+drawTwoData.cards[i].code+'.png', class:'card-img'}))

      }
      // $('.card-container').empty();
      // $('.card-container').prepend($('<img>',{id:'theImg',src:'drawTwoData.cards["0"].image'}))
      // $('.card-container').prepend('<img src="" />');
      // $('.card-container').prepend('<img src="drawTwoData.cards[1].image" />');
    });
  };



  $('#draw').click(hit);
  // $('#shuffle').click(shuffle);
  // $('#clear').click(clear);
  $('#end').click(end);
  $('#start').click(deal);

  // shuffle();
  // setTimeout(shuffle(), 3000);






})







// var deckAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
