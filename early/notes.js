// things i might need

var drawTwo = heroProx+deckID+'/draw/?count=2';
var xhr2 = $.getJSON(drawTwo);
xhr2.done(function (data2) {
  console.log(data2);
  $('.leftImg').attr("src", data2.cards["0"].image)
  $('.rightImg').attr("src", data2.cards["1"].image)
})


console.log("L >>", $('.left .counter-head').text());
console.log("R >>", $('.right .counter-head').text());


var getValue = function (data) {

  // var leftTotal = $('.left .counter-head').text()
  // console.log(leftTotal);

  var leftVal = data.cards[0].value;
  var rightVal = data.cards[1].value;


  var leftParse = parseInt(leftVal);
  var rightParse = parseInt(rightVal);

  if (leftParse > 0 && leftParse <= 10) {
    leftCounter += leftParse;
    $('.left .counter-head').text(leftCounter);
  }

  console.log(leftParse, typeof leftParse);
  console.log(rightParse, typeof rightParse);


}
