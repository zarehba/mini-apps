import styled, { createGlobalStyle } from 'styled-components';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';

export const GlobalStyle = createGlobalStyle`
  @media screen and (min-width: 1200px) {
    html {
      font-size: 75%;
    }
  }
`;

export const StyledCountdownTimer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledEventCountdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 3rem;
  line-height: 3.2rem;
  padding: 2rem Max(1rem, 5vw);
  text-align: center;
  ${cardEnlargingOnHover}
`;

export const CountdownContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-items: center;
  justify-content: center;
  gap: 1rem;
  color: Var(--color-white);
  font-size: 1.6rem;
`;

export const Countdown = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0 1rem;
  border-radius: 5px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    Var(--color-blue-medium);
`;

export const EventSaveButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
  margin: 0.8rem;
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
  opacity: ${(props) => (props.isStored ? 1 : 0.5)};
  transition: all 0.25s;

  :hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

export const EventSaveIcon = styled.span.attrs({
  role: 'img',
  'aria-label': 'Save event icon',
})`
  font-size: 1em;
`;

export const CountdownNumber = styled.span`
  padding: 1rem;
  border-radius: 5px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    Var(--color-blue-dark-lighter);
  font-weight: bold;
  font-size: 2.4rem;
`;

export const CountdownDescription = styled.span`
  padding: 0 1rem;
`;

export const StyledTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 2.2rem;
  color: Var(--color-blue-dark);
`;

export const EventTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 2.4rem;
  color: Var(--color-blue-medium);
  text-transform: uppercase;
`;

export const StyledCountdownInputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem Max(1rem, 5vw);
  text-align: center;
  ${cardEnlargingOnHover}
`;
