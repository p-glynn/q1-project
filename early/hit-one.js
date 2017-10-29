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

    $('.leftImg').attr("src", drawTwoData.cards["0"].image)
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

    $('.rightImg').attr("src", drawTwoData.cards["0"].image)
  });
};
