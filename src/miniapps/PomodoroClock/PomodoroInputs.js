import React from 'react';
import PomodoroInput from './PomodoroInput';
import Switch from '../../shared/Switch';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PomodoroInputs = ({ clockState, clockSettings, settingsDispatch }) => {
  return (
    <InputsContainer>
      <PomodoroInput
        value={clockSettings.work}
        setting="work"
        settingsDispatch={settingsDispatch}
        disabled={clockState !== 'stopped'}
      />
      <PomodoroInput
        value={clockSettings.break}
        setting="break"
        settingsDispatch={settingsDispatch}
        disabled={clockState !== 'stopped'}
      />
      <Switch
        onChange={(e) => settingsDispatch({ type: 'isLongBreakOn' })}
        isChecked={clockSettings.isLongBreakOn}
        labelText="Long Break:"
        customStyle={{ marginTop: '0px' }}
        disabled={clockState !== 'stopped'}
      />
      <PomodoroInput
        value={clockSettings.longBreak}
        setting="longBreak"
        settingsDispatch={settingsDispatch}
        disabled={clockState !== 'stopped'}
      />
    </InputsContainer>
  );
};

PomodoroInputs.propTypes = {
  clockSettings: PropTypes.object,
  settingsDispatch: PropTypes.func,
  clockState: PropTypes.string,
};

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  column-gap: 2rem;
  justify-items: end;
`;

export default PomodoroInputs;
