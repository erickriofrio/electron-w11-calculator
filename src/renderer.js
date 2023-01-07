const { OPERATORS } = require('./consts');

let operatorChosen = false;
let currOperation  = '';

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
const deleteCe         = document.getElementById('delete-ce');

comma.addEventListener('click', commaClicked);

// operators
addOperator.addEventListener('click',      operatorClicked.bind(this, OPERATORS.ADD));
minusOperator.addEventListener('click',    operatorClicked.bind(this, OPERATORS.MINUS));
divisionOperator.addEventListener('click', operatorClicked.bind(this, OPERATORS.DIVISON));
multiplyOperator.addEventListener('click', operatorClicked.bind(this, OPERATORS.MULTIPLY));

deleteSingle.addEventListener('click', clearSingle);
deleteAll.addEventListener('click',    clearAll);

/**
 * 
 * @param {MouseEvent} evt 
*/
function numberClicked(evt) {
  
  const value = evt.target.innerText;

  console.log('CURRENT NUMBER', currentNumber.innerText, operatorChosen, 'CURR VALUE:', value);
  if (operatorChosen || currentNumber.innerText == 0)
    currentNumber.innerText = value;
  else {
    
    currentNumber.innerText += value;
    // addSuperiorOrder(); TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  
  currOperation += value;
  console.log(currOperation);
  operatorChosen = false;
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

  if (operatorChosen)
    return;

  operatorChosen             = true;
  currOperation             += operator;
  currentOperation.innerText = currOperation;
  // TODO
}