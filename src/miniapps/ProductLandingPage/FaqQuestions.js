import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as TriangleSvg } from './assets/icons/triangle-fill.svg';
import {
  FaqSingleContainer,
  FaqQuestion,
  FaqAnswer,
  ButtonBlue,
} from './styles';

const FaqQuestions = ({ QandAs }) => {
  const [collapsedStates, setCollapsedStates] = useState(
    QandAs.map((el) => false)
  );
  const handleCollapse = (index) =>
    setCollapsedStates((collapsedStates) => {
      const newStates = [...collapsedStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  const handleAll = () =>
    setCollapsedStates((collapsedStates) => {
      const newBool = collapsedStates.includes(false) ? true : false;
      return collapsedStates.map((state) => newBool);
    });

  return (
    <>
      {QandAs.map(({ title, content }, index) => (
        <FaqSingleContainer key={title} $isCollapsed={!collapsedStates[index]}>
          <FaqQuestion
            onClick={() => handleCollapse(index)}
            $isCollapsed={!collapsedStates[index]}
          >
            <h3>{title}</h3>
            <TriangleSvg />
          </FaqQuestion>
          <FaqAnswer $isCollapsed={!collapsedStates[index]}>
            {content}
          </FaqAnswer>
        </FaqSingleContainer>
      ))}
      <ButtonBlue onClick={handleAll}>
        {collapsedStates.includes(false) ? 'View' : 'Hide'} all
      </ButtonBlue>
    </>
  );
};

FaqQuestions.propTypes = {
  QandAs: PropTypes.array,
};

export default FaqQuestions;
