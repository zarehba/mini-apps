import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 2.4rem;
`;

const InputLabel = (props) => {
  return <StyledLabel {...props}>{props.children}</StyledLabel>;
};

InputLabel.propTypes = {
  children: PropTypes.node,
};

export default InputLabel;
