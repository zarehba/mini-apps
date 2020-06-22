import React, { useState } from 'react';
import BicycleOne from './assets/BicycleOne.jpg';
import BicycleTwo from './assets/BicycleTwo.jpg';
import BicycleThree from './assets/BicycleThree.jpg';
import BicycleFour from './assets/BicycleFour.jpg';
import BicycleFive from './assets/BicycleFive.jpg';
import Slider from './Slider';

const IMAGE_MAX_WIDTH_PX = 540;
const SLIDE_CHANGE_MS = 5000;

const SliderDesign = () => {
  const [images] = useState([
    BicycleOne,
    BicycleTwo,
    BicycleThree,
    BicycleFour,
    BicycleFive,
  ]);
  return (
    <Slider
      images={images}
      imageMaxWidth={IMAGE_MAX_WIDTH_PX}
      slideChangeMs={SLIDE_CHANGE_MS}
    />
  );
};

export default SliderDesign;
