import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
  gap: 3rem;
  justify-items: center;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CardGrid = (props) => {
  const cards = Object.values(props.miniAppsMetadata).map((appMetadata) => (
    <Card {...appMetadata} key={appMetadata.title}></Card>
  ));
  return <CardsContainer>{cards}</CardsContainer>;
};

CardGrid.propTypes = {
  miniAppsMetadata: PropTypes.object.isRequired,
};

export default CardGrid;
