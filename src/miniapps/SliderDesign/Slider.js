import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

function useImageWidth(imageMaxWidth) {
  const [screenWidth, setWidth] = useState(window.screen.availWidth);

  useEffect(() => {
    const updateWidthAndHeight = () => {
      setWidth(window.screen.availWidth);
    };

    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  }, []);

  return {
    imageWidth: Math.floor(Math.min(screenWidth, imageMaxWidth)),
    imageGutterWidth: Math.floor(Math.min(screenWidth, imageMaxWidth) / 16),
  };
}

const sliderReducer = (state, action) => {
  switch (action.type) {
    case 'PREV':
      if (state.currentImage === 0) {
        return { ...state, currentImage: state.images.length - 1 };
      }
      return { ...state, currentImage: state.currentImage - 1 };

    case 'NEXT':
      if (state.currentImage === state.images.length - 1) {
        return { ...state, currentImage: 0 };
      }
      return { ...state, currentImage: state.currentImage + 1 };
    default:
      return { ...state, currentImage: state.currentImage };
  }
};

const Slider = ({ images, imageMaxWidth = 640, slideChangeMs = 5000 }) => {
  const { imageWidth, imageGutterWidth } = useImageWidth(imageMaxWidth);
  const [state, dispatch] = useReducer(sliderReducer, {
    images: images,
    currentImage: 0,
  });

  useEffect(() => {
    const changeSlide = () => dispatch({ type: 'NEXT' });
    const interval = setInterval(changeSlide, slideChangeMs);
    return () => {
      clearInterval(interval);
    };
  }, [slideChangeMs]);

  return (
    <SliderContainer>
      <SliderView>
        <ButtonPrev onClick={() => dispatch({ type: 'PREV' })}>
          <span>V</span>
        </ButtonPrev>
        {state.images.map((img, ind) => (
          <SliderPicture
            key={ind}
            src={img}
            alt={`Slide no. ${ind}`}
            $currentImage={state.currentImage}
          />
        ))}
        <ButtonNext onClick={() => dispatch({ type: 'NEXT' })}>
          <span>V</span>
        </ButtonNext>
      </SliderView>
      <SliderStyles
        $imageWidth={imageWidth}
        $imageGutterWidth={imageGutterWidth}
      />
    </SliderContainer>
  );
};

const SliderStyles = createGlobalStyle`
  html {
  --IMAGE_WIDTH: ${(props) => props.$imageWidth}px;
  --IMAGES_GUTTER: ${(props) => props.$imageGutterWidth}px;
  --BUTTON_HEIGHT: ${(props) => props.$imageGutterWidth}px;
  }
`;

const SliderContainer = styled.div`
  width: Var(--IMAGE_WIDTH);
  overflow: hidden;
`;

const SliderView = styled.div`
  display: flex;
  gap: Var(--IMAGES_GUTTER);
  position: relative;

  & > img:first-of-type {
    margin-left: calc(Var(--IMAGES_GUTTER) / 2);
  }
`;

const buttonArrow = styled.button`
  display: grid;
  place-content: center;
  position: absolute;
  top: 50%;
  height: Var(--BUTTON_HEIGHT);
  padding: calc(Var(--BUTTON_HEIGHT) / 4);
  box-sizing: content-box;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  color: rgba(0, 0, 0, 0.5);
  font-size: Var(--BUTTON_HEIGHT);
  font-weight: bold;
  z-index: 5;
  cursor: pointer;
  transition: 0.25s all ease;
  mix-blend-mode: hard-light;

  span {
    writing-mode: vertical-rl;
    padding-right: calc(Var(--BUTTON_HEIGHT) / 10);
  }

  :hover {
    background: rgba(255, 255, 255, 0.5);
  }
  :focus {
    background: rgba(255, 255, 255, 0.75);
    outline: none;
    /* outline: 2px solid rgba(255, 255, 255, 0.75); */
  }
`;

const ButtonPrev = styled(buttonArrow)`
  left: 0;
  transform: translateY(-50%);
`;

const ButtonNext = styled(buttonArrow)`
  right: 0;
  transform: scaleX(-1) translateY(-50%);
`;

const SliderPicture = styled.img`
  height: auto;
  width: Var(--IMAGE_WIDTH);
  border-radius: 5px;
  transition: 1s transform cubic-bezier(0.65, 0, 0.35, 1);

  transform: translateX(
      calc(-1 * Var(--IMAGE_WIDTH) * ${(props) => props.$currentImage})
    )
    translateX(
      calc(-1 * Var(--IMAGES_GUTTER) * ${(props) => props.$currentImage + 0.5})
    );
`;

Slider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageMaxWidth: PropTypes.number,
  slideChangeMs: PropTypes.number,
};

export default Slider;
