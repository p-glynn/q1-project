var hit = function(event) {
  var drawTwo = heroProx+deckID+'/draw/?count=2';
  var drawXHR = $.getJSON(drawTwo);
  drawXHR.done(function (drawTwoData) {

    console.log(drawTwoData);
    var leftVal = drawTwoData.cards[0].value;
    var rightVal = drawTwoData.cards[1].value;

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




    // if (leftVal > 0 && leftVal <= 10) {
    //   leftCounter += leftVal;
    //   $('.left .counter-head').text(leftCounter);
    // }
    // if (rightVal > 0 && rightVal <= 10) {
    //   rightCounter += rightVal;
    //   $('.right .counter-head').text(rightCounter);
    // }



    $('.leftImg').attr("src", drawTwoData.cards["0"].image)
    $('.rightImg').attr("src", drawTwoData.cards["1"].image)
  });
};
