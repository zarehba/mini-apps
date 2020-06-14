/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyledEventCountdown,
  EventTitle,
  CountdownContainer,
  Countdown,
  EventSaveButton,
  EventSaveIcon,
  CountdownNumber,
  CountdownDescription,
} from './styles';

const COUNTDOWN_REFRESH_INTERVAL = 1000;

const EventCountdown = ({
  eventData,
  eventExpiry,
  isEventStored = false,
  handleEventStorage,
}) => {
  const [countdownParts, setCountdownParts] = useState(
    getPeriodsBetween(eventData.datetime, new Date())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownParts(getPeriodsBetween(eventData.datetime, new Date()));
    }, COUNTDOWN_REFRESH_INTERVAL);
    return () => {
      clearInterval(timer);
    };
  }, [eventData.datetime]);

  useEffect(() => {
    if (isObjEmpty(countdownParts)) eventExpiry(eventData.id);
  }, [eventData.id, countdownParts, eventExpiry]);

  const periodNamesInOrder = periodNames
    .filter(
      (periodName) =>
        periodName !== 'miliseconds' && countdownParts[periodName] !== undefined
    )
    .reverse();

  const countdownItems = periodNamesInOrder.map((periodName) => (
    <Countdown key={periodName}>
      <CountdownNumber>{countdownParts[periodName]}</CountdownNumber>
      <CountdownDescription>{periodName}</CountdownDescription>
    </Countdown>
  ));

  return (
    <StyledEventCountdown>
      <EventSaveButton onClick={handleEventStorage} isStored={isEventStored}>
        <EventSaveIcon
          data-event-id={eventData.id}
          data-is-event-stored={isEventStored}
        >
          💾
        </EventSaveIcon>
      </EventSaveButton>
      <EventTitle>{eventData.name}</EventTitle>
      {periodNamesInOrder.length ? 'starts in:' : 'has already started!'}
      <CountdownContainer>{countdownItems}</CountdownContainer>
    </StyledEventCountdown>
  );
};

function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function getPeriodsBetween(futureDate, date) {
  const msDifference = new Date(futureDate) - new Date(date);
  if (msDifference < 0) {
    return {};
  }
  const [periodsBetween] = msToPeriods(msDifference);
  return periodsBetween;
}

const periodNames = [
  'miliseconds',
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
];

const unitsPerPeriod = [1, 1000, 60, 60, 24, 7, Infinity];
const milisecondsPerPeriod = [1, 1000, 60000, 3600000, 86400000, 604800000];

function msToPeriods(timeDiff, periodInd) {
  let countdownParts = {};
  const periodIndex = periodInd || 0;
  const msThisPeriod = milisecondsPerPeriod[periodIndex];

  let periodsDiff = timeDiff / unitsPerPeriod[periodIndex];
  let remainderTimeDiff = periodsDiff * msThisPeriod;

  if (periodsDiff >= unitsPerPeriod[periodIndex + 1]) {
    [countdownParts, remainderTimeDiff] = msToPeriods(
      periodsDiff,
      periodIndex + 1
    );
    periodsDiff = remainderTimeDiff / msThisPeriod;
  }
  const thisPeriodCount = parseInt(periodsDiff);
  countdownParts[periodNames[periodIndex]] = thisPeriodCount;

  remainderTimeDiff = remainderTimeDiff - thisPeriodCount * msThisPeriod;
  return [countdownParts, remainderTimeDiff];
}

EventCountdown.propTypes = {
  eventData: PropTypes.object.isRequired,
  eventExpiry: PropTypes.func.isRequired,
  isEventStored: PropTypes.bool,
  handleEventStorage: PropTypes.func.isRequired,
};

export default EventCountdown;
