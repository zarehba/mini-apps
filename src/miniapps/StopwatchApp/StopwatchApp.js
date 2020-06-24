import React, { useEffect, useReducer } from 'react';
import Button from '../../shared/Button';
import styled, { createGlobalStyle, css } from 'styled-components';

const INITIAL_STATE = {
  isOn: false,
  laps: [],
  timerStart: null,
  timerTime: null,
  lapTime: null,
  ticks: 0,
};

const stopwatchReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isOn: true,
        timerStart: !state.timerStart
          ? +new Date()
          : new Date() - state.timerTime,
      };
    case 'LAP':
      return {
        ...state,
        isOn: true,
        laps: [new Date() - state.timerStart, ...state.laps],
      };
    case 'STOP':
      return { ...state, isOn: false };
    case 'CLEAR_LAPS':
      return { ...state, laps: [] };
    case 'RESTART':
      return INITIAL_STATE;
    case 'TICK':
      return {
        ...state,
        timerTime: state.timerStart ? new Date() - state.timerStart : null,
        lapTime: state.laps.length
          ? new Date() - state.timerStart - state.laps[0]
          : null,
        ticks: state.ticks + 1,
      };
    default:
      throw new Error(`Action ${action.type} has not been defined`);
  }
};

const splitTime = (ms) => {
  //const hours = ('00' + Math.floor(ms / 3600000)).slice(-2);
  const minutes = ('00' + (Math.floor(ms / 60000) % 60)).slice(-2);
  const seconds = ('00' + (Math.floor(ms / 1000) % 60)).slice(-2);
  const centiseconds = ('00' + (Math.floor(ms / 10) % 100)).slice(-2);
  return {
    //hours: hours,
    minutes: minutes,
    seconds: seconds,
    centiseconds: centiseconds,
  };
};
const formatTime = (ms) => {
  const { /*hours,*/ minutes, seconds, centiseconds } = splitTime(ms);
  return /*`${hours}:*/ `${minutes}:${seconds}:${centiseconds}`;
};

const StopwatchApp = () => {
  const [state, dispatch] = useReducer(stopwatchReducer, INITIAL_STATE);

  useEffect(() => {
    if (!state.isOn) return;
    window.requestAnimationFrame(() =>
      dispatch({
        type: 'TICK',
      })
    );
  }, [state.isOn, dispatch, state.ticks]);

  return (
    <>
      <StopwatchButtons>
        <Button
          onClick={() => dispatch({ type: 'START' })}
          disabled={state.isOn}
        >
          {!state.isOn && state.timerTime ? '⏱ Resume' : '⏱ Start'}
        </Button>
        <Button
          onClick={() => dispatch({ type: 'STOP' })}
          disabled={!state.isOn}
        >
          Stop
        </Button>
        <Button
          onClick={() => dispatch({ type: 'LAP' })}
          disabled={!state.isOn}
        >
          Lap
        </Button>
        <Button
          onClick={() => dispatch({ type: 'CLEAR_LAPS' })}
          disabled={!state.laps.length}
        >
          Clear laps
        </Button>
        <Button onClick={() => dispatch({ type: 'RESTART' })}>Restart</Button>
      </StopwatchButtons>
      <StopwatchClocks>
        {!!state.timerTime && (
          <TotalTime>
            Total: <span>{formatTime(state.timerTime)}</span>
          </TotalTime>
        )}
        {!!state?.laps.length && (
          <>
            <LapTime>
              Lap: <span>{formatTime(state.lapTime)}</span>
            </LapTime>
            <Laps>
              <span>Laps:</span>
              {state.laps.map((lapTime) => (
                <Lap key={lapTime}>{formatTime(lapTime)}</Lap>
              ))}
            </Laps>
          </>
        )}
      </StopwatchClocks>
      <MiniAppStyles />
    </>
  );
};

const MiniAppStyles = createGlobalStyle`
  html {
    @media only screen and (min-width: 768px) {
      font-size: 75%;
    }
    @media only screen and (min-width: 1024px) {
      font-size: 100%;
    }
    @media only screen and (min-width: 1600px) {
      font-size: 125%;
    }
  }
`;

const StopwatchClocks = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 3rem;
  font-size: 2rem;
`;

const timeStyling = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 29rem;

  span {
    display: inline-block;
    text-align: center;
    font-weight: bold;
  }
`;

const TotalTime = styled.div`
  ${timeStyling}
  span {
    font-size: 2.25em;
  }
`;

const LapTime = styled.div`
  ${timeStyling}
  span {
    font-size: 1.5em;
  }
`;

const Laps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  margin-top: 2rem;

  span {
    display: block;
  }
`;

const Lap = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`;

const StopwatchButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  user-select: none;
`;

export default StopwatchApp;
