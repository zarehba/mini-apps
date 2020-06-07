import React from 'react';
import PropTypes from 'prop-types';
import CardGrid from './Card/CardGrid';

const MainPage = ({ miniAppsMetadata }) => {
  return (
    <>
      <CardGrid miniAppsMetadata={miniAppsMetadata}></CardGrid>
    </>
  );
};

MainPage.propTypes = {
  miniAppsMetadata: PropTypes.object.isRequired,
};

export default MainPage;
