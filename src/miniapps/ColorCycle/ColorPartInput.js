import React from 'react';
import PropTypes from 'prop-types';
import { colorSuffixes } from './colorUtils';
import { ColorLabel, ColorLabelText, ColorInput } from './styles.js';

function ColorPartInput({
  value,
  colorPartIndex,
  colorFormat,
  formatParts,
  onChange,
  isValid = true,
  isDisabled = false,
}) {
  const changeHandler = (e) => onChange(e, colorPartIndex);

  return (
    <ColorLabel
      $formatPart={formatParts}
      $formatSuffix={colorSuffixes[colorFormat][colorPartIndex]}
    >
      <ColorLabelText>{`${colorFormat} ${formatParts}`}</ColorLabelText>
      <ColorInput
        value={value}
        onChange={changeHandler}
        $isValid={isValid}
        disabled={isDisabled}
        autoComplete="off"
      />
    </ColorLabel>
  );
}

ColorPartInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  colorPartIndex: PropTypes.number.isRequired,
  colorFormat: PropTypes.string.isRequired,
  formatParts: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default ColorPartInput;
