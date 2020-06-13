import React from 'react';
import PropTypes from 'prop-types';
import Light from './Light';
import { StyledLightsRow } from './styles';

const DEFAULT_LIGHT_COLORS = [
  '#FF0000',
  '#D2691E',
  '#FFA500',
  '#FFFF00',
  '#7CFC00',
  '#0000FF',
  '#663399',
];

const LightsRow = ({ animationParams, isAdvancedMenuShown }) => {
  const lights = DEFAULT_LIGHT_COLORS.map((lightColor, index) => (
    <Light
      lightColor={lightColor}
      animationParams={animationParams}
      isAdvancedMenuShown={isAdvancedMenuShown}
      key={`light${index}`}
    />
  ));

  return <StyledLightsRow>{lights}</StyledLightsRow>;
};

LightsRow.propTypes = {
  animationParams: PropTypes.object,
  isAdvancedMenuShown: PropTypes.bool,
};

export default LightsRow;
