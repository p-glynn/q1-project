const chai = require('chai');
const assert = chai.assert;

var testArr1 = ['ACE', 'JACK'];
var testArr2 = ['ACE', '4', '3'];
var testArr3 = ['ACE', '4', 'ACE'];
var cards = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];

describe ('getValue', function () {
  it('should correctly sum up the value of cards in the array', function (){
    assert.equal(script.getValue(testArr1), 21);
  });
  it('should be able to differentiate between the two possible values for ace (1 or 11) and decide when to use each', function() {
    assert.equal(script.getValue(testArr2), 18);
  });
});













const script = require('../script')
