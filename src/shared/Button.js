import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledButton = styled.button`
  display: block;
  padding: 1rem;
  border-radius: 5px;
  border: 2px solid var(--color-blue-dark);
  background: var(--color-blue-dark);
  color: var(--color-white);
  font-size: 1.6rem;
  cursor: pointer;
  box-shadow: 0px 0px 5px var(--color-dark);
  transition: all 0.25s ease;

  :hover,
  :focus {
    opacity: 0.95;
    outline: none;
    color: var(--color-white);
    border: 2px solid var(--color-blue-dark);
    background: var(--color-blue-dark-lighter);
  }

  :active {
    opacity: 0.75;
    border: 2px solid var(--color-blue-dark-lighter);
    background: var(--color-blue-dark-lighter);
  }
`;

const Button = ({ onClick, children = '', ...buttonProps }) => {
  return (
    <StyledButton onClick={onClick} {...buttonProps}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  buttonProps: PropTypes.object,
};

export default Button;
