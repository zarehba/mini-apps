import { useState, useEffect, useRef } from 'react';

const addMinutesToDate = (date, minutes) => {
  const newDate = new Date(date);
  return new Date(newDate.setMinutes(newDate.getMinutes() + minutes));
};
const getMilisecondsTill = (countdownEnd) => countdownEnd - new Date();
const toTimePartString = (timePart) => timePart.toString().padStart(2, '0');
const getMinutesFromMs = (ms) => Math.floor(ms / 1000 / 60).toString();
const getSecondsFromMs = (ms) =>
  toTimePartString(Math.floor(ms / 1000 - getMinutesFromMs(ms) * 60));

const isLongBreak = (sessionCount) => !(sessionCount % 8);
const isBreak = (sessionCount) => !(sessionCount % 2);
const isTimerUp = (msLeft) => msLeft !== null && msLeft - 1000 <= 0;
const nextSessionType = (sessionNo) => {
  if (isLongBreak(sessionNo)) return 'longBreak';
  if (isBreak(sessionNo)) return 'break';
  return 'work';
};

const usePomodoroTimer = (
  clockSettings,
  clockState,
  sound,
  DEFAULT_TIMER_STATE
) => {
  const [timerState, setTimerState] = useState(DEFAULT_TIMER_STATE);
  const timer = useRef(null);

  useEffect(() => {
    if (clockState === 'paused') return clearInterval(timer.current);
    if (clockState === 'stopped') {
      setTimerState(DEFAULT_TIMER_STATE);
      return clearInterval(timer.current);
    }

    function changeTimerState() {
      setTimerState((timerState) => {
        if (isTimerUp(timerState.milisecondsLeft)) sound.play();

        const sessionCnt = isTimerUp(timerState.milisecondsLeft)
          ? timerState.sessionCount + 1
          : timerState.sessionCount;
        const cntdownType = isTimerUp(timerState.milisecondsLeft)
          ? nextSessionType(sessionCnt)
          : timerState.countdownType;
        const msLeft =
          timerState.milisecondsLeft === null ||
          isTimerUp(timerState.milisecondsLeft)
            ? getMilisecondsTill(
                addMinutesToDate(new Date(), clockSettings[cntdownType])
              )
            : timerState.milisecondsLeft - 1000;

        return {
          countdownType: cntdownType,
          milisecondsLeft: msLeft,
          minutesLeft: getMinutesFromMs(msLeft),
          secondsLeft: getSecondsFromMs(msLeft),
          sessionCount: sessionCnt,
        };
      });
    }

    timer.current = setInterval(function () {
      changeTimerState();
    }, 1000);
    changeTimerState();

    return () => {
      clearInterval(timer.current);
    };
  }, [clockSettings, clockState, DEFAULT_TIMER_STATE, sound]);

  return timerState;
};

export default usePomodoroTimer;
