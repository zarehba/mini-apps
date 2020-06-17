import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled from 'styled-components';

const START_INPUTS = {
  gmail: {
    value: '',
    placeholder: 'YourAddress@gmail.com',
    type: 'email',
    validRegex: /\S+@gmail.com$/,
    isValid: true,
  },
  user: {
    value: '',
    placeholder: 'only letters',
    type: 'text',
    validRegex: /^[A-Za-z]+$/,
    isValid: true,
  },
  password: {
    value: '',
    placeholder: '6 letters and 4 symbols',
    type: 'password',
    validRegex: /^(?=(?:.*[a-zA-Z].*){6})(?!(?:.*[a-zA-Z].*){7,})(?=(?:.*[^A-Za-z 0-9].*){4})(?!(?:.*[^A-Za-z 0-9].*){5,}).{10}$/,
    isValid: true,
  },
};

const JavascriptValidationWithRegex = () => {
  const [isRegistrationFinished, setIsRegistrationFinished] = useState(false);
  const [inputs, setInputs] = useState(START_INPUTS);
  const history = useHistory();

  const validateInputs = () => {
    const validations = Object.entries(inputs).reduce(
      (result, [fieldName, fieldParams]) => ({
        ...result,
        [fieldName]: fieldParams.validRegex.test(fieldParams.value),
      }),
      {}
    );

    const changeIsValids = (inputs) =>
      Object.entries(inputs).reduce(
        (obj, [fieldName, fieldParams]) => ({
          ...obj,
          [fieldName]: {
            ...fieldParams,
            isValid: validations[fieldName],
          },
        }),
        {}
      );

    setInputs(changeIsValids);

    const getInvalids = (validations) =>
      Object.values(validations).filter((val) => !val);
    const isArrEmpty = (arr) => !arr.length;
    const areInputsValid = (validations) =>
      isArrEmpty(getInvalids(validations));

    return areInputsValid(validations);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) setIsRegistrationFinished(true);
  };

  useEffect(() => {
    if (!isRegistrationFinished) return;

    const timer = setTimeout(() => {
      history.push('/');
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [history, isRegistrationFinished]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: { ...inputs[name], value: value },
    }));
  };

  const inputsElements = Object.entries(inputs).map(
    ([fieldName, fieldParams]) => {
      return (
        <Input
          value={fieldParams.value}
          onChange={onChange}
          labelText={`${fieldName}:`}
          isValid={fieldParams.isValid}
          errorMessages={
            fieldParams.isValid ? [] : ['Input does not fulfill requirements!']
          }
          inputProps={{
            type: fieldParams.type,
            placeholder: fieldParams.placeholder,
            name: fieldName,
            autoComplete: 'off',
          }}
          key={fieldName}
          style={{
            width: '75%',
            textAlign: 'right',
          }}
        />
      );
    }
  );

  return (
    <>
      {isRegistrationFinished && (
        <RegisteredMsg>
          User has been successfully registered!
          <br />
          Redirecting...
        </RegisteredMsg>
      )}
      {!isRegistrationFinished && (
        <StyledCountdownInputForm onSubmit={onSubmit} noValidate>
          <StyledTitle>REGISTRATION</StyledTitle>
          <InputsContainer>{inputsElements}</InputsContainer>
          <Button type="submit">Register user</Button>
        </StyledCountdownInputForm>
      )}
    </>
  );
};

const RegisteredMsg = styled.span`
  margin: 2rem auto;
  font-size: 2.4rem;
  line-height: 4rem;
  text-align: center;
`;

const StyledCountdownInputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem Max(1rem, 5vw);
  text-align: center;
  ${cardEnlargingOnHover}
`;

const StyledTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 2.2rem;
  color: Var(--color-blue-dark);
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  width: 34rem;
  margin-bottom: 1rem;
  @media only screen and (min-width: 568px) {
    padding-right: 3rem;
  }
`;

export default JavascriptValidationWithRegex;
