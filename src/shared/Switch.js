import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SwitchLabel = styled.label.attrs((props) => ({
  style: props.customStyle,
}))`
  display: flex;
  justify-items: flex-end;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-top: 1.5rem;
  padding-right: 6rem;
  box-sizing: border-box;
  text-align: right;
`;

const SwitchCheckbox = styled.input.attrs((props) => ({ type: 'checkbox' }))`
  margin-left: 1.5rem;
  opacity: 0;
  width: 0;
  height: 0;

  :checked + span {
    background-color: Var(--color-blue-medium);
  }

  :focus + span {
    box-shadow: 0 0 1px Var(--color-blue-medium);
  }

  :checked + span::before {
    -webkit-transform: translateX(2.6rem);
    -ms-transform: translateX(2.6rem);
    transform: translateX(2.6rem);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  right: 0;
  width: 6rem;
  height: 3.4rem;
  border-radius: 9999px;
  cursor: pointer;
  background-color: Var(--color-gray);
  transition: 0.4s;

  ::before {
    position: absolute;
    content: '';
    height: 2.6rem;
    width: 2.6rem;
    top: 0.4rem;
    left: 0.4rem;
    border-radius: 50%;
    background-color: Var(--color-white);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

const Switch = ({
  onChange,
  isChecked = false,
  customStyle,
  labelText = 'Toggle',
}) => {
  return (
    <SwitchLabel customStyle={customStyle}>
      {labelText}
      <SwitchCheckbox checked={isChecked} onChange={onChange} />
      <SwitchSlider></SwitchSlider>
    </SwitchLabel>
  );
};

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
  labelText: PropTypes.string,
  customStyle: PropTypes.object,
};

export default Switch;
