import styled from 'styled-components';

export const BorderRadiusContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${(props) => props.Side}px;
  height: ${(props) => props.Side}px;
  border: 0px dotted Var(--color-blue-dark-lighter);
  box-sizing: border-box;
  background-clip: content-box;
`;

export const BorderRadiusPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.Side}px;
  height: ${(props) => props.Side}px;
  border: 0px dotted Var(--color-blue-dark-lighter);
  border-radius: ${(props) => props.SquareBorderRadius};
  box-sizing: border-box;
  background: Var(--color-blue-medium);
  background-clip: content-box;
`;

export const BorderRadiusCorner = styled.div`
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${(props) => 2 * props.Radius}px;
  height: ${(props) => 2 * props.Radius}px;
  margin-top: ${(props) => -props.Radius}px;
  margin-left: ${(props) => -props.Radius}px;
  background: Var(--color-blue-dark);
  border-radius: 50%;
  font-size: ${(props) => 1.8 * props.Radius}px;
  color: Var(--color-blue-light);
  cursor: pointer;
`;

export const StyledForm = styled.form`
  position: relative;
  max-width: 90%;
`;

export const StyledInnerForm = styled(StyledForm)`
  color: Var(--color-white);
  font-size: ${(props) => props.FontSize}rem;
`;

export const StyledOuterForm = styled(StyledForm)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3.5rem auto 0 auto;
  color: Var(--color-blue-dark);
`;

export const StyledLabel = styled.label`
  display: block;
`;

export const StyledInput = styled.input`
  display: inline-block;
  padding: 0.3em 1.4em 0.3em 0;
  margin-left: 1em;
  border-radius: 8px;
  border: 2px solid var(--color-white);
  font-size: 0.8em;
  background: var(--color-white);
  color: var(--color-blue-medium);
  text-align: center;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ::placeholder {
    text-align: center;
    color: var(--color-dark);
  }

  :focus {
    outline: none;
    border: 2px solid var(--color-blue-dark);
  }
`;

export const StyledInnerInput = styled(StyledInput)`
  margin-top: 0.5em;
  max-width: calc(90% - 1em);
`;

export const StyledOuterInput = styled(StyledInput)`
  border: 2px solid var(--color-blue-dark);
  :focus {
    outline: none;
    border: 2px solid var(--color-blue-medium);
  }
`;

export const StyledAfterInput = styled.span`
  display: block;
  margin-top: 0.5em;
  font-size: 1em;
`;

export const CopyToClipboardButton = styled.button`
  position: absolute;
  margin: 0;
  padding: 0;
  background: none;
  font-size: 1em;
  cursor: pointer;
  border: none;
  top: 50%;
  transform: translateX(-1.4em) translateY(calc(-50% - 0.1em));
  opacity: 0.6;
  transition: all 0.25s ease;

  :hover,
  :active,
  :focus {
    outline: none;
    opacity: 1;
  }
`;

export const SuccessMessage = styled.span`
  height: 0;
  float: right;
  transform: translateY(-1.5em);
  font-size: 0.8em;
  color: Var(--color-white);
  opacity: ${(props) => (props.IsHidden ? 0 : 0.8)};
  transition: opacity 0.2s ease;
`;
