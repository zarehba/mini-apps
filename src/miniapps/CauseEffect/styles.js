import styled from 'styled-components';

const pseudoBoxShadow = `
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
`;

export const StyledCauseEffect = styled.div`
  min-height: 100%;
  width: 100%;
  font-size: 2rem;
  @media screen and (max-width: 768px) {
    font-size: calc(1.2rem + 1vw);
  }
  @media screen and (max-width: 568px) {
    height: 100%;
  }
`;

export const StyledSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  float: left;
  height: 100%;
  width: 30%;
  padding: 2rem 0;
  box-sizing: border-box;
  border-radius: 5px;
  transform: scale(1);
  transition: all 0.15s ease;

  @media screen and (max-width: 568px) {
    width: 100%;
  }

  ::before {
    ${pseudoBoxShadow}
  }
  :hover {
    transform: scale(1.02);
    ::before {
      box-shadow: 0 0 8px Var(--color-dark);
    }
  }
`;

export const SummaryList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
`;

export const SummaryItem = styled.li`
  padding: 0.8rem 0 0.8rem 2rem;
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? 'Var(--color-blue-dark)' : 'none'};
  color: ${(props) =>
    props.isSelected ? 'Var(--color-blue-light)' : 'curentColor'};
  transition: all 0.2s ease-out;

  :hover {
    background: ${(props) =>
      props.isSelected ? 'Var(--color-blue-dark)' : 'Var(--color-blue-medium)'};
    color: ${(props) =>
      props.isSelected ? 'Var(--color-blue-light)' : 'Var(--color-blue-light)'};
  }
`;

export const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 0 2rem;
  box-sizing: border-box;
  float: left;
  height: 100%;
  width: 65%;
  margin-left: 5%;
  line-height: 200%;
  border-radius: 5px;
  transform: scale(1);
  transition: 0.15s;
  @media screen and (max-width: 568px) {
    margin-top: 3rem;
    margin-left: 0;
    width: 100%;
  }

  ::before {
    ${pseudoBoxShadow}
  }
  :hover {
    transform: scale(1.02);
    ::before {
      box-shadow: 0 0 8px Var(--color-dark);
    }
  }
`;

export const DetailsDl = styled.dl`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 2rem 0;
`;

export const DetailsDt = styled.dt`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 11ch;
  flex-grow: 0.5;
  flex-basis: 30%;
  padding: 0.4rem 1.5rem;
  margin: 0.8rem 0;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: Var(--color-blue-dark);
  color: Var(--color-white);
  text-align: right;
`;

export const DetailsDd = styled.dd`
  display: flex;
  justify-content: right;
  align-items: center;
  max-width: calc(100% - 11ch);
  flex-basis: 70%;
  flex-grow: 1;
  margin: 0.8rem 0;
  padding: 0.4rem 1.5rem;
  box-sizing: border-box;
  border: 1px dotted Var(--color-blue-dark);
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;
