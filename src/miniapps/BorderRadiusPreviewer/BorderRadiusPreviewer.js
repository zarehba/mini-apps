import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import {
  BorderRadiusContainer,
  BorderRadiusPreview,
  BorderRadiusCorner,
  StyledInnerForm,
  StyledLabel,
  StyledInnerInput,
  StyledAfterInput,
  CopyToClipboardButton,
  SuccessMessage,
  StyledOuterForm,
  StyledOuterInput,
} from './styles';

const DEFAULT_SQUARE_WIDTH = valueBetweenMinMax(
  Math.min(
    parseInt(document.body.clientWidth * 0.7),
    parseInt(document.body.clientHeight * 0.7)
  ),
  200,
  500
);

const BorderRadiusPreviewer = () => {
  const [squareWidth, setSquareWidth] = useState(DEFAULT_SQUARE_WIDTH);
  const buttonRadius = Math.max(Math.ceil(0.03 * squareWidth), 10);
  const [draggableButtons, setDraggableButtons] = useState(
    generateButtonArray(buttonRadius)
  );
  const [isStringCopied, copyStringToClipboard] = useCopyToClipboard(1000);

  const squareBorderRadius = generateSquareBorderRadius(
    draggableButtons,
    squareWidth
  );

  const handleDrag = (whichBorderRadius, e, position) => {
    e.preventDefault(); // looks like this blocks selecting text inside dragged element
    const { x, y } = position;

    setDraggableButtons((prevDraggableButtons) => {
      const changingButton = prevDraggableButtons[whichBorderRadius];

      if (changingButton.horizontal) {
        changingButton.buttonOffset = changingButton.left ? x : squareWidth - x;
      }
      if (!changingButton.horizontal) {
        changingButton.buttonOffset = changingButton.top ? y : squareWidth - y;
      }

      const newDraggableButtons = [...prevDraggableButtons];
      newDraggableButtons[whichBorderRadius] = changingButton;
      return newDraggableButtons;
    });
  };

  const circularButtons = draggableButtons.map((btn, index) => (
    <Draggable
      axis={btn.horizontal ? 'x' : 'y'}
      position={calculateButtonPosition(btn, squareWidth)}
      bounds="parent"
      onDrag={handleDrag.bind(null, index)}
      key={btn.className}
    >
      <BorderRadiusCorner className={btn.className} Radius={buttonRadius}>
        {btn.contents}
      </BorderRadiusCorner>
    </Draggable>
  ));

  const changeRadiusHandler = (e) => {
    const borderRadiusInput = e.target.value;
    const calculatedOffsets = borderRadiusInput
      .split(/(\s)/)
      .map((radiusValue) =>
        parseFloat(radiusValue)
          ? `${distancePercentToPx(parseFloat(radiusValue), squareWidth)}`
          : NaN
      )
      .filter((offset) => !Number.isNaN(offset));
    if (calculatedOffsets.length !== 8) return;

    const newDraggableButtons = [];
    draggableButtons.forEach((btn, index) => {
      newDraggableButtons.push({
        ...btn,
        buttonOffset: calculatedOffsets[index],
      });
    });
    setDraggableButtons(newDraggableButtons);
  };

  const copyBorderRadiusHandler = (e) => {
    copyStringToClipboard(squareBorderRadius);
  };

  const changeSquareWidth = (e) => {
    const newSquareSize = valueBetweenMinMax(
      +e.target.value,
      +e.target.min,
      +e.target.max
    );
    setSquareWidth(newSquareSize);

    setDraggableButtons(
      draggableButtons.map((btn) => ({
        ...btn,
        buttonOffset: (btn.buttonOffset * newSquareSize) / squareWidth,
      }))
    );
  };

  const submitHandler = (e) => e.preventDefault();
  const submitSquareWidth = (e) => e.preventDefault();

  return (
    <>
      <BorderRadiusContainer Side={squareWidth + buttonRadius}>
        {circularButtons}

        <BorderRadiusPreview
          Side={squareWidth}
          SquareBorderRadius={squareBorderRadius}
        >
          <StyledInnerForm
            action=""
            onSubmit={submitHandler}
            FontSize={1 + (squareWidth - 200) * 0.002}
          >
            <StyledLabel htmlFor="borderRadiusString">
              border-radius &#123;
            </StyledLabel>
            <StyledInnerInput
              onChange={changeRadiusHandler}
              type="text"
              id="borderRadiusString"
              name="borderRadiusString"
              value={squareBorderRadius}
              size={squareBorderRadius.length + 10}
              contentEditable
              autoComplete="off"
            />
            <CopyToClipboardButton onClick={copyBorderRadiusHandler}>
              <span aria-label="copy to clipboard" role="img">
                📋
              </span>
            </CopyToClipboardButton>
            <StyledAfterInput>&#125;</StyledAfterInput>
            <SuccessMessage IsHidden={!isStringCopied}>
              border-radius string copied to clipboard!
            </SuccessMessage>
          </StyledInnerForm>
        </BorderRadiusPreview>
      </BorderRadiusContainer>
      <StyledOuterForm
        action=""
        onSubmit={submitSquareWidth}
        fontSize={1 + (squareWidth - 100) * 0.002}
      >
        <StyledLabel htmlFor="squareWidth">Square size:</StyledLabel>
        <StyledOuterInput
          onChange={changeSquareWidth}
          value={squareWidth}
          size={squareBorderRadius.length + 10}
          min="200"
          max="1000"
          type="number"
          id="squareWidth"
          name="squareWidth"
          autoComplete="off"
        />
      </StyledOuterForm>
    </>
  );
};

