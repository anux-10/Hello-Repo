/**
 * Calculator logic shared by Node (tests) and the browser (UI).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Calculator = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }

  return { add, subtract, multiply, divide };
});
