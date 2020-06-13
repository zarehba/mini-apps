import React from 'react';
import styled from 'styled-components';

const StyledSubmitInput = styled.input`
  display: block;
  width: 100%;
  cursor: pointer;
  margin: 3rem auto 3rem auto;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid var(--color-blue-dark);
  background: var(--color-blue-dark);
  color: var(--color-white);
  font-size: 2rem;
  box-shadow: 0px 0px 5px var(--color-dark);
  transition: all 0.25s ease;

  :hover,
  :active,
  :focus {
    outline: none;
    color: var(--color-white);
    border: 2px solid var(--color-blue-dark);
    background: var(--color-blue-dark-lighter);
  }
`;

const SubmitInput = (props) => {
  return <StyledSubmitInput type="submit" {...props}></StyledSubmitInput>;
};

export default SubmitInput;
