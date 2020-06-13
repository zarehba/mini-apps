import React from 'react';
import PropTypes from 'prop-types';
import { StyledSummary, SummaryList, SummaryItem } from './styles';

const Summary = (props) => {
  const summaryItems = props.items.map((item) => (
    <SummaryItem
      key={item}
      isSelected={item === props.itemSelected}
      onClick={() => props.onItemClick(item)}
    >
      {item}
    </SummaryItem>
  ));

  return (
    <StyledSummary>
      <SummaryList>{summaryItems}</SummaryList>
    </StyledSummary>
  );
};

Summary.propTypes = {
  items: PropTypes.array,
  itemSelected: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default Summary;
