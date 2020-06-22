import React, { useState } from 'react';
import Input from '../../shared/Input';
import styled from 'styled-components';

const romanNumbers = [
  { letter: 'M', value: 1000 },
  { letter: 'D', value: 500 },
  { letter: 'C', value: 100 },
  { letter: 'L', value: 50 },
  { letter: 'X', value: 10 },
  { letter: 'V', value: 5 },
  { letter: 'I', value: 1 },
];
const romanToDecimal = (roman) => {
  if (roman.replace(/M*D*C*L*X*V*I*/g, '')) {
    return null;
  }

  let remainder = roman;
  let number = 0;
  romanNumbers.forEach((romanNumber, index) => {
    const positionOfLast = remainder.lastIndexOf(romanNumber.letter) + 1;
    const thisRomanPart = remainder.substr(0, positionOfLast);
    remainder = remainder.substr(positionOfLast);
    const thisLetterRegex = new RegExp(romanNumber.letter, 'g');
    const thisLetterCount = (thisRomanPart.match(thisLetterRegex) || []).length;
    number += thisLetterCount * romanNumber.value;
    number -=
      romanNumbers.find(
        (numb) => numb.letter === thisRomanPart.replace(thisLetterRegex, '')
      )?.value ?? 0;
  });

  return number;
};
const decimalToRoman = (decimal) => {
  if (decimal <= 0 || decimal > 10000) {
    return null;
  }

  const arrConv = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    20: 'XX',
    30: 'XXX',
    40: 'XL',
    50: 'L',
    60: 'LX',
    70: 'LXX',
    80: 'LXXX',
    90: 'XC',
    100: 'C',
    200: 'CC',
    300: 'CCC',
    400: 'CD',
    500: 'D',
    600: 'DC',
    700: 'DCC',
    800: 'DCCC',
    900: 'CM',
    1000: 'M',
    2000: 'MM',
    3000: 'MMM',
    4000: 'MMMM',
    5000: 'MMMMM',
    6000: 'MMMMMM',
    7000: 'MMMMMMM',
    8000: 'MMMMMMMM',
    9000: 'MMMMMMMMM',
    10000: 'MMMMMMMMMM',
  };

  const arr = decimal.toString().split('').reverse();
  for (let i = 1, k = 0; k < arr.length; k++) {
    arr.splice(k, 1, arr[k] * i);
    i *= 10;
  }

  const romansArr = [];
  for (let i = 0; i < arr.length; i++) {
    romansArr.push(arrConv[arr[i]] || '');
  }

  return romansArr.reverse().join('');
};

const Roman2DecimalConverter = () => {
  const [roman, setRoman] = useState('VIII');
  const [decimal, setDecimal] = useState(8);
  const [errorMsgs, setErrorMsgs] = useState({ roman: [], decimal: [] });

  const handleRoman = (e) => {
    setRoman(e.target.value);
    const decimalNum = romanToDecimal(e.target.value);
    if (!decimalNum) {
      setErrorMsgs((errorMsgs) => ({
        roman: [],
        decimal: ['Invalid roman number'],
      }));
      return setDecimal('');
    }

    setDecimal(decimalNum);
    setErrorMsgs((errorMsgs) => ({
      roman: [],
      decimal: [],
    }));
  };

  const handleDecimal = (e) => {
    setDecimal(+e.target.value);
    const romanNum = decimalToRoman(+e.target.value);
    if (!romanNum) {
      setErrorMsgs((errorMsgs) => ({
        roman: ['Decimal number outside of range'],
        decimal: [],
      }));
      return setRoman('');
    }

    setRoman(romanNum);
    setErrorMsgs((errorMsgs) => ({
      roman: [],
      decimal: [],
    }));
  };

  return (
    <MiniAppContainer>
      <Input
        value={roman}
        onChange={handleRoman}
        labelText="Roman number:"
        errorMessages={errorMsgs.roman}
      />
      <span role="img" aria-label="Convert to">
        🔁
      </span>
      <Input
        value={decimal}
        onChange={handleDecimal}
        inputProps={{ type: 'number' }}
        labelText="Decimal number:"
        errorMessages={errorMsgs.decimal}
      />
    </MiniAppContainer>
  );
};

const MiniAppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 45rem;
  margin-top: 2rem;
  text-align: center;
  position: relative;

  @media only screen and (max-width: 568px) {
    flex-direction: column;
    align-items: flex-end;
    width: auto;
  }

  & > span {
    font-size: 2.5rem;
    margin: auto;
  }

  & div {
    position: absolute;
    transform: translateY(4.5rem);

    @media only screen and (max-width: 568px) {
      left: 50%;
      transform: translateY(10.5rem) translateX(-50%);
    }
  }
`;

export default Roman2DecimalConverter;
