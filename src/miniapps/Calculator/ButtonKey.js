import React from 'react';
import PropTypes from 'prop-types';
import { StyledButtonKey } from './styles';

const ButtonKey = ({ onPress, type, children }) => {
  // const onClickHandler = onPress.bind(this, children, type);
  const onClickHandler = () => onPress(children, type);

  return (
    <StyledButtonKey onClick={onClickHandler} Type={type}>
      {children}
    </StyledButtonKey>
  );
};

ButtonKey.propTypes = {
  onPress: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonKey;
