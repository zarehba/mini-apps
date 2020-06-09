import React, { useState } from 'react';
import styled from 'styled-components';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import TheForm from './TheForm';
import InputField from './InputField';
import InputLabel from './InputLabel';
import InputStatus from './InputStatus';
import SubmitInput from './SubmitInput';

const Bin2DecContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 3rem 2rem 0rem 2rem;
`;

const checkIfBinaryString = (str) => Boolean(str.match(/^[0-1]+$/g));

// const convertBinToDec = (binaryStr) => parseInt(binaryStr, 2);
// the above works but the exercise was to use a single math function
// AND not convert the input to arrays so:
const convertBinToDec = (binaryStr) => {
  const lngth = binaryStr.length - 1;
  let decimal = 0;
  for (let i = 0; i <= lngth; i++) {
    decimal += binaryStr[i] * 2 ** (lngth - i);
  }
  return decimal;
};
const isInputValid = (input) => checkIfBinaryString(input);

const Bin2Dec = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [isBinaryValid, setIsBinaryValid] = useState(true);
  const [decimalOutput, setDecimalOutput] = useState('');
  const [isDecimalCopied, copyDecimalToClipboard] = useCopyToClipboard(1000);

  const binaryChangeHandler = (e) => {
    const currentInput = e.target.value;
    setBinaryInput(currentInput);
    setDecimalOutput('');

    if (!isBinaryValid) {
      setIsBinaryValid(isInputValid(currentInput));
    }
  };

  const binaryBlurHandler = (e) => {
    setIsBinaryValid(isInputValid(binaryInput));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isFormValid = isInputValid(binaryInput);
    setIsBinaryValid(isFormValid);

    if (isFormValid) {
      setDecimalOutput(convertBinToDec(binaryInput));
    } else {
      setDecimalOutput('');
    }
  };

  const copyToClipboardHandler = (e) => {
    const currentOutput = e.target.value;
    if (currentOutput) {
      copyDecimalToClipboard(currentOutput);
    }
  };

  return (
    <Bin2DecContainer>
      <TheForm action="" onSubmit={submitHandler}>
        <InputLabel htmlFor="BinInput">Binary input:</InputLabel>
        <InputField
          onChange={binaryChangeHandler}
          onBlur={binaryBlurHandler}
          value={binaryInput}
          type="text"
          name="BinInput"
          id="BinInput"
          placeholder="up to 8 digits"
          maxLength="8"
          autoComplete="off"
          formNoValidate
        />
        <InputStatus type="error" isHidden={isBinaryValid}>
          Not a valid binary number
        </InputStatus>
        <SubmitInput value="Convert to decimal" />
        <InputLabel htmlFor="DecOutput">Decimal output:</InputLabel>
        <InputField
          onClick={copyToClipboardHandler}
          value={decimalOutput}
          type="text"
          name="DecOutput"
          id="DecOutput"
          title="Click to copy value to clipboard"
          readOnly
        />
        <InputStatus type="success" isHidden={!isDecimalCopied}>
          Output copied to clipboard!
        </InputStatus>
      </TheForm>
    </Bin2DecContainer>
  );
};

export default Bin2Dec;
