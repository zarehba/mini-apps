import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Textarea = ({ value, label, onChange, onUpload, ...textAreaProps }) => {
  return (
    <>
      <StyledTextareaLabel>
        {label}
        <StyledTextarea onChange={onChange} value={value} {...textAreaProps} />
        {onUpload && <input type="file" onChange={onUpload} />}
      </StyledTextareaLabel>
    </>
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onUpload: PropTypes.func,
};

const StyledTextareaLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  font-size: 2.2rem;
`;

const StyledTextarea = styled.textarea`
  height: min(30rem, 35vh);
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 2px solid Var(--color-blue-medium);
  border-radius: 5px;
  box-shadow: 0 0 8px Var(--color-gray);
  color: Var(--color-blue-medium);
  font-size: 2rem;

  ::placeholder {
    color: Var(--color-blue-medium);
    opacity: 0.4;
  }
  :hover {
    outline: none;
    border-color: Var(--color-blue-light);
  }
  :focus {
    outline: none;
    border-color: Var(--color-blue-dark);
  }
`;

export default Textarea;
