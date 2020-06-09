import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  display: block;
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid var(--color-blue-dark);
  font-size: 2rem;
  background: var(--color-white);
  color: var(--color-blue-medium);
  text-align: center;

  ::placeholder {
    text-align: center;
    color: var(--color-dark);
  }

  :focus {
    outline: none;
    border: 2px solid var(--color-blue-medium);
  }

  :read-only {
    cursor: pointer;
    background-color: var(--color-blue-dark);
    color: var(--color-light);

    :focus {
      border: 2px solid var(--color-blue-dark);
      filter: brightness(1.35);
    }
  }
`;

const InputField = (props) => {
  return <StyledInput {...props}>{props.children}</StyledInput>;
};

InputField.propTypes = {
  children: PropTypes.node,
};

export default InputField;
