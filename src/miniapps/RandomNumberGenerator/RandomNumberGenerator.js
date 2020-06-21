import React, { useState } from 'react';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import styled from 'styled-components';

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const RandomNumberGenerator = () => {
  const [minimum, setMinimum] = useState(1);
  const [maximum, setMaximum] = useState(10);
  const [number, setNumber] = useState(null);

  const generateNewNumber = () =>
    setNumber(generateRandomNumber(minimum, maximum));

  return (
    <MiniAppContainer>
      <Input
        value={minimum}
        onChange={(e) => setMinimum(Math.min(maximum, e.target.value))}
        labelText="Minimum:"
        inputProps={{ type: 'number', style: { maxWidth: '6rem' } }}
      />
      <Input
        value={maximum}
        onChange={(e) => setMaximum(Math.max(minimum, e.target.value))}
        labelText="Maximum:"
        inputProps={{ type: 'number', style: { maxWidth: '6rem' } }}
      />
      <Button onClick={generateNewNumber}>Get random number</Button>
      <Number $radius={number?.toString().length}>{number}</Number>
    </MiniAppContainer>
  );
};

const MiniAppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  text-align: center;
  font-size: 2rem;

  & > *:not(:nth-child(-n + 2)) {
    grid-column: 1/-1;
    margin: auto;
  }
`;

const Number = styled.div`
  display: grid;
  place-content: center;
  height: ${(props) => (props.$radius ? props.$radius + 2.5 : 0)}ch;
  width: ${(props) => (props.$radius ? props.$radius + 2.5 : 0)}ch;
  border-radius: 50%;
  font-size: 3rem;
  box-shadow: 0 0 5px Var(--color-blue-dark);
`;

export default RandomNumberGenerator;
