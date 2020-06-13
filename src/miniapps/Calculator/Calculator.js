import React, { useState } from 'react';
import ButtonKey from './ButtonKey';
import {
  CalculatorGlobalStyle,
  CalculatorContainer,
  DisplayContainer,
  DisplayNumber,
  ButtonsContainer,
} from './styles';

const MAX_DIGITS = 8;

const Calculator = () => {
  const [previousNumber, setPreviousNumber] = useState('');
  const [currentOperation, setCurrentOperation] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');

  const buttonHandle = (btnContents, btnType) => {
    switch (btnType) {
      case 'input':
        setCurrentNumber((prevCurrentNumber) => {
          const nextCurrentNumber =
            prevCurrentNumber === 'ERR' ? '' : prevCurrentNumber;
          return fixInputNumber(nextCurrentNumber + btnContents);
        });
        return;
      case 'changeDisplay':
        if (btnContents === '+/-') {
          setCurrentNumber((prevCurrentNumber) =>
            toggleMinusSign(prevCurrentNumber)
          );
          return;
        }
        if (btnContents === '⌫') {
          setCurrentNumber((prevCurrentNumber) =>
            removeLastChar(prevCurrentNumber)
          );
          return;
        }
        return;
      case 'delete':
        if (btnContents === 'AC') {
          setPreviousNumber('');
          setCurrentOperation('');
          setCurrentNumber('');
        }
        if (btnContents === 'C') {
          setCurrentNumber('');
        }
        return;
      case 'operation':
        setCurrentOperation(btnContents);
        setPreviousNumber(currentNumber);
        setCurrentNumber('');
        return;
      case 'result':
        if (!currentOperation) return;
        const result = performOperation(
          previousNumber,
          currentNumber === '' ? previousNumber : currentNumber,
          currentOperation
        );
        setCurrentOperation('');
        setPreviousNumber(result);
        setCurrentNumber(result);
        return;
      default:
        return;
    }
  };

  const keyboardInputHandler = (e) => {
    const uiButton = buttonsData.find(
      (btn) => btn.contents === keypressIntoKeyContents(e.key)
    );
    if (!uiButton) return;
    buttonHandle(uiButton.contents, uiButton.type);
  };

  const handleEnterKey = (e) => {
    if (e.key !== 'Enter' && e.key !== '/') return;

    e.preventDefault();
    e.stopPropagation();
  };

  const buttonKeys = (buttons) =>
    buttons.map((button) => (
      <ButtonKey
        key={button.contents}
        onPress={buttonHandle}
        type={button.type}
      >
        {button.contents}
      </ButtonKey>
    ));

  return (
    <>
      <CalculatorGlobalStyle />
      <CalculatorContainer
        onKeyUp={keyboardInputHandler}
        onKeyDown={handleEnterKey}
      >
        <DisplayContainer>
          <DisplayNumber value={currentNumber} readOnly></DisplayNumber>
        </DisplayContainer>
        <ButtonsContainer>{buttonKeys(buttonsData)}</ButtonsContainer>
      </CalculatorContainer>
    </>
  );
};

const buttonsData = [
  { type: 'delete', contents: 'AC' },
  { type: 'delete', contents: 'C' },
  { type: 'changeDisplay', contents: '⌫' },
  { type: 'operation', contents: '/' },
  { type: 'input', contents: '7' },
  { type: 'input', contents: '8' },
  { type: 'input', contents: '9' },
  { type: 'operation', contents: 'x' },
  { type: 'input', contents: '4' },
  { type: 'input', contents: '5' },
  { type: 'input', contents: '6' },
  { type: 'operation', contents: '-' },
  { type: 'input', contents: '1' },
  { type: 'input', contents: '2' },
  { type: 'input', contents: '3' },
  { type: 'operation', contents: '+' },
  { type: 'changeDisplay', contents: '+/-' },
  { type: 'input', contents: '0' },
  { type: 'input', contents: '.' },
  { type: 'result', contents: '=' },
];

const calculatorOperations = {
  '/': (prevNum, currNum) => prevNum / currNum,
  x: (prevNum, currNum) => prevNum * currNum,
  '+': (prevNum, currNum) => prevNum + currNum,
  '-': (prevNum, currNum) => prevNum - currNum,
};

function keypressIntoKeyContents(eventKey) {
  switch (eventKey) {
    case 'Delete':
      return 'AC';
    case 'Escape':
      return 'C';
    case 'Backspace':
      return '⌫';
    case 'Enter':
      return '=';
    case '*':
      return 'x';
    case '_':
      return '+/-';
    default:
      return eventKey;
  }
}

function leftTrimChar(str, char) {
  const regex = new RegExp(`^${char}+`);
  return str.replace(regex, '');
}

function leftTrimZeros(str) {
  if (
    str === '0' ||
    str === '-0' ||
    str.substring(0, 2) === '0.' ||
    str.substring(0, 3) === '-0.'
  )
    return str;
  const strParts = str.split('0.');
  strParts[0] = leftTrimChar(strParts[0], '0');
  return strParts.join('');
}

function fixDecPoint(str) {
  const strParts = str.split('.');
  if (strParts.length === 1) return str;
  if (strParts.length > 2) strParts.pop(); // if string is like '[]..[]' or like '[].[].'
  if (strParts[0].length === 0) strParts[0] = '0'; // if string is like '.[]'
  return strParts.join('.');
}

function checkMaxDigits(str, maxDigits) {
  if (str.length <= maxDigits) return str;
  return str.substring(0, maxDigits);
}

function fixInputNumber(str) {
  return checkMaxDigits(leftTrimZeros(fixDecPoint(str)), MAX_DIGITS);
}

function toggleMinusSign(str) {
  if (str.substr(0, 1) === '-') return str.substr(1);
  return '-' + str;
}

function removeLastChar(str) {
  return str.slice(0, -1);
}

function roundFloat(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function countDecimals(str) {
  if (str % 1 !== 0) return str.split('.')[1].length;
  return 0;
}

function errIfTooBig(number, maxDigits) {
  const str = number.toString();
  if (str.length <= maxDigits) return str;
  return 'ERR';
}

function performOperation(prevNum, currNum, operation) {
  if (operation === '/' && currNum === '0') return 'ERR';
  // calculate result with precision of greater precision of the two input numbers
  const result = roundFloat(
    calculatorOperations[operation](+prevNum, +currNum),
    Math.max(countDecimals(prevNum), countDecimals(currNum))
  );
  return errIfTooBig(result, MAX_DIGITS);
}

export default Calculator;
