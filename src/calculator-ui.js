/* UI wiring for the calculator page. */
(function () {
  const Calculator = window.Calculator;
  const display = document.getElementById('display');
  const expression = document.getElementById('expression');
  const keys = document.querySelector('.keys');

  const operatorSymbols = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
  };

  let currentValue = '0';
  let storedValue = null;
  let pendingOperator = null;
  let resetDisplay = false;

  function formatNumber(value) {
    if (!Number.isFinite(value)) {
      return 'Error';
    }
    return String(parseFloat(value.toPrecision(12)));
  }

  function updateDisplay() {
    display.textContent = currentValue;
  }

  function clearAll() {
    currentValue = '0';
    storedValue = null;
    pendingOperator = null;
    resetDisplay = false;
    expression.innerHTML = '&nbsp;';
  }

  function showError(message) {
    currentValue = 'Error';
    storedValue = null;
    pendingOperator = null;
    resetDisplay = true;
    expression.textContent = message;
  }

  function inputDigit(digit) {
    if (resetDisplay) {
      currentValue = digit;
      resetDisplay = false;
    } else {
      currentValue = currentValue === '0' ? digit : currentValue + digit;
    }
  }

  function inputDecimal() {
    if (resetDisplay) {
      currentValue = '0.';
      resetDisplay = false;
      return;
    }
    if (!currentValue.includes('.')) {
      currentValue += '.';
    }
  }

  function toggleSign() {
    if (currentValue === '0' || currentValue === 'Error') {
      return;
    }
    currentValue = currentValue.startsWith('-')
      ? currentValue.slice(1)
      : '-' + currentValue;
  }

  function percent() {
    const value = parseFloat(currentValue);
    if (!Number.isFinite(value)) {
      return;
    }
    currentValue = formatNumber(value / 100);
    resetDisplay = true;
  }

  function backspace() {
    if (resetDisplay) {
      return;
    }
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    if (currentValue === '-') {
      currentValue = '0';
    }
  }

  function chooseOperator(operator) {
    const inputValue = parseFloat(currentValue);

    if (pendingOperator !== null && resetDisplay) {
      pendingOperator = operator;
      expression.textContent = `${formatNumber(storedValue)} ${operatorSymbols[operator]}`;
      return;
    }

    if (storedValue === null) {
      storedValue = inputValue;
    } else if (pendingOperator !== null) {
      try {
        storedValue = Calculator[pendingOperator](storedValue, inputValue);
      } catch (error) {
        showError(error.message);
        return;
      }
      currentValue = formatNumber(storedValue);
    }

    pendingOperator = operator;
    resetDisplay = true;
    expression.textContent = `${formatNumber(storedValue)} ${operatorSymbols[operator]}`;
  }

  function equals() {
    if (pendingOperator === null || storedValue === null) {
      return;
    }

    const inputValue = parseFloat(currentValue);

    try {
      const result = Calculator[pendingOperator](storedValue, inputValue);
      expression.textContent = `${formatNumber(storedValue)} ${
        operatorSymbols[pendingOperator]
      } ${formatNumber(inputValue)} =`;
      currentValue = formatNumber(result);
    } catch (error) {
      showError(error.message);
      return;
    }

    storedValue = null;
    pendingOperator = null;
    resetDisplay = true;
  }

  function handleButton(button) {
    const { action, value } = button.dataset;

    if (action === 'clear') {
      clearAll();
    } else if (action === 'sign') {
      toggleSign();
    } else if (action === 'percent') {
      percent();
    } else if (action === 'operator') {
      chooseOperator(value);
    } else if (action === 'equals') {
      equals();
    } else if (action === 'decimal') {
      inputDecimal();
    } else if (action === 'backspace') {
      backspace();
    } else if (value !== undefined) {
      inputDigit(value);
    }

    updateDisplay();
  }

  keys.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (button) {
      handleButton(button);
    }
  });

  window.addEventListener('keydown', function (event) {
    const { key } = event;

    if (/^[0-9]$/.test(key)) {
      inputDigit(key);
    } else if (key === '.') {
      inputDecimal();
    } else if (key === '+') {
      chooseOperator('add');
    } else if (key === '-') {
      chooseOperator('subtract');
    } else if (key === '*') {
      chooseOperator('multiply');
    } else if (key === '/') {
      event.preventDefault();
      chooseOperator('divide');
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      equals();
    } else if (key === 'Escape' || key === 'Delete') {
      clearAll();
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === '%') {
      percent();
    } else {
      return;
    }

    updateDisplay();
  });

  updateDisplay();
})();
