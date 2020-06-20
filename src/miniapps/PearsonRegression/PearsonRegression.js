import React, { useState, useCallback } from 'react';
import {
  calculatePearsonCoefficient,
  interpretPearsonCoefficient,
  calculateArithmeticMean,
  calculateSDeviation,
} from './statisticsFuncs';
import Button, { StyledButton } from '../../shared/Button';
import Input from '../../shared/Input';
import styled, { createGlobalStyle } from 'styled-components';

const STARTING_X = [1, 2, 3, 4, 5];
const STARTING_Y = [1, 2, 3, 4, 50];

const PearsonRegression = () => {
  const [dataPairs, setDataPairs] = useState({ x: STARTING_X, y: STARTING_Y });
  const [pairBeingAdded, setPairBeingAdded] = useState({ x: '', y: '' });
  const [results, setResults] = useState({});

  const handleInput = (which, e) => {
    const newVal = e.target.value;
    setPairBeingAdded((pair) => ({ ...pair, [which]: newVal }));
  };
  const handleInputX = useCallback(handleInput.bind(null, 'x'), []);
  const handleInputY = useCallback(handleInput.bind(null, 'y'), []);

  const addPair = (e) => {
    e.preventDefault();

    if ([pairBeingAdded.x, pairBeingAdded.y].includes('')) {
      window.alert('Value cannot be empty! Insert a number.');
      return;
    }

    setDataPairs((pairs) => ({
      x: [...pairs.x, +pairBeingAdded.x],
      y: [...pairs.y, +pairBeingAdded.y],
    }));
    setResults({});
    setPairBeingAdded({ x: '', y: '' });
  };

  const resetValues = () => {
    setDataPairs({ x: STARTING_X, y: STARTING_Y });
    setResults({});
  };

  const performCalculation = () => {
    setResults({
      arithMeanX: calculateArithmeticMean(dataPairs.x),
      arithMeanY: calculateArithmeticMean(dataPairs.y),
      deviationX: calculateSDeviation(dataPairs.x),
      deviationY: calculateSDeviation(dataPairs.y),
      pearsonCoef: calculatePearsonCoefficient(dataPairs.x, dataPairs.y),
      pearsonInterpret: interpretPearsonCoefficient(
        calculatePearsonCoefficient(dataPairs.x, dataPairs.y)
      ),
    });
  };

  return (
    <StyledPearsonRegression>
      <StyledForm onSubmit={addPair}>
        <Input
          value={pairBeingAdded.x}
          onChange={handleInputX}
          labelText="x"
          inputProps={{ type: 'number' }}
        />
        <Input
          value={pairBeingAdded.y}
          onChange={handleInputY}
          labelText="y"
          inputProps={{ type: 'number' }}
        />
        <StyledButton
          as="input"
          type="submit"
          value="Add data pair"
        ></StyledButton>
      </StyledForm>
      <ButtonReset onClick={resetValues}>Reset values</ButtonReset>
      <ButtonCalculate onClick={performCalculation}>Calculate</ButtonCalculate>

      <PairsTable>
        <caption>Data pairs</caption>
        <thead>
          <tr>
            <th>x</th>
            <th>y</th>
          </tr>
        </thead>
        <tbody>
          {dataPairs.x.map((x, index) => (
            <tr key={index}>
              <td>{x}</td>
              <td>{dataPairs.y[index]}</td>
            </tr>
          ))}
        </tbody>
      </PairsTable>

      <ResultsTable>
        <caption>Results</caption>
        <tbody>
          <tr>
            <td>X arithmetic mean:</td>
            <td>{results.arithMeanX}</td>
          </tr>
          <tr>
            <td>Y arithmetic mean:</td>
            <td>{results.arithMeanY}</td>
          </tr>
          <tr>
            <td>X standard deviation:</td>
            <td>{results.deviationX}</td>
          </tr>
          <tr>
            <td>Y standard deviation:</td>
            <td>{results.deviationY}</td>
          </tr>
          <tr>
            <td>Pearson coefficient:</td>
            <td>{results.pearsonCoef}</td>
          </tr>
          <tr>
            <td>Corelation interpretation:</td>
            <td>{results.pearsonInterpret}</td>
          </tr>
        </tbody>
      </ResultsTable>

      <PersonRegressionStyles />
    </StyledPearsonRegression>
  );
};

const PersonRegressionStyles = createGlobalStyle`
  @media only screen and (min-width: 1024px) {
    html {
      font-size: 75%;
    }
  }

  @media only screen and (min-width: 1600px) {
    html {
      font-size: 100%;
    }
  }
`;

const StyledPearsonRegression = styled.main`
  display: flex;
  flex-wrap: wrap;
  row-gap: 2rem;
  justify-content: center;
  padding-bottom: 4rem;

  @media only screen and (min-width: 610px) {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: repeat(4, auto) 1fr;
    column-gap: 2rem;
  }
`;

const StyledForm = styled.form`
  flex-basis: 75%;

  @media only screen and (min-width: 610px) {
    grid-row: 1/5;
  }

  border: 2px solid Var(--color-blue-dark);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
`;

const ButtonReset = styled(Button)`
  margin: auto;

  @media only screen and (min-width: 610px) {
    grid-row: 2/3;
  }
`;
const ButtonCalculate = styled(Button)`
  margin: auto;

  @media only screen and (min-width: 610px) {
    grid-row: 3/4;
  }
`;

const captionStyle = `
  padding: 1.5rem 0;
  white-space: nowrap;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 2rem;
`;

const tableStyling = `
  border-collapse: collapse;
  border: 2px solid Var(--color-gray);

  th, td {
    padding: 1rem;
    text-align: center;
  }

  th {
    background-color: Var(--color-gray);
    border: 1px solid Var(--color-light);
    color: Var(--color-light);
  }

  td {
    border: 1px solid Var(--color-gray);
  }
`;

const PairsTable = styled.table`
  flex-basis: 85%;
  min-width: 16rem;
  margin: auto;

  @media only screen and (min-width: 610px) {
    grid-row: -2/-1;
  }

  ${tableStyling}

  caption {
    ${captionStyle}
  }
`;

const ResultsTable = styled.table`
  @media only screen and (min-width: 610px) {
    grid-row: -2/-1;
    align-self: start;
  }

  ${tableStyling}

  td {
    min-width: 11.6rem;
    box-sizing: border-box;
  }

  tr td:first-child {
    font-weight: bold;
  }

  caption {
    ${captionStyle}
    padding-left: 10rem;
    text-align: left;
  }
`;

export default PearsonRegression;
