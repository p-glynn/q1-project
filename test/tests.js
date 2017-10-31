const chai = require('chai');
const assert = chai.assert;

// function tests go here
var testArr1 = ['ACE', 'JACK'];
var testArr2 = ['ACE', '4', '3'];
var testArr3 = ['ACE', '4', 'ACE'];
var cards = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];

describe ('getValue', function () {
  it('should correctly sum up the value of cards in the array', function (){
    assert.equal(getValue(testArr1), 21);
  });
  it('should be able to differentiate between the two possible values for ace (1 or 11) and decide when to use both', function() {
    assert.equal(getValue(testArr2), 18);
  });
});

describe ('randomIndex', function () {
  it('should return a random index of the array', function () {
    assert.equal(isRandomIndex(cards), true);
  });
});

describe ('dealerHit', function () {
  it('should add a card to the dealer array if the dealer has less than 16', function () {
    assert.equal(dealerHit(testArr3), 4);
  });
  it('should NOT add a card to the dealer array if the dealer has 17 or more', function () {
    assert.equal(dealerHit(testArr2), 3);
  });
});

// describe ('')





const getValue = require('../functions.js').getValue;
const getRandomIndex = require('../functions.js').getRandomIndex;
const isRandomIndex = require('../functions.js').isRandomIndex;
const dealerHit = require('../functions.js').dealerHit;
