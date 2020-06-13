import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColorPickerLabel = styled.label.attrs((props) => ({
  style: props.customStyle,
}))`
  display: flex;
  justify-items: flex-end;
  align-items: center;
  position: relative;
  margin-top: 1.5rem;
  box-sizing: border-box;
  text-align: right;
`;

const ColorPickerInput = styled.input.attrs((props) => ({ type: 'color' }))`
  margin-left: 1.5rem;
  width: 4.4rem;
  height: 2.3rem;
`;

const ColorPicker = ({
  onChange,
  colorValue,
  labelText = 'Pick color',
  colorPickerOptions,
  customStyle,
}) => {
  return (
    <ColorPickerLabel customStyle={customStyle}>
      {labelText}
      <ColorPickerInput
        value={colorValue}
        onChange={onChange}
        {...colorPickerOptions}
      />
    </ColorPickerLabel>
  );
};

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  colorValue: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  colorPickerOptions: PropTypes.object,
  customStyle: PropTypes.object,
};

export default ColorPicker;
