import React from 'react';
import PropTypes from 'prop-types';
import LightsRow from './LightsRow';

const LightsRows = ({ howManyRows, animationParams, isAdvancedMenuShown }) => {
  const lightRowIterator = new Array(howManyRows).fill(1);
  const lightsRows = lightRowIterator.map((_row, index) => (
    <LightsRow
      animationParams={animationParams}
      isAdvancedMenuShown={isAdvancedMenuShown}
      key={`row${index}`}
    />
  ));
  return <>{lightsRows}</>;
};

LightsRows.propTypes = {
  animationParams: PropTypes.shape({
    isAnimationOn: PropTypes.bool,
    animationDuration: PropTypes.number,
    lightIntensity: PropTypes.number,
  }),
  howManyRows: PropTypes.number,
  isAdvancedMenuShown: PropTypes.bool,
};

export default LightsRows;
