import React, { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Input from '../../shared/Input';
import WeatherDisplay, { Error } from './WeatherDisplay';
import styled from 'styled-components';

const WeatherApp = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const getWeather = (e) => {
    e.preventDefault();
    if (!city) {
      return setError('Please insert city name');
    }
    history.push(`${path}/${city}`);
  };

  return (
    <MiniAppContainer>
      <Switch>
        <Route path={`${path}/:city`} component={WeatherDisplay}></Route>
        <Route path={path}>
          <form onSubmit={getWeather}>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              labelText="City:"
            />
            <Input
              value="Submit"
              onChange={() => {}}
              inputProps={{ type: 'submit' }}
              style={{ display: 'none' }}
            />
          </form>
          {!!error && <Error>{error}</Error>}
        </Route>
      </Switch>
    </MiniAppContainer>
  );
};

const MiniAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export default WeatherApp;
