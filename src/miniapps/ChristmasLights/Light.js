import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Range from '../../shared/Range';
import ColorPicker from '../../shared/ColorPicker';
import { StyledLightContainer, StyledLight } from './styles';

const MIN_LIGHT_SIZE = 5;
const MAX_LIGHT_SIZE = parseInt(
  Math.min(
    parseInt(document.body.clientWidth * 0.8),
    parseInt(document.body.clientHeight * 0.8)
  ) / 7
);

const lightSizeOptions = {
  min: 1,
  max: 10,
  step: 1,
};

const valueBetweenMinMax = (value, min = value, max = value) =>
  Math.min(Math.max(value, min), max);
const lerp = (x, y, a) => x * (1 - a) + y * a;
const linearlyInterpolateIntegers = (minValue, maxValue, stepsCount) => {
  const steps = [];
  for (let i = 0; i <= stepsCount; i++) {
    steps.push(parseFloat(lerp(minValue, maxValue, i / stepsCount)));
  }
  return steps;
};
const stepsCountFromRangeOptions = ({ min, max, step }) => (max - min) / step;

const lightSizeSteps = [null].concat(
  linearlyInterpolateIntegers(
    MIN_LIGHT_SIZE,
    MAX_LIGHT_SIZE,
    stepsCountFromRangeOptions(lightSizeOptions)
  )
);
const lightSizeFromSteps = (lightStep) => lightSizeSteps[lightStep];

const Light = ({
  lightColor,
  animationParams: {
    isAnimationOn = false,
    animationDuration = 1000,
    lightIntensity = 1,
  },
  isAdvancedMenuShown = false,
}) => {
  const [lightParameters, setLightParameters] = useState({
    lightSizeStep: 5,
    lightSize: lightSizeFromSteps(5),
    lightColor: lightColor,
  });

  const changeLightSize = (e) => {
    const newSize = valueBetweenMinMax(
      +e.target.value,
      lightSizeOptions.min,
      lightSizeOptions.max
    );

    setLightParameters((lightParams) => ({
      ...lightParams,
      lightSizeStep: newSize,
      lightSize: lightSizeFromSteps(newSize),
    }));
  };

  const changeLightColor = (e) => {
    const newColor = e.target.value;
    setLightParameters((lightParams) => ({
      ...lightParams,
      lightColor: newColor,
    }));
  };

  return (
    <StyledLightContainer>
      <StyledLight
        animationDuration={animationDuration}
        isAnimationOn={isAnimationOn}
        lightIntensity={lightIntensity}
        lightSize={lightParameters.lightSize}
        lightColor={lightParameters.lightColor}
      />
      {isAdvancedMenuShown ? (
        <>
          <Range
            labelText="Change size"
            rangeValue={lightParameters.lightSizeStep}
            onChange={changeLightSize}
            rangeOptions={{ ...lightSizeOptions, style: { margin: '0' } }}
            customStyle={{
              flexDirection: 'column',
              paddingTop: '1rem',
              width: '10rem',
              textAlign: 'center',
              fontSize: '1.5rem',
            }}
          />
          <ColorPicker
            labelText="Change color"
            colorValue={lightParameters.lightColor}
            onChange={changeLightColor}
            colorPickerOptions={{ style: { margin: '5px 0 0 0' } }}
            customStyle={{
              flexDirection: 'column',
              paddingBottom: '4.5rem',
              width: '10rem',
              textAlign: 'center',
              fontSize: '1.5rem',
            }}
          />
        </>
      ) : null}
    </StyledLightContainer>
  );
};

Light.propTypes = {
  lightColor: PropTypes.string.isRequired,
  animationParams: PropTypes.shape({
    isAnimationOn: PropTypes.bool,
    animationDuration: PropTypes.number,
    lightIntensity: PropTypes.number,
  }),
  isAdvancedMenuShown: PropTypes.bool,
};

export default Light;
