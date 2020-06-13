import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RangeLabel = styled.label.attrs((props) => ({
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

const RangeInput = styled.input.attrs((props) => ({ type: 'range' }))`
  margin-left: 1.5rem;
  width: 100%;
`;

const Range = ({
  onChange,
  rangeValue,
  labelText = 'Choose',
  rangeOptions,
  customStyle,
}) => {
  return (
    <RangeLabel customStyle={customStyle}>
      {labelText}
      <RangeInput value={rangeValue} onChange={onChange} {...rangeOptions} />
    </RangeLabel>
  );
};

Range.propTypes = {
  onChange: PropTypes.func.isRequired,
  rangeValue: PropTypes.number.isRequired,
  labelText: PropTypes.string,
  rangeOptions: PropTypes.object,
  customStyle: PropTypes.object,
};

export default Range;
