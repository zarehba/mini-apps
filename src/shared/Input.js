import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { visuallyHidden } from './styledUtilities';

export const StyledLabel = styled.label`
  position: relative;
  top: -0.2rem;
  font-size: 1.6rem;
`;

export const StyledLabelText = styled.span`
  text-transform: capitalize;
  margin-right: 0.3rem;
  ${(props) => (props.isLabelHidden ? visuallyHidden : '')}
`;

export const StyledInput = styled.input`
  position: relative;
  margin-left: 0.2rem;
  padding: 0.3rem 1rem;
  color: Var(--color-blue-medium);
  border: 2px solid Var(--color-blue-dark);
  background: Var(--color-white);
  text-align: center;
  font-size: 0.8em;

  ::-webkit-datetime-edit,
  ::-webkit-datetime-edit-fields-wrapper,
  ::-webkit-datetime-edit-ampm-field,
  ::-webkit-datetime-edit-day-field,
  ::-webkit-datetime-edit-hour-field,
  ::-webkit-datetime-edit-millisecond-field,
  ::-webkit-datetime-edit-minute-field,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-datetime-edit-second-field,
  ::-webkit-datetime-edit-week-field,
  ::-webkit-datetime-edit-year-field,
  ::-webkit-datetime-edit-text {
    color: currentColor;
  }

  :disabled {
    background: Var(--color-blue-light);
    cursor: not-allowed;
    user-select: none;
  }
  :active,
  :focus {
    outline: none;
    border: 2px solid Var(--color-blue-medium);
  }

  ${(props) =>
    !props.$isValid &&
    `
    border: 2px solid Var(--color-danger) !important;
    color: Var(--color-danger) !important;
    `}
`;

const StyledError = styled.div`
  color: Var(--color-danger);
  font-size: 0.8em;
  margin-top: -0.4rem;
  margin-bottom: 0.8rem;
`;

const Input = ({
  value,
  onChange,
  onBlur,
  isValid = true,
  errorMessages = [],
  inputProps = {},
  labelText = '',
  isLabelHidden = false,
  style = {},
}) => {
  const finalInputProps = {
    type: 'text',
    ...inputProps,
    value,
    onChange,
    onBlur,
    $isValid: isValid,
  };

  return (
    <>
      <StyledLabel style={style}>
        <StyledLabelText $isLabelHidden={isLabelHidden}>
          {labelText}
        </StyledLabelText>
        <StyledInput {...finalInputProps}></StyledInput>
      </StyledLabel>

      {errorMessages.map((errMsg) => (
        <StyledError key={errMsg}>{errMsg}</StyledError>
      ))}
    </>
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  isValid: PropTypes.bool,
  errorMessages: PropTypes.array,
  inputProps: PropTypes.object,
  labelText: PropTypes.string,
  isLabelHidden: PropTypes.bool,
  style: PropTypes.object,
};

export default Input;
