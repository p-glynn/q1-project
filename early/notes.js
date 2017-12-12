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

var winningIndex = scoreArr.reduce((iMax, x, i, scoreArr) => x > scoreArr[iMax] ? i : iMax, 0);
console.log(winningIndex);

var max = scoreArr[0];
var maxIndex = 0;
var maxCt = 0;
for (var i = 1; i < scoreArr.length; i++) {
  if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
  }

  var winningIndex = scoreArr.indexOf(Math.max(...scoreArr));
  if (winningIndex === 0) {console.log("It's a tie!")}
  else {
    console.log(`Player ${winningIndex+1} wins!`);
  }


  function checkReset (str) {
    if (str.toLowerCase() === 'reset') {
      localStorage.removeItem('dealerWins');
      localStorage.removeItem('userWins');
    }
  }
