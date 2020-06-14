import React, { useState, useRef } from 'react';
import Input from '../../shared/Input';
import Button, { StyledButton } from '../../shared/Button';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled, { createGlobalStyle } from 'styled-components';

const WHITE = '#FFFFFF';
const LIGHT_YELLOW = '#FFFFAA';
const LIGHT_RED = '#FFDDDD';
const USER_VAL = 'testuser';
const PASS_VAL = 'mypassword';

const DynamicCSSVar = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    user: [],
    password: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const varContainer = useRef(null);

  const clearInputs = () => {
    setUser('');
    setPassword('');
    varContainer.current.style.setProperty('--userInputBg', WHITE);
    varContainer.current.style.setProperty('--passwordInputBg', WHITE);
  };
  const handleUser = (e) => setUser(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCancel = () => {
    clearInputs();
  };
  const handleLogin = (e) => {
    e.preventDefault();

    const validate = (inputValue, inputType) => {
      if (inputValue.includes(' ')) {
        setErrorMessages((errorMessages) => ({
          ...errorMessages,
          [inputType]: [`${inputType} contains space character`],
        }));
        return LIGHT_YELLOW;
      }
      if (
        (inputType === 'user' && inputValue !== USER_VAL) ||
        (inputType === 'password' && inputValue !== PASS_VAL)
      ) {
        setErrorMessages((errorMessages) => ({
          ...errorMessages,
          [inputType]: [`${inputType} is incorrect`],
        }));
        return LIGHT_RED;
      }
      setErrorMessages((errorMessages) => ({
        ...errorMessages,
        [inputType]: [],
      }));
      return WHITE;
    };

    const userBg = validate(user, 'user');
    const passBg = validate(password, 'password');
    varContainer.current.style.setProperty('--userInputBg', userBg);
    varContainer.current.style.setProperty('--passwordInputBg', passBg);
    if (userBg === WHITE && passBg === WHITE) {
      setIsLoggedIn(true);
      clearInputs();
    }
  };

  return (
    <>
      {' '}
      {isLoggedIn && <LoggedIn>Logged in successfully.</LoggedIn>}
      {!isLoggedIn && (
        <DynamicCssVarForm ref={varContainer} onSubmit={handleLogin}>
          <DynamicCssVarStyle />
          <Input
            onChange={handleUser}
            value={user}
            labelText="User"
            errorMessages={errorMessages.user}
            inputProps={{
              placeholder: USER_VAL,
              style: { background: 'Var(--userInputBg)' },
            }}
            style={{ marginLeft: 'auto' }}
          />
          <Input
            onChange={handlePassword}
            value={password}
            labelText="Password"
            errorMessages={errorMessages.password}
            inputProps={{
              type: 'password',
              placeholder: PASS_VAL,
              style: { background: 'Var(--passwordInputBg)' },
            }}
            style={{ marginLeft: 'auto' }}
          />
          <ButtonsContainer>
            <StyledButton
              as="input"
              type="submit"
              onClick={handleLogin}
              value="Login"
            />
            <Button
              onClick={handleCancel}
              style={{
                opacity: 0.8,
              }}
            >
              Cancel
            </Button>
          </ButtonsContainer>
        </DynamicCssVarForm>
      )}
    </>
  );
};

const DynamicCssVarStyle = createGlobalStyle`
  html {
    font-size: 87.5%;
   }

   @media only screen and (max-width: 580px) {
    html {
      font-size: 56.25%;
    }
   }
`;

const LoggedIn = styled.div`
  margin-top: 1rem;
  padding: 4rem 2rem;
  font-size: 2rem;
  ${cardEnlargingOnHover}
`;

const DynamicCssVarForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1rem;
  padding: 5rem 2.5rem 2.5rem 2.5rem;
  text-align: right;
  ${cardEnlargingOnHover}
  --userInputBg: ${WHITE};
  --passwordInputBg: ${WHITE};
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
`;

export default DynamicCSSVar;
