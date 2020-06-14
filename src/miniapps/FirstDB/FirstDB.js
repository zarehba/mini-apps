import React, { useState } from 'react';
import { loadDB, queryDB, clearDB } from './CustomerDB';
import Customers from './Customers';
import Log from './Log';
import Button from '../../shared/Button';
import styled, { createGlobalStyle } from 'styled-components';

const FirstDB = () => {
  const [customers, setCustomers] = useState([]);
  const [buttonsEnabled, setButtonsEnabled] = useState({
    load: false,
    query: false,
    clear: true,
  });
  const [logHistory, setLogHistory] = useState([]);

  const addToLog = (logMsg) =>
    setLogHistory((logHistory) => [
      `[${new Date().toLocaleString()}] ${logMsg}`,
      ...logHistory,
    ]);

  const handleLoad = () => {
    loadDB(addToLog);
    setButtonsEnabled({ load: true, query: false, clear: false });
  };

  const handleData = (custData) => {
    setCustomers(custData);
  };
  const handleQuery = () => {
    queryDB(addToLog, handleData);
  };

  const handleClear = () => {
    clearDB(addToLog);
    setCustomers([]);
    setButtonsEnabled({ load: false, query: false, clear: true });
  };

  return (
    <FirstDbContainer>
      <FirstDbStyle />
      <ButtonsContainer>
        <Button onClick={handleLoad} disabled={buttonsEnabled.load}>
          Load DB
        </Button>
        <Button onClick={handleQuery} disabled={buttonsEnabled.query}>
          Query DB
        </Button>
        <Button onClick={handleClear} disabled={buttonsEnabled.clear}>
          Clear DB
        </Button>
      </ButtonsContainer>
      <Customers customersData={customers} />
      <Log logHistory={logHistory}></Log>
    </FirstDbContainer>
  );
};

const FirstDbStyle = createGlobalStyle`
  html {
    font-size: 50%;
  }
`;
const FirstDbContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 4rem;
  row-gap: 3rem;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonsContainer = styled.div`
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  padding: 3rem 0;
`;

export default FirstDB;
