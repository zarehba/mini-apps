import React, { useState, useCallback, useEffect } from 'react';
import CountdownInputForm from './CountdownInputForm';
import EventCountdown from './EventCountdown';
import Button from '../../shared/Button';
import { StyledCountdownTimer, GlobalStyle } from './styles';

const DEFAULT_OFFSET_SECONDS = 57200;
const DEFAULT_INPUT = {
  name: 'The amazing concert!',
  date: formatDateToIso(dateSecondsFromNow(DEFAULT_OFFSET_SECONDS)),
  time: dateToTime(dateSecondsFromNow(DEFAULT_OFFSET_SECONDS)),
  datetime: `${formatDateToIso(
    dateSecondsFromNow(DEFAULT_OFFSET_SECONDS)
  )} ${dateToTime(dateSecondsFromNow(DEFAULT_OFFSET_SECONDS))}`,
};
const EVENTS_FROM_STORAGE = getEventsFromStorage();
const DEFAULT_IS_FORM = isArrEmpty(EVENTS_FROM_STORAGE) ? true : false;

const CountdownTimer = () => {
  const [isInputFormShown, setIsInputFormShown] = useState(DEFAULT_IS_FORM);
  const [eventInput, setEventInput] = useState(DEFAULT_INPUT);
  const [eventInputValidity, setEventInputValidity] = useState({});
  const [userEvents, setUserEvents] = useState(EVENTS_FROM_STORAGE);
  const [savedEvents, setSavedEvents] = useState(EVENTS_FROM_STORAGE);

  const eventInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setEventInput((eInput) => ({
        ...eInput,
        [name]: value,
      }));
      setEventInputValidity((prevValidity) => ({
        ...prevValidity,
        [name]: checkInputValidity(name, value),
      }));
      return;
    }

    const dateAndTime = [
      eventInput.date,
      eventInput.time !== '' ? eventInput.time : '00:00',
    ];
    if (name === 'date') dateAndTime[0] = value;
    if (name === 'time') dateAndTime[1] = value !== '' ? value : '00:00';
    const dateTime = dateAndTime.join(' ');

    setEventInput((eInput) => ({
      ...eInput,
      [name]: value,
      datetime: dateTime,
    }));
    setEventInputValidity((prevValidity) => ({
      ...prevValidity,
      [name]: checkInputValidity(name, value),
      datetime: checkInputValidity(dateTime),
    }));
  };

  const submitEvent = (e) => {
    e.preventDefault();
    const inputValidities = checkFormValidity(eventInput);

    if (!isEveryInputValid(inputValidities)) {
      setEventInputValidity(inputValidities);
      return;
    }

    setUserEvents((prevEvents) => [
      ...prevEvents,
      { ...eventInput, id: generatePseudoUuid() },
    ]);
    setEventInput(DEFAULT_INPUT);
    setIsInputFormShown(false);
    setEventInputValidity({});
  };

  const toggleIsInputFormShown = () =>
    setIsInputFormShown((prevIsShown) => !prevIsShown);

  const eventExpiry = useCallback(
    (id) => {
      setUserEvents((userEvents) => eventsExceptId(userEvents, id));
      setSavedEvents((savedEvents) => eventsExceptId(savedEvents, id));

      window.alert(
        `Your event:\n\t${
          findEventById(userEvents, id).name
        }\n has already started!`
      );
    },
    [userEvents]
  );

  const handleEventStorage = (e) => {
    const idToSave = e.target.dataset.eventId;
    const isStored = getBoolean(e.target.dataset.isEventStored);
    const modifiedEvent = findEventById(userEvents, idToSave);

    if (isStored) {
      setSavedEvents((savedEvents) =>
        eventsExceptId(savedEvents, modifiedEvent.id)
      );
    }
    if (!isStored) {
      setSavedEvents((savedEvents) =>
        addEventToCollection(savedEvents, modifiedEvent)
      );
    }
  };

  useEffect(() => {
    saveEventsToStorage(savedEvents);
  }, [savedEvents]);

  return (
    <StyledCountdownTimer>
      <GlobalStyle />
      {userEvents.map((userEv) => (
        <EventCountdown
          eventData={userEv}
          eventExpiry={eventExpiry}
          isEventStored={!isObjEmpty(findEventById(savedEvents, userEv.id))}
          handleEventStorage={handleEventStorage}
          key={userEv.id}
        />
      ))}
      {isInputFormShown ? (
        <CountdownInputForm
          eventInput={eventInput}
          eventValidity={eventInputValidity}
          onChange={eventInputChange}
          onSubmit={submitEvent}
        />
      ) : null}
      <Button onClick={toggleIsInputFormShown} style={{ marginTop: '2rem' }}>
        {isInputFormShown ? 'Cancel adding countdown' : 'Add a countdown'}
      </Button>
    </StyledCountdownTimer>
  );
};

function isArrEmpty(arr) {
  return arr === undefined || arr.length === 0;
}
function isObjEmpty(obj) {
  return obj === undefined || Object.keys(obj).length === 0;
}
function getBoolean(str) {
  return str === 'false' ? false : true;
}

function generatePseudoUuid() {
  return (Date.now() + parseInt(Math.random() * 1000000000000)).toString(36);
}

function dateSecondsFromNow(s) {
  const now = new Date();
  now.setSeconds(now.getSeconds() + s);
  return now;
}

function formatDateToIso(date) {
  return [
    date.getFullYear(),
    ('0' + (date.getMonth() + 1)).slice(-2),
    ('0' + date.getDate()).slice(-2),
  ].join('-');
}

function dateToTime(date) {
  return [
    ('0' + date.getHours()).slice(-2),
    ('0' + date.getMinutes()).slice(-2),
  ].join(':');
}

function getEventsFromStorage() {
  return JSON.parse(localStorage.getItem('savedEvents')) || [];
}

function saveEventsToStorage(events) {
  return localStorage.setItem('savedEvents', JSON.stringify(events));
}

function eventsExceptId(events, id) {
  return events.filter((evnt) => evnt.id !== id);
}
function findEventById(events, id) {
  return events.find((evnt) => evnt.id === id);
}

function checkInputValidity(field, input) {
  const validity = { isValid: true, errorMessages: [] };
  switch (field) {
    case 'name':
      if (input === '') {
        validity.isValid = false;
        validity.errorMessages.push('Name cannot be empty');
      }
      return validity;
    case 'date':
      if (input === '') {
        validity.isValid = false;
        validity.errorMessages.push('Date is invalid');
      }
      if (new Date(input) >= new Date('20000-01-01')) {
        validity.isValid = false;
        validity.errorMessages.push('Date is too far in the future');
      }
      return validity;
    case 'datetime':
      if (new Date() >= new Date(input)) {
        validity.isValid = false;
        validity.errorMessages.push('Event cannot be in the past');
      }
      return validity;
    case 'time':
    case 'id':
    default:
      return validity;
  }
}

function checkFormValidity(eventInput) {
  return Object.entries(eventInput).reduce(
    (validitiesArr, [key, val]) => ({
      ...validitiesArr,
      [key]: checkInputValidity(key, val),
    }),
    {}
  );
}

function isEveryInputValid(validities) {
  return isArrEmpty(
    Object.values(validities).filter((inputValidity) => !inputValidity.isValid)
  );
}

function addEventToCollection(events, addedEvent) {
  const oldEvents = eventsExceptId(events, addedEvent.id);
  if (events.length !== oldEvents.length) return events;
  return [...oldEvents, addedEvent];
}

export default CountdownTimer;
