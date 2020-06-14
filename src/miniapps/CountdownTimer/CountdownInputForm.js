import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { StyledCountdownInputForm, StyledTitle } from './styles';

const CountdownInputForm = ({
  eventInput,
  eventValidity,
  onSubmit,
  onChange,
}) => {
  const inputs = Object.entries(eventInput).map(([fieldName, fieldValue]) => {
    let customStyle = {};
    if (fieldName === 'datetime') customStyle = { display: 'none' };
    return (
      <Input
        value={fieldValue}
        onChange={onChange}
        labelText={`${fieldName}:`}
        isValid={eventValidity[fieldName]?.isValid}
        errorMessages={eventValidity[fieldName]?.errorMessages}
        inputProps={{
          type: fieldName === 'name' ? 'text' : fieldName,
          name: fieldName,
          autoComplete: 'off',
        }}
        key={fieldName}
        style={customStyle}
      />
    );
  });

  return (
    <StyledCountdownInputForm onSubmit={onSubmit} noValidate>
      <StyledTitle>Add event countdown</StyledTitle>
      {inputs}
      <Button type="submit">Set countdown</Button>
    </StyledCountdownInputForm>
  );
};

CountdownInputForm.propTypes = {
  eventInput: PropTypes.object.isRequired,
  eventValidity: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CountdownInputForm;
