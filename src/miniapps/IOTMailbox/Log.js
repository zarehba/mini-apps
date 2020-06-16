import React from 'react';
import PropTypes from 'prop-types';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled from 'styled-components';

const Log = ({ logHistory }) => {
  return (
    <Container>
      <Header>Mailbox status log:</Header>
      <OverflowY>
        {logHistory.map((logMsg) => (
          <LogRow
            key={logMsg + +new Date() + Math.random().toString().split('.')[1]}
          >
            {logMsg}
          </LogRow>
        ))}
      </OverflowY>
    </Container>
  );
};

Log.propTypes = {
  logHistory: PropTypes.array,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  min-height: max(5rem, 20vh);
  max-height: max(20rem, 50vh);
  padding: 2rem;
  ${cardEnlargingOnHover}
`;

const OverflowY = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  overflow-y: auto;
  padding: 1rem;
`;

const Header = styled.h2`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid Var(--color-blue-dark-lighter);
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const LogRow = styled.div`
  padding: 0.5rem 1rem;
  border: 1px dashed Var(--color-gray);
  border-radius: 5px;
  line-height: 2.2rem;
`;

export default Log;
