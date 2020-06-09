import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledForm = styled.form`
  position: relative;
`;

const TheForm = (props) => {
  return <StyledForm {...props}>{props.children}</StyledForm>;
};

TheForm.propTypes = {
  children: PropTypes.node,
};

export default TheForm;
