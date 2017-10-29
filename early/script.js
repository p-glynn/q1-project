let heroProx = 'https://g-blackjackapi.herokuapp.com/api/deck/';

let heroDex = 'https://g-blackjackapi.herokuapp.com/api/deck/new/shuffle/?deck_count=6';

let xhr = $.getJSON(heroDex);

var deckID;
var leftCounter = 0;
var rightCounter = 0;

$('document').ready(function () {

  xhr.done(function (data) {
    deckID = data.deck_id;
    console.log(data);



  })
  var hitLeft = function(event) {
    var drawOne = heroProx+deckID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      var leftVal = drawOneData.cards[0].value;

      if (leftVal === 'KING' || leftVal === 'QUEEN' || leftVal === 'JACK') {
        leftCounter += 10;
      } else if (leftVal === 'ACE') {
        if (leftCounter + 11 >= 21) {
          leftCounter += 1;
        } else {
          leftCounter += 11;
        }
      } else {
        leftCounter += parseInt(leftVal);
      }
      console.log("L >>", leftCounter);
      $('.left .counter-head').text(leftCounter);

      $('.leftImg').attr("src", drawOneData.cards["0"].image)
    });
  };
  var hitRight = function(event) {
    var drawOne = heroProx+deckID+'/draw/?count=1';
    var drawXHR = $.getJSON(drawOne);
    drawXHR.done(function (drawOneData) {
      var rightVal = drawOneData.cards[0].value;

      if (rightVal === 'KING' || rightVal === 'QUEEN' || rightVal === 'JACK') {
        rightCounter += 10;
      } else if (rightVal === 'ACE') {
        if (rightCounter + 11 >= 21) {
          rightCounter += 1;
        } else {
          rightCounter += 11;
        }
      } else {
        rightCounter += parseInt(rightVal);
      }
      console.log("R >>", rightCounter);
      $('.right .counter-head').text(rightCounter);

      $('.rightImg').attr("src", drawOneData.cards["0"].image)
    });
  };

  var shuffle = function (event) {
    var shuffleID = heroProx+deckID+'/shuffle/';
    var shuffleXHR = $.getJSON(shuffleID)
    shuffleXHR.done (function (shuffleData) {
      console.log(shuffleData);

    });
  };


  var clear = function (event) {
    leftCounter = 0;
    rightCounter = 0;
    $('.leftImg').attr("src", "img/back1.jpg")
    $('.rightImg').attr("src", "img/back3.jpg")
    $('.left .counter-head').text(leftCounter);
    $('.right .counter-head').text(rightCounter);
  }

  var compare = function (event) {
    
  }

  $('#leftDraw').click(hitLeft);
  $('#rightDraw').click(hitRight);
  $('#shuffle').click(shuffle);
  $('#clear').click(clear);






})







// var deckAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6';
// var myID = 'i17qib8s5tgt'
