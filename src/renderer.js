const { OPERATORS } = require('./consts');

let operatorChosen  = false;
let currOperation   = '';
let leftNumber      = 0;
let rightNumber     = 0;
let currentResult   = 0;
let currentOperator = '';

// numbers
const currentNumber    = document.getElementById('current-number');
const currentOperation = document.getElementById('current-operation');
const number0          = document.getElementById('0');
const number1          = document.getElementById('1');
const number2          = document.getElementById('2');
const number3          = document.getElementById('3');
const number4          = document.getElementById('4');
const number5          = document.getElementById('5');
const number6          = document.getElementById('6');
const number7          = document.getElementById('7');
const number8          = document.getElementById('8');
const number9          = document.getElementById('9');

number0.addEventListener('click', zeroClicked);

number1.addEventListener('click', numberClicked);
number2.addEventListener('click', numberClicked);
number3.addEventListener('click', numberClicked);
number4.addEventListener('click', numberClicked);
number5.addEventListener('click', numberClicked);
number6.addEventListener('click', numberClicked);
number7.addEventListener('click', numberClicked);
number8.addEventListener('click', numberClicked);
number9.addEventListener('click', numberClicked);

// symbols
const equalOperator    = document.getElementById('equal');
const addOperator      = document.getElementById('add');
const minusOperator    = document.getElementById('minus');
const multiplyOperator = document.getElementById('multiply');
const divisionOperator = document.getElementById('division');
const restOperator     = document.getElementById('rest');
const comma            = document.getElementById('comma');
const plusMinus        = document.getElementById('plus-minus');
const deleteSingle     = document.getElementById('delete');
const deleteAll        = document.getElementById('delete-all');

comma.addEventListener('click', commaClicked);

// operators
addOperator.addEventListener('click',      operatorClicked.bind(this, OPERATORS.ADD));
minusOperator.addEventListener('click',    operatorClicked.bind(this, OPERATORS.MINUS));
divisionOperator.addEventListener('click', operatorClicked.bind(this, OPERATORS.DIVISON));
multiplyOperator.addEventListener('click', operatorClicked.bind(this, OPERATORS.MULTIPLY));
equalOperator.addEventListener('click',    computeResult);

deleteSingle.addEventListener('click', clearSingle);
deleteAll.addEventListener('click',    clearAll);

/**
 * 
 * @param {MouseEvent} evt 
*/
function numberClicked(evt) {
  
  console.log(rightNumber);
  const value = evt.target.innerText;

  if (!currentOperation.innerText) {

    leftNumber  = leftNumber == 0 ? '' : leftNumber;
    leftNumber += value;
  }

  if (operatorChosen || currentNumber.innerText == 0) {

    currentNumber.innerText = value;
  }
  else {
    
    currentNumber.innerText += value;
    // addSuperiorOrder(); TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  if (!!leftNumber && !!currentOperation.innerText || !leftNumber)
    rightNumber = currentNumber.innerText;

  currOperation += value;
  operatorChosen = false;
  
  console.log('left:', leftNumber, 'right:', rightNumber);
}

/**
 * 
 * @param {MouseEvent} evt 
*/
function commaClicked(evt) {

  if (currentNumber.innerText.includes(','))
    return;

  const value              = evt.target.innerText;
  currOperation           += value;
  currentNumber.innerText += value;
}

/**
 * 
 * @param {MouseEvent} evt 
*/
function zeroClicked(evt) {

  if (currentNumber.innerText == 0)
    return;
  
  if (operatorChosen)
    currentNumber.innerText = '0';
  else
    currentNumber.innerText += '0';
  
  currOperation += 0;
  operatorChosen = false;
}

/**
 * 
 */
function addSuperiorOrder() {

  // TODO
}

/**
 * 
 */
function clearAll() {

  currentNumber.innerText    = 0;
  currentOperation.innerText = '';
  currOperation              = '';
  leftNumber                 = 0;
  rightNumber                = 0;
  currentResult              = 0;
  currentOperator            = '';
}

/**
 * 
 */
function clearSingle() {
  // TODO
}

/**
 * 
 */
function clearOperation() {
  
  zeroClicked();
  // TODO: clear pipe operation
}

/**
 * 
 * @param {*} number 
 * @returns 
 */
function isMultipleOfThree(number) {

  return +number && +number % 3 === 0;
}

/**
 * 
 * @param {*} operator 
 */
function operatorClicked(operator) {

  if (operatorChosen) {

    currOperation        = operator;
    let currOperationArr = currentOperation.innerText.split('')
    currOperationArr.pop();
    currentOperation.innerText = currOperationArr.join('') + currOperation;
    return;
  }

  computeResult(operator);
  // console.log('post', rightNumber);
}

/**
 * 
 * @param {*} operator 
 * @returns 
 */
function computeResult(operator) {

  const equalOperator = !(typeof operator === 'string');

  if (!leftNumber && !rightNumber && equalOperator)
    return;

  let op;
  if (equalOperator) {

    operator                   = currentOperator;
    op                         = currentOperator;
    currOperation             += '=';
    currentOperation.innerText = currOperation;
  }
  else {

    op                         = rightNumber && leftNumber ? currentOperator : operator;
    currOperation             += operator;
    operatorChosen             = true;
    currentOperator            = operator;
    currentOperation.innerText = currOperation;
  }

  if (!rightNumber)
    return;

  switch (op) {

    case OPERATORS.ADD:
      currentResult = (+leftNumber) + (+rightNumber);
      break;
    case OPERATORS.MINUS:
      currentResult = (+leftNumber) - (+rightNumber);
      break;
    case OPERATORS.MULTIPLY:
      currentResult = (+leftNumber) * (+rightNumber);
      break;
    case OPERATORS.DIVISON:
      currentResult = (+leftNumber) / (+rightNumber);
      break;
    case OPERATORS.REST:
      currentResult = (+leftNumber) % (+rightNumber);
      break;
  }

  leftNumber              = currentResult;
  rightNumber             = '';
  currentNumber.innerText = currentResult;

  if (equalOperator)
    currOperation = leftNumber;
}