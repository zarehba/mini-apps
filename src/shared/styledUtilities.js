export const visuallyHidden = `
  border: 0;
  clip: rect(0 0 0 0);
  height: auto;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;

export const cardEnlargingOnHover = `
  border-radius: 5px;
  position: relative;
  transition: all 0.15s ease;

  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    z-index: -1;
    box-shadow: 0 0 5px Var(--color-dark);
  }

  :hover {
    transform: scale(1.02);
    ::before {
      box-shadow: 0 0 8px Var(--color-dark);
    }
  }
`;
