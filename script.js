//calculator object: holds all the data I need to create my expression,
const calculator = {
  displayValue: '0',//sting value as the are numbers and operands 
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
}
 
//function that modify the value of displayValue any time a digit is clicked by the user
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}
 
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    return;
  }
  // If the displayValue does not contain a decimal point-checked with the includes method
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point-dot
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);
  
  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }
  
  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
      
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
  //create a function in order to "modify" the value on the calculator-screen. The screen is a disable text input- so it is impssible to type directly into it but its value can be changed with js.
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  //listen for a click event on the calculator-keys(the keys on the calculator ara all children of this element- lnown as event delegation)
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    //callback function of the event listener-- the target variable is an object that represent the element that was clicked
    const { target } = event;
    if (!target.matches('button')) {
      //exit the function
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }
  
    inputDigit(target.value);
    updateDisplay();
  });