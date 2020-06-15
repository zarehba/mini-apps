import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SpinnerSvg } from '../assets/spinner.svg';

const Spinner = ({ style }) => {
  return (
    <div style={style}>
      <SpinnerSvg></SpinnerSvg>
    </div>
  );
};

Spinner.propTypes = {
  style: PropTypes.object,
};

export default Spinner;
