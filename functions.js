// functions go here
var testArr2 = ['ACE', '4', 'ACE'];
const cards = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];

var isRandomIndex = function (arr) {
  var randIdx = Math.floor(Math.random() * arr.length);
  return (randIdx < 0 || randIdx > 12) ? false : true;
}

var getRandomIndex = function (arr) {
  var randIdx = Math.floor(Math.random() * arr.length);
  return randIdx;
}

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

var dealerHit = function (arr) {
  var cards = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];
  var randomI = getRandomIndex(cards);
  if (getValue(arr) < 17) {
    arr.push(cards[randomI])
  }
  return arr.length;
}

console.log(dealerHit(testArr2));

module.exports = {
  getValue,
  getRandomIndex,
  isRandomIndex,
  dealerHit
}