/* general utility functions */
function valueBetweenMinMax(value, min = value, max = value) {
  return Math.min(Math.max(value, min), max);
}
function roundFloat(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

/* component-specific functions */
const distancePxToPercent = (distancePx, wholeDistance) =>
  `${roundFloat((distancePx / wholeDistance) * 100, 1)}`;

const distancePercentToPx = (distancePercent, wholeDistance) =>
  `${roundFloat((distancePercent / 100) * wholeDistance, 1)}`;

const defaultOffset = (btnRadius) => 5 * btnRadius;

const generateButtonArray = (buttonRadius) => [
  {
    className: 'topLeftHorizontal',
    contents: '↖',
    top: true,
    left: true,
    horizontal: true,
    buttonOffset: defaultOffset(buttonRadius),
  },
  {
    className: 'topRightHorizontal',
    contents: '↗',
    top: true,
    left: false,
    horizontal: true,
    buttonOffset: defaultOffset(buttonRadius),
  },
  {
    className: 'bottomRightHorizontal',
    contents: '↘',
    top: false,
    left: false,
    horizontal: true,
    buttonOffset: defaultOffset(buttonRadius),
  },
  {
    className: 'bottomLeftHorizontal',
    contents: '↙',
    top: false,
    left: true,
    horizontal: true,
    buttonOffset: defaultOffset(buttonRadius),
  },
  {
    className: 'topLeftVertical',
    contents: '↖',
    top: true,
    left: true,
    horizontal: false,
    buttonOffset: defaultOffset(buttonRadius),
  },
  {
    className: 'topRightVertical',
    contents: '↗',
    top: true,
    left: false,
    horizontal: false,
    buttonOffset: defaultOffset(buttonRadius),
  },
  {
    className: 'bottomRightVertical',
    contents: '↘',
    top: false,
    left: false,
    horizontal: false,
    buttonOffset: defaultOffset(buttonRadius),
  },
  {
    className: 'bottomLeftVertical',
    contents: '↙',
    top: false,
    left: true,
    horizontal: false,
    buttonOffset: defaultOffset(buttonRadius),
  },
];

const calculateButtonPosition = (
  { horizontal, left, top, buttonOffset },
  squareWidth
) => {
  const position = { x: 0, y: 0 };
  if (horizontal) {
    position.x = left ? buttonOffset : squareWidth - buttonOffset;
    position.y = top ? 0 : squareWidth;
  } else {
    position.x = left ? 0 : squareWidth;
    position.y = top ? buttonOffset : squareWidth - buttonOffset;
  }
  return position;
};

const generateSquareBorderRadius = (draggableButtons, squareWidth) =>
  draggableButtons
    .filter((btn) => btn.horizontal)
    .reduce(
      (horizontalBorderRadiuses, btn) =>
        (horizontalBorderRadiuses += `${distancePxToPercent(
          btn.buttonOffset,
          squareWidth
        )}% `),
      ''
    ) +
  '/' +
  draggableButtons
    .filter((btn) => !btn.horizontal)
    .reduce(
      (verticalBorderRadiuses, btn) =>
        (verticalBorderRadiuses += ` ${distancePxToPercent(
          btn.buttonOffset,
          squareWidth
        )}%`),
      ''
    );

export default BorderRadiusPreviewer;
