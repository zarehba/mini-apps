import styled, { createGlobalStyle } from 'styled-components';
import { visuallyHidden } from '../../shared/styledUtilities';

export const GlobalStyle = createGlobalStyle`
  @media screen and (min-width: 768px) {
    html {
      font-size: 87.5%;
    }
  }
  @media screen and (min-width: 1200px) {
    html {
      font-size: 93.75%;
    }
  }
  @media screen and (min-width: 1600px) {
    html {
      font-size: 100%;
    }
  }
`;

const inputCommonStyle = `
  margin-left: 0.2rem;
  color: Var(--color-blue-medium);
  border: 2px solid Var(--color-blue-dark);
  background: Var(--color-white);

  :disabled {
    background: Var(--color-blue-light);
    cursor: not-allowed;
    user-select: none;
  }
  :active,
  :focus {
    outline: none;
    border: 2px solid Var(--color-blue-medium);
  }
`;
const paddingFromInput = '0.8rem';

export const StyledColorCycle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const ColorPreview = styled.div.attrs((props) => ({
  style: {
    backgroundColor: props.$color,
    color: props.$textColor,
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12.5rem;
  width: 22.5rem;
`;

export const ColorFormatLabel = styled.label`
  margin-top: 2rem;
`;

export const ColorFormatLabelText = styled.label`
  margin-right: ${paddingFromInput};
`;

export const ColorFormatSelect = styled.select`
  ${inputCommonStyle}
`;

export const ColorInputForm = styled.form`
  margin-top: 3rem;
  font-size: 2.4rem;

  ::before {
    content: '${(props) => props.$prefix}';
    position: relative;
    height: 1.6rem;
    width: 100%;
    text-align: center;
  }

  ::after {
    content: '${(props) => props.$postfix}';
    position: relative;
    height: 1.6rem;
    width: 100%;
    text-align: center;
  }
`;

export const ColorLabel = styled.label`
  position: relative;
  top: -0.2rem;
  font-size: 2.4rem;

  ::before {
    content: '${(props) => props.$formatPart}';
    position: absolute;
    height: 1.6rem;
    width: 100%;
    top: -1rem;
    left: 0rem;
    padding-left: 1.5rem;
    font-size: 1.6rem;
    text-align: left;
  }

  ::after {
    content: '${(props) => props.$formatSuffix}';
    position: relative;
    height: 1.6rem;
    width: 100%;
    left: 0.1rem;
    margin-right: 0.2rem;
    top: 0.5rem;
    font-size: 1.8rem;
    text-align: center;
  }
`;

export const ColorLabelText = styled.span`
  ${visuallyHidden}
  font-size: 1.6rem;
`;

export const ColorInput = styled.input.attrs({ type: 'text' })`
  position: relative;
  width: 3rem;
  ${inputCommonStyle}

  ${(props) =>
    !props.$isValid &&
    `
    border: 2px solid Var(--color-danger);
    color: Var(--color-danger);
    `}
`;

export const HiddenSubmitButton = styled.button.attrs({
  type: 'submit',
  tabIndex: -1,
})`
  ${visuallyHidden}
`;

export const IntervalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  margin-top: 4rem;
`;

export const IntervalColorChanges = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IntervalColorChangesLabel = styled.span`
  display: inline-block;
  max-width: calc(96vw - 20rem);
  margin-right: ${paddingFromInput};
  text-align: right;
`;

export const IntervalLabelText = styled.span`
  margin-right: ${paddingFromInput};
`;

export const NumberInput = styled.input.attrs({ type: 'number' })`
  position: relative;
  width: 5rem;
  ${inputCommonStyle}
  margin-right: 0.2rem;
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  display: block;
  padding: 0.3rem 1.3rem;
  border-radius: 5px;
  border: 2px solid var(--color-blue-dark);
  background: var(--color-blue-dark);
  color: var(--color-white);
  font-size: 1.6rem;
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
