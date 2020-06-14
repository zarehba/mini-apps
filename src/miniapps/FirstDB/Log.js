import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, OverflowY } from './ContainerStyle';
import styled from 'styled-components';

const Log = ({ logHistory }) => {
  return (
    <Container>
      <Header>Operations log:</Header>
      <OverflowY>
        {logHistory.map((logMsg) => (
          <LogRow key={logMsg + +new Date()}>{logMsg}</LogRow>
        ))}
      </OverflowY>
    </Container>
  );
};

Log.propTypes = {
  logHistory: PropTypes.array,
};

const LogRow = styled.div`
  padding: 1rem;
  border: 1px dashed Var(--color-gray);
  border-radius: 5px;
  line-height: 2.2rem;
`;

export default Log;
