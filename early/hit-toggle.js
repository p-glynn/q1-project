var hit = function(event, side) {
  var drawOne = heroProx+deckID+'/draw/?count=1';
  var drawXHR = $.getJSON(drawOne);
  var value;
  drawXHR.done(function (drawOneData) {
    var card = drawOneData.cards[0].value;

    if (card === 'KING' || card === 'QUEEN' || card === 'JACK') {
      if (side === 'left') {leftCounter += 10}
      else if (side === 'right') {rightCounter += 10}
    } else if (card === 'ACE') {
      if (side === 'left') {
        if (leftCounter + 11 >= 21) {
          leftCounter += 1;
        } else {
          leftCounter += 11;
        }
      } else if (side === 'right') {
        if (rightCounter + 11 >= 21) {
          rightCounter += 1;
        } else {
          rightCounter += 11;
        }
      }
    } else {
      if (side === 'left') {leftCounter += parseInt(card)}
      else if (side === 'right') {rightCounter += parseInt(card);}
    }
    if (side === 'left') {
      $('.left .counter-head').text(leftCounter);
      $('.leftImg').attr("src", drawOneData.cards["0"].image);
    } else if (side === 'right') {
      $('.right .counter-head').text(rightCounter);
      $('.rightImg').attr("src", drawOneData.cards["0"].image)
    }

  });
};

// THIS ISN'T WORKING RIGHT NOW BUT I THINK IT COULD BE VALUABLE

//
// var hitRight = function(event) {
//   var drawOne = heroProx+deckID+'/draw/?count=1';
//   var drawXHR = $.getJSON(drawOne);
//   drawXHR.done(function (drawOneData) {
//     var rightVal = drawOneData.cards[0].value;
//
//     if (rightVal === 'KING' || rightVal === 'QUEEN' || rightVal === 'JACK') {
//       rightCounter += 10;
    // } else if (rightVal === 'ACE') {
    //   if (rightCounter + 11 >= 21) {
    //     rightCounter += 1;
    //   } else {
    //     rightCounter += 11;
    //   }
//     } else {
//       rightCounter += parseInt(rightVal);
//     }
//     console.log("R >>", rightCounter);
    // $('.right .counter-head').text(rightCounter);
    //
    // $('.rightImg').attr("src", drawOneData.cards["0"].image)
//   });
// };
