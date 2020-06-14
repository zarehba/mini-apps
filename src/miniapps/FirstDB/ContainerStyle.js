import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  min-height: max(5rem, 20vh);
  max-height: max(20rem, 50vh);
  padding: 2rem;
  ${cardEnlargingOnHover}
`;

export const OverflowY = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  overflow-y: auto;
  padding: 1rem;
`;

export const Header = styled.h2`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid Var(--color-blue-dark-lighter);
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;
