import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NOTPRESSED_KEY = {
  value: '',
  keyCode: '',
  which: '',
};

const NOTPRESSED_MODIFIERS = {
  alt: false,
  ctrl: false,
  meta: false,
  shift: false,
};

const KeyValue = () => {
  const [currentKey, setCurrentKey] = useState(NOTPRESSED_KEY);
  const [currentModifiers, setCurrentModifiers] = useState(
    NOTPRESSED_MODIFIERS
  );

  useEffect(() => {
    function onKeyDown(e) {
      e.preventDefault();

      setCurrentModifiers({
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
      });

      if (['Meta', 'Alt', 'Control', 'Shift'].includes(e.key)) {
        setCurrentKey(NOTPRESSED_KEY);
        return;
      }

      setCurrentKey({
        value: e.key,
        keyCode: e.keyCode,
        which: e.which,
      });
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <StyledContainer>
      <PressedKey>
        <Key $isPressed={!!currentKey.value}>
          <KeyTitle>Pressed key</KeyTitle>
          {Object.entries(currentKey).map(([property, value]) => (
            <KeyRowInfo key={property}>
              <InfoLabel>{property}:</InfoLabel>
              <InfoVal>{value || '-'}</InfoVal>
            </KeyRowInfo>
          ))}
        </Key>
      </PressedKey>
      <ModifierKeys>
        {Object.entries(currentModifiers).map(([property, value]) => (
          <Key key={property} $isPressed={value}>
            {property} key
          </Key>
        ))}
      </ModifierKeys>
    </StyledContainer>
  );
};

const cardWithBoxShadow = `
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
    box-shadow: 0 0 2px Var(--color-dark);
  }
`;

const focusedCard = `
    transform: scale(1.02);
    ::before {
      box-shadow: 0 0 5px Var(--color-dark);
    }
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 2rem;
  padding: 2rem;
  box-shadow: 0 0 5px Var(--color-dark);

  @media only screen and (min-width: 569px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PressedKey = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModifierKeys = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
`;

const Key = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${cardWithBoxShadow}
  padding: 2rem;
  font-size: 2rem;
  text-transform: capitalize;

  ${(props) =>
    props.$isPressed &&
    `${focusedCard}
  color: Var(--color-blue-medium)`}
`;

const KeyTitle = styled.h2`
  width: 100%;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid Var(--color-blue-dark);
  color: Var(--color-blue-dark);
  font-size: 2.4rem;
  text-align: center;
`;
const KeyRowInfo = styled.p`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1rem;
  width: 100%;
  line-height: 3rem;
`;
const InfoLabel = styled.span`
  color: Var(--color-text);
  text-align: right;
`;
const InfoVal = styled.span`
  color: currentColor;
  text-transform: none;
`;

export default KeyValue;
