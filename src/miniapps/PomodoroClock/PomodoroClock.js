import React, { useState, useReducer } from 'react';
import usePomodoroTimer from './usePomodoroTimer';
import PomodoroInputs from './PomodoroInputs';
import Button from '../../shared/Button';
import dingDing from '../../assets/DingDing.mp3';
import styled, { createGlobalStyle } from 'styled-components';

const dingDingSound = new Audio(dingDing);

const DEFAULT_SETTINGS = {
  work: 25,
  break: 5,
  isLongBreakOn: true,
  longBreak: 10,
};
const DEFAULT_TIMER_STATE = {
  countdownType: 'work',
  milisecondsLeft: null,
  minutesLeft: null,
  secondsLeft: null,
  sessionCount: 1,
};

const settingsChangeReducer = (state, action) => {
  switch (action.type) {
    case 'isLongBreakOn':
      return { ...state, isLongBreakOn: !state.isLongBreakOn };
    case 'all':
      return action.payload;
    default:
      const newVal = action.payload <= 0 ? 1 : action.payload;
      return { ...state, [action.type]: newVal };
  }
};

const PomodoroClock = () => {
  const [clockSettings, settingsDispatch] = useReducer(
    settingsChangeReducer,
    DEFAULT_SETTINGS
  );
  const [clockState, setClockState] = useState('stopped');
  const timerState = usePomodoroTimer(
    clockSettings,
    clockState,
    dingDingSound,
    DEFAULT_TIMER_STATE
  );

  const clockStart = () => setClockState('started');
  const clockPause = () => setClockState('paused');
  const clockStop = () => setClockState('stopped');
  const clockReset = () =>
    settingsDispatch({ type: 'all', payload: DEFAULT_SETTINGS });

  return (
    <PomodoroContainer>
      <Clock>
        <h2>
          {timerState.countdownType === 'longBreak'
            ? 'long break'
            : `${timerState.countdownType} session`}
        </h2>
        {`${timerState.minutesLeft || clockSettings.work}:${
          timerState.secondsLeft || '00'
        }`}
      </Clock>

      <PomodoroInputs
        clockSettings={clockSettings}
        settingsDispatch={settingsDispatch}
        clockState={clockState}
      />

      <Controls>
        <Button onClick={clockStart} disabled={clockState === 'started'}>
          Start
        </Button>
        <Button onClick={clockPause} disabled={clockState !== 'started'}>
          Pause
        </Button>
        <Button onClick={clockStop} disabled={clockState === 'stopped'}>
          Stop
        </Button>
        <Button onClick={clockReset} disabled={clockState !== 'stopped'}>
          Reset
        </Button>
      </Controls>
      <PomodoroGlobalStyles />
    </PomodoroContainer>
  );
};

const PomodoroGlobalStyles = createGlobalStyle`
  html {
    @media only screen and (min-width: 768px) {
      font-size: 68.75%;
    }

    @media only screen and (min-width: 1200px) {
      font-size: 75%;
    }
  }
`;

const PomodoroContainer = styled.main`
  display: flex;
  flex-direction: column;
  row-gap: 4rem;
`;

const Clock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 30rem;
  margin: auto;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 50rem;
  font-weight: bold;
  font-size: 10rem;
  color: Var(--color-blue-medium);
  text-transform: capitalize;
  box-shadow: 0 0 20px Var(--color-gray);

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    margin-top: -1.5rem;
    color: Var(--color-blue-dark);
    font-size: 3rem;
    text-align: center;
  }
`;

const Controls = styled.div`
  display: flex;
  column-gap: 2rem;
  justify-content: center;
`;

export default PomodoroClock;
