import React from 'react';
import PropTypes from 'prop-types';
import { BorderRadiusCorner } from './styles';
import Draggable from 'react-draggable';

const DraggableButton = ({
  buttonData,
  buttonIndex,
  handleDrag,
  squareWidth,
  buttonRadius,
}) => {
  const onDragHandler = handleDrag.bind(this, buttonIndex);

  return (
    <Draggable
      axis={buttonData.horizontal ? 'x' : 'y'}
      position={calculateButtonPosition(buttonData, squareWidth)}
      bounds="parent"
      onDrag={onDragHandler} /* useCallback ? or use data-somthin? */
      key={buttonData.className}
    >
      <BorderRadiusCorner
        className={buttonData.className}
        Radius={buttonRadius}
      >
        {buttonData.contents}
      </BorderRadiusCorner>
    </Draggable>
  );
};

const calculateButtonPosition = (
  { horizontal, left, top, buttonOffset },
  squareWidth
) => {
  const position = { x: 0, y: 0 };
  if (horizontal) {
    position.x = left ? +buttonOffset : squareWidth - buttonOffset;
    position.y = top ? 0 : +squareWidth;
  } else {
    position.x = left ? 0 : +squareWidth;
    position.y = top ? +buttonOffset : squareWidth - buttonOffset;
  }
  return position;
};

DraggableButton.propTypes = {
  buttonData: PropTypes.object.isRequired,
  buttonIndex: PropTypes.number.isRequired,
  handleDrag: PropTypes.func.isRequired,
  squareWidth: PropTypes.number.isRequired,
  buttonRadius: PropTypes.number.isRequired,
};

export default DraggableButton;
