// login form if borrowed from DynamicCssVarForm miniapp
import React, { useState, useRef, useEffect } from 'react';
import Input from '../../shared/Input';
import Button, { StyledButton } from '../../shared/Button';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled, { createGlobalStyle } from 'styled-components';

const WHITE = '#FFFFFF';
const LIGHT_RED = '#FFDDDD';

const fetchData = async (url) =>
  await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  });

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const Hello = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    user: [],
    password: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const varContainer = useRef(null);
  const greeting = useRef('Hello');

  useEffect(() => {
    async function fetchUserIp() {
      const result = await fetchData('http://ip-api.com/json/?fields=585535');
      return result.query;
    }
    async function fetchGreeting(ip) {
      const result = await fetchData(
        `https://fourtonfish.com/hellosalut/?ip=${ip}`
      );
      return result.hello;
    }

    fetchUserIp()
      .then((ip) => fetchGreeting(ip))
      .then((greetStr) => (greeting.current = decodeHTML(greetStr)))
      .catch(() => (greeting.current = 'Hello'));
  }, []);

  const clearInputs = () => {
    setUser('');
    setPassword('');
    varContainer.current.style.setProperty('--userInputBg', WHITE);
    varContainer.current.style.setProperty('--passwordInputBg', WHITE);
  };
  const handleUser = (e) => setUser(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleCancel = (e) => {
    e.preventDefault();

    clearInputs();
    setErrorMessages({ user: [], password: [] });
  };
  const handleLogout = (e) => {
    setIsLoggedIn(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();

    const validate = (inputValue, inputType) => {
      if (!inputValue.trim()) {
        setErrorMessages((errorMessages) => ({
          ...errorMessages,
          [inputType]: [`${inputType} field cannot be empty`],
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
      setIsInitial(false);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <GreetingMsg>
          {greeting.current}, {user}.<br />
          You have successfully logged in!
        </GreetingMsg>
      )}
      {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}

      {!isInitial && !isLoggedIn && (
        <GreetingMsg>Have a great day, {user}!</GreetingMsg>
      )}
      {isInitial && !isLoggedIn && (
        <HelloForm ref={varContainer} onSubmit={handleLogin}>
          <HelloStyle />
          <Input
            onChange={handleUser}
            value={user}
            labelText="User"
            errorMessages={errorMessages.user}
            inputProps={{
              placeholder: 'User',
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
              placeholder: 'Password',
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
        </HelloForm>
      )}
    </>
  );
};

const HelloStyle = createGlobalStyle`
  html {
    font-size: 87.5%;
   }

   @media only screen and (max-width: 580px) {
    html {
      font-size: 56.25%;
    }
   }
`;

const GreetingMsg = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  font-size: 3rem;
  line-height: 150%;
  border-radius: 5px;
  box-shadow: 0 0 5px Var(--color-dark);
`;

const HelloForm = styled.form`
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

export default Hello;
