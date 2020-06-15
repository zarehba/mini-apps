import React, { useEffect, useCallback, useState } from 'react';
import Button from '../../shared/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TRACKED_KEYSTROKES = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const ArrowButtons = ({ flipHandler }) => {
  const flipHorizontal = useCallback(flipHandler.bind(null, 'horizontal'), [
    flipHandler,
  ]);
  const flipVertical = useCallback(flipHandler.bind(null, 'vertical'), [
    flipHandler,
  ]);

  const keyPressed = useKeyPress(TRACKED_KEYSTROKES);

  useEffect(() => {
    if (!keyPressed) return;
    if (['ArrowLeft', 'ArrowRight'].includes(keyPressed)) flipHorizontal();
    if (['ArrowUp', 'ArrowDown'].includes(keyPressed)) flipVertical();
  }, [flipHorizontal, flipVertical, keyPressed]);

  return (
    <ButtonPanel>
      <b>Image flip controls:</b>
      <ButtonGrid>
        <ArrowButton
          onClick={flipVertical}
          $arrow="up"
          $isPressed={keyPressed === 'ArrowUp'}
        >
          ⬆
        </ArrowButton>
        <ArrowButton
          onClick={flipHorizontal}
          $arrow="left"
          $isPressed={keyPressed === 'ArrowLeft'}
        >
          ⬅
        </ArrowButton>
        <ArrowButton
          onClick={flipVertical}
          $arrow="down"
          $isPressed={keyPressed === 'ArrowDown'}
        >
          ⬇
        </ArrowButton>
        <ArrowButton
          onClick={flipHorizontal}
          $arrow="right"
          $isPressed={keyPressed === 'ArrowRight'}
        >
          ➡
        </ArrowButton>
      </ButtonGrid>
    </ButtonPanel>
  );
};

ArrowButtons.propTypes = {
  flipHandler: PropTypes.func,
};

function useKeyPress(targetKeys) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to that keypress
    const downHandler = (e) => {
      const { key } = e;
      if (targetKeys.includes(key)) {
        e.preventDefault();
        setKeyPressed(key);
      }
    };

    // If released key is our target key then set to null
    const upHandler = ({ key }) => {
      if (targetKeys.includes(key)) {
        setKeyPressed(null);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKeys]);

  return keyPressed;
}

const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;
  font-size: 2rem;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template:
    '.... up ....' 5rem
    'left down right' 5rem / 5rem 5rem 5rem;
  gap: 0.5rem;
`;

const ArrowButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: ${(props) => props.$arrow};
  font-size: 3.5rem;
  ${(props) => props.$isPressed && `opacity: 0.8;`}
`;

export default ArrowButtons;
