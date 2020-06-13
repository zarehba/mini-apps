import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import {
  colorFormats,
  formatSuffixes,
  incrementColor,
  colorToHex,
  arrayToColorString,
  invertColor,
  isColorValid,
} from './colorUtils';
import ColorFormatInputs from './ColorFormatInputs';
import ColorPartInput from './ColorPartInput';
import {
  GlobalStyle,
  StyledColorCycle,
  ColorPreview,
  ColorInputForm,
  HiddenSubmitButton,
  IntervalForm,
  IntervalLabelText,
  IntervalColorChanges,
  IntervalColorChangesLabel,
  NumberInput,
  SubmitButton,
} from './styles.js';

const DEFAULT_FORMAT = 'RGB';
const DEFAULT_COLOR = [23, 61, 105];
const DEFAULT_INTERVAL = 250;
const DEFAULT_ANIMATION_ON = false;
const DEFAULT_INCREMENT_VALUES = [10, 5, -1];

const ColorCycle = () => {
  const [currentFormat, setCurrentFormat] = useState({
    format: DEFAULT_FORMAT,
    formatParts: colorFormats[DEFAULT_FORMAT],
  });
  const [currentColor, setCurrentColor] = useState(
    arrayToColorString(DEFAULT_COLOR, DEFAULT_FORMAT)
  );
  const [inputColor, setInputColor] = useState(DEFAULT_COLOR);
  const [isInputColorValid, setIsInputColorValid] = useState(true);
  const [animationParameters, setAnimationParameters] = useState({
    isOn: DEFAULT_ANIMATION_ON,
    interval: DEFAULT_INTERVAL,
    incrementValues: DEFAULT_INCREMENT_VALUES,
  });

  const changeFormat = (e) => {
    setInputColor(['', '', '']);
    setIsInputColorValid(true);
    setCurrentFormat({
      format: e.target.value,
      formatParts: colorFormats[e.target.value],
    });
  };

  const submitColor = (e) => {
    e.preventDefault();

    const isInputValid = isColorValid(inputColor, currentFormat.format);
    setIsInputColorValid(isInputValid);

    if (isInputValid) {
      setCurrentColor(arrayToColorString(inputColor, currentFormat.format));
    }
  };

  const changeColorPart = (e, index) => {
    const newColor = e.target.value;
    const whichPart = index;

    setInputColor((prevColor) => {
      const nextColor = [...prevColor];
      nextColor.splice(whichPart, 1, newColor);
      return nextColor;
    });
  };

  const colorInputs = inputColor.map((colorPartVal, index) => (
    <ColorPartInput
      value={colorPartVal}
      colorPartIndex={index}
      colorFormat={currentFormat.format}
      formatParts={currentFormat.formatParts[index]}
      onChange={changeColorPart}
      isValid={isInputColorValid}
      isDisabled={animationParameters.isOn}
      key={`${currentFormat.formatParts[index]}`}
    />
  ));

  const toggleAnimation = (e) => {
    e.preventDefault();

    if (!animationParameters.interval) return;
    setAnimationParameters((prevAnimationParams) => ({
      ...prevAnimationParams,
      isOn: !prevAnimationParams.isOn,
      incrementValues: [...prevAnimationParams.incrementValues],
    }));
  };

  const changeInterval = (e) => {
    const newInterval = e.target.value !== '' ? +e.target.value : '';

    setAnimationParameters((prevAnimationParams) => ({
      ...prevAnimationParams,
      interval: newInterval,
      incrementValues: [...prevAnimationParams.incrementValues],
    }));
  };

  const changeIncrementValues = (e, index) => {
    const newValue = e.target.value;
    const whichPart = index;

    setAnimationParameters((prevAnimationParams) => {
      const nextIncrementValues = [...prevAnimationParams.incrementValues];
      nextIncrementValues.splice(whichPart, 1, newValue);
      return { ...prevAnimationParams, incrementValues: nextIncrementValues };
    });
  };

  const intervalChangesInputs = animationParameters.incrementValues.map(
    (incrementVal, index) => (
      <ColorPartInput
        value={incrementVal}
        colorPartIndex={index}
        colorFormat={currentFormat.format}
        formatParts={currentFormat.formatParts[index]}
        onChange={changeIncrementValues}
        isDisabled={animationParameters.isOn}
        key={`${currentFormat.formatParts[index]} interval change`}
      />
    )
  );

  useInterval(
    () => {
      const newColor = incrementColor(
        inputColor,
        animationParameters.incrementValues,
        currentFormat.format
      );
      const isValidIncrement = isColorValid(newColor, currentFormat.format);
      if (isValidIncrement) {
        setInputColor(newColor);
        setCurrentColor(arrayToColorString(newColor, currentFormat.format));
      } else {
        setAnimationParameters({ ...animationParameters, isOn: false });
      }
    },
    animationParameters.isOn ? animationParameters.interval : null
  );

  return (
    <StyledColorCycle>
      <GlobalStyle />
      <ColorPreview
        $color={currentColor}
        $textColor={invertColor(colorToHex(currentColor))}
      >
        {currentColor}
      </ColorPreview>

      <ColorFormatInputs
        value={currentFormat.format}
        colorFormats={colorFormats}
        onChange={changeFormat}
        isDisabled={animationParameters.isOn}
      />

      <ColorInputForm
        action=""
        onSubmit={submitColor}
        onBlur={submitColor}
        $prefix={formatSuffixes[currentFormat.format].prefix}
        $postfix={formatSuffixes[currentFormat.format].postfix}
      >
        {colorInputs}
        <HiddenSubmitButton>Submit color</HiddenSubmitButton>
      </ColorInputForm>

      <IntervalForm onSubmit={toggleAnimation}>
        <IntervalColorChanges>
          <IntervalColorChangesLabel>
            Change per interval:
          </IntervalColorChangesLabel>
          {intervalChangesInputs}
        </IntervalColorChanges>
        <label>
          <IntervalLabelText>Interval:</IntervalLabelText>
          <NumberInput
            value={animationParameters.interval}
            onChange={changeInterval}
            disabled={animationParameters.isOn}
            autoComplete="off"
          />
          ms
        </label>
        <SubmitButton>
          {animationParameters.isOn ? 'STOP animation' : 'START animation'}
        </SubmitButton>
      </IntervalForm>
    </StyledColorCycle>
  );
};

export default ColorCycle;
