import React from 'react';
import PropTypes from 'prop-types';
import { colorFormats } from './colorUtils';
import {
  ColorFormatLabel,
  ColorFormatLabelText,
  ColorFormatSelect,
} from './styles.js';

function ColorFormatInputs({ value, onChange, isDisabled = false }) {
  return (
    <ColorFormatLabel>
      <ColorFormatLabelText>Pick color format:</ColorFormatLabelText>
      <ColorFormatSelect
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      >
        {Object.keys(colorFormats).map((format) => {
          return (
            <option value={format} key={format}>
              {format}
            </option>
          );
        })}
      </ColorFormatSelect>
    </ColorFormatLabel>
  );
}

ColorFormatInputs.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default ColorFormatInputs;
