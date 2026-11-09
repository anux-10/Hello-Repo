const test = require('node:test');
const assert = require('node:assert/strict');

const { add, subtract, multiply, divide } = require('../src/calculator');

test('adds two numbers', () => {
  assert.equal(add(2, 3), 5);
});

test('subtracts two numbers', () => {
  assert.equal(subtract(10, 4), 6);
});

test('multiplies two numbers', () => {
  assert.equal(multiply(6, 7), 42);
});

test('divides two numbers', () => {
  assert.equal(divide(20, 5), 4);
});

test('throws when dividing by zero', () => {
  assert.throws(() => divide(1, 0), /Cannot divide by zero/);
});
