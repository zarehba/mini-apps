import React, { useState, useEffect, useRef } from 'react';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import Log from './Log';
import IOTMailboxClass from './IOTMailboxClass';
import letterInMailbox from '../../assets/letterInMailbox.mp3';
import styled from 'styled-components';

const DEFAULT_CHECK_SMAILMAIL_INTERVAL = 750;
const newMailSound = new Audio(letterInMailbox);

const IOTMailbox = () => {
  const [isMonitoringOn, setIsMonitoringOn] = useState(false);
  const [logHistory, setLogHistory] = useState([]);
  const [checkIntervalMs, setCheckIntervalMs] = useState(
    DEFAULT_CHECK_SMAILMAIL_INTERVAL
  );
  const IOT = useRef(null);

  const addToLog = (logMsg) =>
    setLogHistory((logHistory) => [
      `[${new Date().toLocaleString()}] ${logMsg}`,
      ...logHistory,
    ]);

  const startMonitoring = () => {
    setIsMonitoringOn(true);

    const newMailHandle = async () => {
      addToLog(`Mailbox has been OPENED 📬!`);
      newMailSound.play();
    };
    const mailboxStatusChange = async (prevLightLevel, lightLevel) => {
      addToLog(
        `Mailbox state changed - lightLevel: ${lightLevel}. The door is currently ${
          lightLevel > 0 ? 'open 📭.' : 'closed 📪.'
        }`
      );
      if (prevLightLevel <= 0 && lightLevel > 0) newMailHandle();
    };

    if (!IOT.current)
      IOT.current = new IOTMailboxClass(
        checkIntervalMs,
        mailboxStatusChange,
        addToLog
      );
    IOT.current.startMonitoring();
  };

  const stopMonitoring = () => {
    setIsMonitoringOn(false);
    IOT.current.stopMonitoring();
  };

  const resetApp = () => {
    IOT.current.stopMonitoring();
    IOT.current = null;
    setIsMonitoringOn(false);
    setLogHistory([]);
    setCheckIntervalMs(DEFAULT_CHECK_SMAILMAIL_INTERVAL);
  };

  useEffect(() => {
    if (IOT.current) IOT.current.signalInterval = checkIntervalMs;
  }, [checkIntervalMs]);

  return (
    <IOTMailboxContainer>
      <ButtonsContainer>
        <Button onClick={startMonitoring} disabled={isMonitoringOn}>
          Start monitoring
        </Button>
        <Button onClick={stopMonitoring} disabled={!isMonitoringOn}>
          Stop monitoring
        </Button>
        <Button onClick={resetApp}>RESET</Button>
        <Input
          value={checkIntervalMs}
          onChange={(e) => setCheckIntervalMs(e.target.value)}
          labelText="Check mailbox every [ms]:"
          inputProps={{ disabled: isMonitoringOn }}
          style={{ marginLeft: '0.5rem', lineHeight: '175%' }}
        />
      </ButtonsContainer>
      <Log logHistory={logHistory}></Log>
    </IOTMailboxContainer>
  );
};

const IOTMailboxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 4rem;
  row-gap: 3rem;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonsContainer = styled.div`
  grid-column: 1/-1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  row-gap: 2rem;
  padding: 3rem 0;
  text-align: center;
`;

export default IOTMailbox;
