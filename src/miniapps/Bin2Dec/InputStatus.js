import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInputStatus = styled.span`
  display: block;
  width: 100%;
  position: absolute;
  margin-top: -3px;
  letter-spacing: 1px;
  font-size: 1.6rem;
  font-style: italic;
  color: ${(props) => {
    switch (props.type) {
      case 'success':
        return 'Var(--color-success)';
      case 'error':
        return 'Var(--color-danger)';
      default:
        return 'Var(--color-info)';
    }
  }};
  text-align: center;
  transform: translateY(-100%);
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
  transition: all 0.3s ease;
`;

const InputStatus = (props) => {
  return (
    <StyledInputStatus type={props.type} isHidden={props.isHidden}>
      {props.children}
    </StyledInputStatus>
  );
};

InputStatus.propTypes = {
  type: PropTypes.string,
  isHidden: PropTypes.bool,
  children: PropTypes.node,
};

export default InputStatus;
