import React, { useState } from 'react';
import Switch from '../../shared/Switch';
import Range from '../../shared/Range';
import LightsRows from './LightsRows';
import { ChristmasLightsGlobalStyle, StyledChristmasLight } from './styles';

const MIN_ANIMATION_DURATION = 20;
const MAX_ANIMATION_DURATION = 3000;

const MIN_LIGHT_INTENSITY = 0.6;
const MAX_LIGHT_INTENSITY = 1.5;

const animationSpeedOptions = {
  min: 1,
  max: 10,
  step: 1,
};

const lightRowsNumberOptions = {
  min: 1,
  max: 7,
  step: 1,
};

const lightIntensityOptions = {
  min: 1,
  max: 5,
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

const animationDurationSteps = [null].concat(
  linearlyInterpolateIntegers(
    MIN_ANIMATION_DURATION,
    MAX_ANIMATION_DURATION,
    stepsCountFromRangeOptions(animationSpeedOptions)
  )
);
const animationDurationFromSpeed = (speedStep) =>
  animationDurationSteps[animationDurationSteps.length - speedStep];

const lightIntensitySteps = [null].concat(
  linearlyInterpolateIntegers(
    MIN_LIGHT_INTENSITY,
    MAX_LIGHT_INTENSITY,
    stepsCountFromRangeOptions(lightIntensityOptions)
  )
);
const lightIntensityFromStep = (lightIntensityStep) =>
  lightIntensitySteps[lightIntensityStep];

const ChristmasLights = () => {
  const [animationParams, setAnimationParams] = useState({
    isAnimationOn: false,
    animationSpeed: 5,
    animationDuration: animationDurationFromSpeed(5),
    lightIntensityStep: 3,
    lightIntensity: lightIntensityFromStep(3),
  });
  const [isAdvancedMenuShown, setIsAdvancedMenuShown] = useState(false);
  const [lightsRowsNumber, setLightsRowsNumber] = useState(1);

  const toggleLights = () => {
    setAnimationParams((animationParams) => ({
      ...animationParams,
      isAnimationOn: !animationParams.isAnimationOn,
    }));
  };

  const changeAnimationSpeed = (e) => {
    const newSpeed = valueBetweenMinMax(
      +e.target.value,
      animationSpeedOptions.min,
      animationSpeedOptions.max
    );

    setAnimationParams((animParams) => ({
      ...animParams,
      animationSpeed: newSpeed,
      animationDuration: animationDurationFromSpeed(newSpeed),
    }));
  };

  const toggleAdvancedMenu = () => {
    setIsAdvancedMenuShown((isAdvancedMenuShown) => !isAdvancedMenuShown);
  };

  const changeLightRowsNumber = (e) => {
    setLightsRowsNumber(+e.target.value);
  };

  const changeLightIntensity = (e) => {
    const newIntensity = valueBetweenMinMax(
      +e.target.value,
      lightIntensitySteps.min,
      lightIntensitySteps.max
    );

    setAnimationParams((animParams) => ({
      ...animParams,
      lightIntensityStep: newIntensity,
      lightIntensity: lightIntensityFromStep(newIntensity),
    }));
  };

  return (
    <StyledChristmasLight>
      <ChristmasLightsGlobalStyle />
      <LightsRows
        howManyRows={lightsRowsNumber}
        animationParams={animationParams}
        isAdvancedMenuShown={isAdvancedMenuShown}
      />
      <Switch
        labelText="Toggle flickering"
        isChecked={animationParams.isAnimationOn}
        onChange={toggleLights}
        customStyle={{ fontSize: '2.5rem', width: '35rem', marginTop: '5rem' }}
      ></Switch>
      <Range
        labelText="Change animation speed"
        rangeValue={animationParams.animationSpeed}
        onChange={changeAnimationSpeed}
        rangeOptions={animationSpeedOptions}
        customStyle={{ fontSize: '2.5rem', width: '35rem' }}
      />
      <Switch
        labelText="Show advanced configuration options"
        isChecked={isAdvancedMenuShown}
        onChange={toggleAdvancedMenu}
        customStyle={{ fontSize: '2.5rem', width: '35rem' }}
      />
      {isAdvancedMenuShown ? (
        <>
          <Range
            labelText="Change number of lights rows"
            rangeValue={lightsRowsNumber}
            onChange={changeLightRowsNumber}
            rangeOptions={lightRowsNumberOptions}
            customStyle={{ fontSize: '2.5rem', width: '35rem' }}
          />
          <Range
            labelText="Change lights' intensity"
            rangeValue={animationParams.lightIntensityStep}
            onChange={changeLightIntensity}
            rangeOptions={lightIntensityOptions}
            customStyle={{ fontSize: '2.5rem', width: '35rem' }}
          />
        </>
      ) : null}
    </StyledChristmasLight>
  );
};

export default ChristmasLights;
