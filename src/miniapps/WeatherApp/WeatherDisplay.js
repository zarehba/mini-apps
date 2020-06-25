import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../shared/functions';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import Spinner from '../../shared/Spinner';
import styled from 'styled-components';

const WeatherDisplay = () => {
  const params = useParams();
  const city = params?.city;
  const [apiResults, setApiResults] = useState({});

  useEffect(() => {
    const getApiResults = async () => {
      fetchData(URL_GET_WEATHER.replace('{$city}', city))
        .then((res) => {
          setApiResults(res);
        })
        .catch((err) => {
          setApiResults({
            error:
              'There was an error fetching weather data \u2639\uFE0F \nor city does not exist \u{1F306}',
          });
        });
    };
    getApiResults();
  }, [city]);

  return (
    <>
      {!apiResults.current && !apiResults.error && <Spinner />}
      {apiResults.current && (
        <Weather>
          <h2>{`${apiResults.location.name} (${apiResults.location.country})`}</h2>
          <WeatherCondition>
            <img
              src={`https:${apiResults.current.condition.icon}`}
              alt="Weather icon"
            />
            <div>{apiResults.current.condition.text}</div>
          </WeatherCondition>
          <WeatherInfo>
            Temperature: <InfoValue>{apiResults.current.temp_c} °C</InfoValue>
          </WeatherInfo>
          <WeatherInfo>
            Wind: <InfoValue>{apiResults.current.gust_kph} km/h</InfoValue>
          </WeatherInfo>
          <WeatherInfo>
            Humidity: <InfoValue>{`${apiResults.current.humidity}%`}</InfoValue>
          </WeatherInfo>
        </Weather>
      )}
      {!!apiResults.error && <Error>{apiResults.error}</Error>}
    </>
  );
};

const Weather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  ${cardEnlargingOnHover}
  padding: 3rem;
  font-size: 2rem;
  text-align: center;

  :hover {
    transform: none;
  }

  h2 {
    padding: 0.5rem;
    margin-bottom: -0.5rem;
    border-bottom: 2px solid Var(--color-blue-dark-lighter);
    color: Var(--color-blue-dark);
    font-size: 2.4rem;
  }
`;

const WeatherCondition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 10rem;
  width: 100%;
  font-weight: bold;

  img {
    height: 100%;
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const InfoValue = styled.div`
  font-weight: bold;
`;

export const Error = styled.div`
  line-height: 175%;
  color: Var(--color-danger);
  text-align: center;
  white-space: pre;
`;

// Thanks for obfuscation go to http://www.jsfuck.com/ :-D
const API_KEY =
  (!![] + [])[!+[] + !+[] + !+[]] +
  ([][[]] + [])[!+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[]] +
  ([][
    (![] + [])[+[]] +
      (![] + [])[!+[] + !+[]] +
      (![] + [])[+!+[]] +
      (!![] + [])[+[]]
  ] + [])[!+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] +
  ([][
    (![] + [])[+[]] +
      (![] + [])[!+[] + !+[]] +
      (![] + [])[+!+[]] +
      (!![] + [])[+[]]
  ] + [])[!+[] + !+[] + !+[]] +
  ([][[]] + [])[!+[] + !+[]] +
  (![] + [])[+!+[]] +
  ([][[]] + [])[!+[] + !+[]] +
  (!![] + [])[!+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[] + !+[]] +
  ([][
    (![] + [])[+[]] +
      (![] + [])[!+[] + !+[]] +
      (![] + [])[+!+[]] +
      (!![] + [])[+[]]
  ] + [])[!+[] + !+[] + !+[]] +
  ([][
    (![] + [])[+[]] +
      (![] + [])[!+[] + !+[]] +
      (![] + [])[+!+[]] +
      (!![] + [])[+[]]
  ] + [])[!+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] +
  ([][
    (![] + [])[+[]] +
      (![] + [])[!+[] + !+[]] +
      (![] + [])[+!+[]] +
      (!![] + [])[+[]]
  ] + [])[!+[] + !+[] + !+[]] +
  (!![] + [])[!+[] + !+[] + !+[]] +
  [!+[] + !+[]] +
  [+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] +
  [!+[] + !+[]] +
  [+!+[]] +
  [+[]] +
  [!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] +
  [+[]] +
  [!+[] + !+[]];

const URL_GET_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q={$city}`;

export default WeatherDisplay;
