import React from 'react';
import Input from '../../shared/Input';
import PropTypes from 'prop-types';

const addSpacesToCamelCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1 $2');
const PomodoroInput = ({ setting, value, settingsDispatch, disabled }) => {
  return (
    <Input
      value={value}
      onChange={(e) => {
        settingsDispatch({ type: setting, payload: +e.target.value });
      }}
      labelText={`${addSpacesToCamelCase(setting)} duration:`}
      inputProps={{
        type: 'number',
        disabled: disabled,
        style: { width: '4rem' },
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    />
  );
};

PomodoroInput.propTypes = {
  setting: PropTypes.string,
  value: PropTypes.number,
  settingsDispatch: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PomodoroInput;
