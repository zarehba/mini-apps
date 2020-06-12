import styled from 'styled-components';

export const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 25rem;
  color: Var(--color-white);
  transform: perspective(300px) rotateY(-5deg);
  transition: all 0.5s ease;

  background: rgba(0, 0, 0, 0.7);
  @supports (backdrop-filter: blur(20px)) {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
  }

  :hover,
  :active,
  :focus,
  :focus-within {
    transform: perspective(300px) rotateY(0deg);
  }

  /* 3d depth: */
  ::before {
    content: '';
    position: absolute;
    height: 2.5px;
    width: 100%;
    top: 100%;
    left: 0;
    border-bottom-left-radius: 2.5px;
    border-right: 1px solid rgba(255, 255, 255, 0.03);
    border-bottom-right-radius: 1px;
    transform: skewX(45deg);
    transform-origin: 100% 0;
    transition: all 0.5s ease-out;

    background: rgba(0, 0, 0, 0.6);
    @supports (backdrop-filter: blur(20px)) {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(20px);
    }
  }

  ::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 2.5px;
    bottom: 0;
    left: 100%;
    border-top-right-radius: 2.5px;
    border-bottom-right-radius: 1px;
    transform: skewY(45deg);
    transform-origin: 0 100%;
    transition: all 0.5s ease-out;

    background: rgba(0, 0, 0, 0.4);
    @supports (backdrop-filter: blur(20px)) {
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(20px);
    }
  }

  :hover::before,
  :active::before,
  :focus::before,
  :focus-within::before {
    height: 0px;
  }
  :hover::after,
  :active::after,
  :focus::after,
  :focus-within::after {
    width: 0px;
  }
`;

export const DisplayContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-sizing: border-box;
  flex: 0 0 8rem;
  width: 100%;
  font-size: 150%;
  outline: none;

  ::selection {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const DisplayNumber = styled.input`
  width: 100%;
  padding: 1.5rem;
  border: none;
  background: none;
  color: currentColor;
  text-align: right;
  font-size: 1em;
  cursor: default;
  outline: none;

  :focus {
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: stretch;
  flex: 1 0;
  width: 100%;
  user-select: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  background: rgba(0, 0, 0, 0.7);
  @supports (display: block) {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
  }
`;

export const StyledButtonKey = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 25%;
  border: none;
  background: none;
  color: currentColor;
  outline: none;
  cursor: pointer;

  :nth-child(1) {
    border-top-left-radius: 8px;
  }
  :nth-child(4) {
    border-top-right-radius: 8px;
  }
  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
  :focus {
    background: rgba(255, 255, 255, 0.3);
  }
  :active {
    background: rgba(255, 255, 255, 0.5);
  }
`;
