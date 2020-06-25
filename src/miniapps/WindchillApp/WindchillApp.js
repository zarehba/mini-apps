import React, { useState, useMemo } from 'react';
import Switch from '../../shared/Switch';
import Input from '../../shared/Input';
import styled, { createGlobalStyle } from 'styled-components';

const calculateWindchill = (temp, wind, isMetricSystem) => {
  // formula works only for wind >= 5 km/h
  let windchill = 0;
  if (wind < 5) {
    windchill = temp;
  } else if (isMetricSystem) {
    windchill = (
      13.12 +
      0.6215 * temp -
      11.37 * wind ** 0.16 +
      0.3965 * temp * wind ** 0.16
    ).toFixed(2);
  } else {
    windchill = (
      35.74 +
      0.6215 * temp -
      35.75 * wind ** 0.16 +
      0.4275 * temp * wind ** 0.16
    ).toFixed(2);
  }

  if (windchill > +temp) {
    windchill = +temp;
  }

  return windchill;
};

const WindchillApp = () => {
  const [temperature, setTemperature] = useState('');
  const [wind, setWind] = useState('');
  const [isMetricSystem, setIsMetricSystem] = useState(true);
  const [errorMsgs, setErrorMsgs] = useState({
    temperature: [],
    wind: [],
  });

  const windchillIndex = useMemo(
    () => calculateWindchill(+temperature, +wind, isMetricSystem),
    [temperature, wind, isMetricSystem]
  );

  const handleMetricSystemChange = (e) =>
    setIsMetricSystem((isMetricSystem) => !isMetricSystem);

  const handleTempChange = (e) => {
    const val = e.target.value;
    setTemperature(val);
    setErrorMsgs((errorMsgs) => ({
      ...errorMsgs,
      temperature: Number.isNaN(parseFloat(val))
        ? ['Temperature must be a number']
        : [],
    }));
  };

  const handleWindChange = (e) => {
    setWind(e.target.value);
    const errors = [];
    if (Number.isNaN(parseFloat(e.target.value)))
      errors.push('Wind speed must be a number');
    if (parseFloat(e.target.value) < 0)
      errors.push('Wind speed cannot be negative');
    setErrorMsgs((errorMsgs) => ({ ...errorMsgs, wind: errors }));
  };

  return (
    <MiniAppContainer $isMetricSystem={isMetricSystem}>
      <Switch
        isChecked={isMetricSystem}
        onChange={handleMetricSystemChange}
        labelText="Use metric system:"
      />
      <Input
        value={temperature}
        onChange={handleTempChange}
        labelText="Temperature:"
        inputProps={{
          type: 'number',
          style: {
            width: '5rem',
          },
        }}
        errorMessages={errorMsgs.temperature}
      />
      <Input
        value={wind}
        onChange={handleWindChange}
        labelText="Wind:"
        inputProps={{
          type: 'number',
          style: {
            width: '5rem',
          },
        }}
        errorMessages={errorMsgs.wind}
      />
      {temperature !== '' && wind !== '' && (
        <WindChillVal>
          Windchill index:
          <span>{`${windchillIndex} °${isMetricSystem ? 'C' : 'F'}`}</span>
        </WindChillVal>
      )}
      <MiniAppStyle />
    </MiniAppContainer>
  );
};

const MiniAppStyle = createGlobalStyle`
  html {
    font-size: 75%;
  }
`;
const MiniAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;

  & > label:first-of-type {
    width: 100%;
    margin: 1rem auto;
  }

  & > label:not(:first-of-type)::after {
    display: inline-block;
    width: 4rem;
    padding-left: 5px;
    box-sizing: border-box;
  }

  & > label:nth-of-type(2)::after {
    content: '${(props) => (props.$isMetricSystem ? ` °C` : ` °F`)}';
  }
  & > label:nth-of-type(3)::after {
    content: '${(props) => (props.$isMetricSystem ? ` kmh` : ` mph`)}';
  }
`;

const WindChillVal = styled.div`
  display: flex;
  place-items: center;
  gap: 1rem;

  span {
    margin-right: 1.5rem;
    color: Var(--color-blue-medium);
    font-weight: bold;
  }
`;
export default WindchillApp;
