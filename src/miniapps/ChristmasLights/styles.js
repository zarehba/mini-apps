import styled, { keyframes, createGlobalStyle } from 'styled-components';

export const ChristmasLightsGlobalStyle = createGlobalStyle`
  @media screen and (max-width: 768px) {
    html {
      font-size: 50%;
    }
  }
`;

const LightsFlickering = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0px 0 24px 3px currentColor;
    transform: scale3d(1.1, 1.1, 1.1);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0px 0px 10px 2px currentColor;
    transform: scaleX(1);
  }
`;

export const StyledChristmasLight = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 100%;
`;

export const StyledLightsRow = styled.ul`
  display: flex;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0;
  list-style: none;
`;

export const StyledLightContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 0;
`;

export const StyledLight = styled.div.attrs((props) => ({
  style: {
    height: `${props.lightSize}px`,
    width: `${props.lightSize}px`,
    background: props.lightColor,
    boxShadow: `0 0 6px 48px ${props.lightColor}`,
    color: props.lightColor,
    filter: `brightness(${props.lightIntensity})`,
    animationDuration: `${props.animationDuration}ms`,
    animationPlayState: props.isAnimationOn ? 'running' : 'paused',
  },
}))`
  border-radius: 50%;
  margin: auto;
  animation-delay: 0ms;
  animation-name: ${LightsFlickering};
  animation-fill-mode: both;
  animation-iteration-count: infinite;

  :hover {
    animation-play-state: paused !important;
  }
`;

export const ChristmasButton = styled.button`
  display: block;
  padding: 1.5rem 3rem;
  margin: 3rem auto;
  border-radius: 8px;
  border: 2px solid var(--color-blue-dark);
  background: var(--color-blue-dark);
  color: var(--color-white);
  font-size: 2rem;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 0px 5px var(--color-dark);
  transition: all 0.25s ease;

  :hover,
  :focus {
    background: var(--color-blue-dark-lighter);
  }

  :active {
    border: 2px solid var(--color-blue-medium);
    background: var(--color-blue-medium);
  }
`;
