import { ReactComponent as LogoSvg } from './assets/logo.svg';
import { ReactComponent as DotsBgSvg } from './assets/dots.svg';
import { ReactComponent as HeroSvg } from './assets/hero.svg';
import { ReactComponent as MoneySvg } from './assets/money.svg';
import { ReactComponent as FaqSvg } from './assets/faq.svg';
import styled, { css, createGlobalStyle } from 'styled-components';

export const PageStyle = createGlobalStyle`
  :root {
    --color-blue-dark: #324cff;
    --color-blue-medium: #4b99ff;
    --color-blue-light: #c4e6ff;
    --color-orange-dark: #ed6e07;
    --color-orange-light: #f19b08;
    --color-navy: #0d214c;
    --color-white: #ffffff;
    --color-gray-dark: #333333;
    --color-gray-medium: #727272;
    --color-gray-light: #cdcecd;
    --color-gray-lighter: #e6e6e6;
    --color-gray-lightest: #f9f9f9;
  }
  body {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0;
    background: Var(--color-white);
    overflow-x: hidden;
  }
  #root {
    max-width: 1200px;
    padding: 0 4rem;
    box-sizing: border-box;
  }
  #root > h1 {
    /* hide miniapp title */
    display: none;
  }
  @media only screen and (max-width: 568px) {
  #root {
    max-width: 100%;
    padding: 0 3rem;
    box-sizing: border-box;
  }
    html {
      font-size: 50%;
    }
  }
`;

export const LandingPage = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8rem;
  width: 100%;
  font-size: 1.8rem;
`;

const fullBleedSection = css`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  align-items: center;
  overflow-x: hidden;
`;

export const Button = styled.a.attrs({ href: '#!' })`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  border-radius: 99rem;
  text-align: center;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  user-select: none;
`;

const buttonHoverEffect = css`
  transition: 0.2s all ease;
  transform: scale(1);

  :hover {
    transform: perspective(1px) scale(1.025);
    filter: saturate(1.5) hue-rotate(10deg) brightness(1.2);
  }
`;

export const ButtonBlue = styled(Button)`
  background: linear-gradient(
    to right,
    Var(--color-blue-dark),
    Var(--color-blue-medium)
  );
  color: Var(--color-white);

  ${buttonHoverEffect}
`;
export const ButtonOrange = styled(Button)`
  background: linear-gradient(
    to right,
    Var(--color-orange-dark),
    Var(--color-orange-light)
  );
  color: Var(--color-white);

  ${buttonHoverEffect}
`;
export const ButtonOutlined = styled(Button)`
  background: Var(--color-white);
  border: 2px solid Var(--color-blue-medium);
  color: Var(--color-gray-dark);
  transform: scale(1);
  transition: all 0.2s ease;

  :hover {
    border: 2px solid transparent;
    color: Var(--color-white);
    transform: perspective(1px) scale(1.045);
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 99rem;
    background: linear-gradient(
      to right,
      Var(--color-blue-dark),
      Var(--color-blue-medium)
    );
    z-index: -1;
    transition: 0.25s all ease;
    opacity: 0;
  }
  &:hover::after {
    opacity: 1;
  }
`;

export const DotsBg = styled(DotsBgSvg)`
  position: relative;
`;

/* header */
export const HeaderSection = styled.header`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  height: 9rem;

  @media only screen and (max-width: 800px) {
    height: auto;
    margin-bottom: -8rem;
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;
export const LogoImg = styled(LogoSvg)`
  height: 5.2rem;
`;
export const LogoText = styled.span`
  color: Var(--color-navy);
  font-size: 3.6rem;
  font-weight: bold;
  letter-spacing: -1px;
`;

export const HeaderDots = styled(DotsBg)`
  fill: Var(--color-blue-light);
  transform: scale(3);
  left: 70px;
  top: -70px;
  z-index: -1;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  column-gap: 1.5rem;
  width: 36rem;
  margin-top: 5px;
  margin-right: 2.4rem;

  a {
    flex: 1 0;
  }
`;

/* hero */
export const HeroSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 44rem;
  column-gap: 2rem;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

export const HeroLeft = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  column-gap: 4rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 13rem;

  & > a {
    padding: 2rem 4rem;
  }
  & > a:nth-of-type(1) {
    margin-left: auto;
  }
  & > a:nth-of-type(2) {
    margin-right: auto;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto auto;
    row-gap: 2rem;

    & > a:nth-of-type(1) {
      margin: auto;
    }
    & > a:nth-of-type(2) {
      margin: auto;
    }
  }
`;

export const HeroTitle = styled.h1`
  grid-column: 1/-1;
  color: Var(--color-navy);
  line-height: 140%;
  font-size: 4.8rem;
  font-weight: normal;

  @media only screen and (max-width: 768px) {
    margin: 2.5rem 0;
  }
`;

export const HeroRight = styled.div`
  position: relative;

  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 2rem;
  }
`;

export const HeroImg = styled(HeroSvg)`
  position: absolute;
  top: -15%;
  left: 5%;
  width: 100%;
  height: auto;

  @media only screen and (max-width: 1200px) {
    position: relative;
    top: 0;
    left: 0;
    max-width: 65rem;
    max-height: 30rem;
  }
`;

export const HeroFeatures = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  row-gap: 2rem;
  justify-items: stretch;
  justify-content: center;
  gap: 1rem;
  color: Var(--color-gray-medium);
  font-size: 1.4rem;
  text-align: center;

  svg {
    height: auto;
    width: 75%;

    padding: 0.5rem;
    border-radius: 50%;
    box-sizing: border-box;
    box-shadow: 0 0 2px 1px Var(--color-gray-light);
    stroke: Var(--color-blue-medium);

    @media only screen and (max-width: 568px) {
      position: relative;
      top: 0;
      left: 0;
    }
  }

  @media only screen and (max-width: 1200px) {
    position: relative;
    top: 0;
    left: 0;
  }
`;

export const HeroFeature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  row-gap: 1rem;

  flex-basis: 12.5%;
  min-width: 8rem;
`;

/* get started */
export const GetStartedSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 3rem;

  padding: 4rem;
  font-size: 2.1rem;
  background-color: Var(--color-gray-lightest);
  border-radius: 10px;
  box-shadow: 0 15px 30px -15px Var(--color-gray-lighter);
`;

export const GetStartedIntro = styled.div`
  margin-right: auto;
  line-height: 175%;

  @media only screen and (max-width: 1100px) {
    width: 100%;
  }
`;

export const GetStartedCall = styled.span`
  display: block;
  font-size: 2.8rem;
  color: Var(--color-navy);
  text-transform: uppercase;
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 2rem;
  box-sizing: border-box;

  flex-basis: 23rem;

  svg {
    width: 9rem;
    padding: 2rem;
    margin-right: 1.5rem;
    stroke: Var(--color-white);
    background: Var(--color-blue-medium);
    border-radius: 50%;
    box-sizing: border-box;
  }

  @media only screen and (max-width: 900px) {
    flex-basis: 80%;
  }
  @media only screen and (max-width: 568px) {
    flex-basis: 100%;
  }
`;

/* benefits */
export const BenefitsSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 4rem;
  }
  @media only screen and (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`;

export const BenefitsTitle = styled.h2`
  grid-column: 1/-1;
  line-height: 150%;
  font-size: 4.5rem;
  font-weight: normal;
  color: Var(--color-navy);

  span {
    display: block;
  }
  & mark {
    background: transparent;
    color: Var(--color-blue-dark);
    border-bottom: 2px solid currentColor;
  }
`;

export const BenefitsImg = styled(MoneySvg)`
  height: 100%;
  width: 100%;

  @media only screen and (max-width: 1024px) {
    grid-column: 1/-1;
    grid-row: 2/3;
    width: 100%;
    height: auto;
    max-height: 30rem;
    margin-bottom: -3rem;
  }
  @media only screen and (max-width: 568px) {
    margin-bottom: 3rem;
  }
`;

export const BenefitsList = styled.ul`
  padding-top: 5rem;
  padding-left: 0;
  list-style: none;
  color: Var(--color-blue-dark);

  @media only screen and (max-width: 568px) {
    padding-top: 0;
  }
`;

export const Benefit = styled.li`
  position: relative;
  margin-bottom: 3rem;
  padding-top: 1rem;
  min-height: 14.5rem;

  @media only screen and (max-width: 1200px) {
    min-height: 17.5rem;
  }
  @media only screen and (max-width: 568px) {
    min-height: auto;
  }

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 1rem;
    width: 1rem;
    border-radius: 99rem;
    background: linear-gradient(
      to right,
      Var(--color-blue-dark),
      Var(--color-blue-medium)
    );
    box-shadow: 0 1px 4px 0px Var(--color-blue-dark);
  }
`;

export const BenefitTitle = styled.h3`
  display: block;
  margin-bottom: 0.7rem;
  margin-top: 0.5rem;
  color: Var(--color-blue-dark);
  line-height: 150%;
  font-size: 2.8rem;
`;

export const BenefitDesc = styled.div`
  display: block;
  color: Var(--color-text);
  line-height: 175%;
`;

/* join */
export const JoinSection = styled.section`
  position: relative;
  padding: 6rem 0;
  background: Var(--color-blue-dark);
  color: Var(--color-white);
  font-size: 4.5rem;
  text-align: center;

  ${fullBleedSection}
`;

const JoinDotsBg = styled(DotsBgSvg)`
  fill: Var(--color-blue-light);
  position: absolute;
  top: -0.5rem;
  transform: scale(3) translateY(4rem);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  opacity: 0.5;

  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;

export const JoinLeftDotsBg = styled(JoinDotsBg)`
  left: -4.5rem;
`;

export const JoinRightDotsBg = styled(JoinDotsBg)`
  right: -4.5rem;
`;

export const JoinText = styled.div`
  margin-bottom: 4rem;
  padding: 0 2rem;

  mark {
    background: transparent;
    color: Var(--color-orange-light);
  }
`;

/* FAQ */
export const FaqSection = styled.section`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  a {
    padding: 2rem 4rem;
    margin: 4rem 0 auto auto;
  }
`;

export const FaqTitle = styled.h2`
  grid-column: 1/-1;
  line-height: 150%;
  font-size: 4.5rem;
  font-weight: normal;
  color: Var(--color-navy);
`;

export const FaqSubtitle = styled.div`
  grid-column: 1/-1;
  margin: 2rem 0;
  line-height: 150%;
  font-size: 2rem;
  font-weight: normal;
  color: Var(--color-text);
`;

export const FaqImg = styled(FaqSvg)`
  grid-row: 3/8;
  grid-column: -2/-1;
  height: auto;
  width: 100%;

  @media only screen and (max-width: 768px) {
    grid-row: 3/4;
    grid-column: -2/-1;
    max-height: 30rem;
    margin-top: -1rem;
    margin-bottom: -3rem;
  }
`;

export const FaqSingleContainer = styled.div`
  margin-top: 4rem;
  border-radius: 10px;
  color: Var(--color-gray-medium);
  font-size: 1.4rem;
  box-shadow: 0 0 12px 0px Var(--color-gray-lighter);
`;

export const FaqQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) =>
    props.$isCollapsed ? '2rem' : '2rem 2rem 2.5rem 2rem'};
  color: Var(--color-blue-dark);
  cursor: pointer;
  transition: all 0.5s ease;

  svg {
    fill: Var(--color-gray-medium);
    height: 1.4rem;
    transition: all 0.5s ease;
    transform: rotate(${(props) => (props.$isCollapsed ? '0deg' : '180deg')});
  }
`;

export const FaqAnswer = styled.div`
  transform-origin: top;
  transition: opacity 0.1s, all 0.5s ease;

  padding: ${(props) => (props.$isCollapsed ? '0 2rem' : '0 2rem 2rem 2rem')};
  max-height: ${(props) => (props.$isCollapsed ? '0' : '20rem')};
  opacity: ${(props) => (props.$isCollapsed ? 0 : 1)};
`;

/* contact */
export const ContactSection = styled.section`
  padding: 6rem 0;
  background: Var(--color-blue-dark);
  text-align: center;
  color: Var(--color-white);
  ${fullBleedSection}
  margin-bottom: -8rem;

  h2 {
    line-height: 150%;
    font-size: 4.5rem;
    font-weight: normal;
  }

  div {
    margin: 3rem;
  }

  input {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    color: Var(--color-gray-medium);
    border: 2px solid Var(--color-blue-dark);
    border-radius: 99rem;
    background: Var(--color-white);
    padding: 2rem 4rem;
    text-align: center;
    font-size: 1.8rem;

    :focus {
      outline: none;
      border: 2px solid Var(--color-navy);
    }
  }

  a {
    padding: 2rem 4rem;
  }
`;

/* footer */
export const FooterSection = styled.footer`
  padding: 7rem 0;
  background: Var(--color-gray-lightest);
  box-shadow: 0 5px 10px 5px Var(--color-gray-lighter);

  ${fullBleedSection}

  & > div {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    row-gap: 4rem;
    max-width: 1200px;
    margin: auto;
    padding: 0 3rem;
    box-sizing: border-box;

    @media only screen and (max-width: 1200px) {
      column-gap: 4rem;
    }

    & > div:first-child {
      align-self: center;
    }

    & > div {
      flex-basis: 25%;

      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      ul {
        margin-top: 2rem;
        padding: 0;
      }

      @media only screen and (max-width: 1200px) {
        flex-basis: auto;
      }
    }

    & > div:nth-child(4) {
      align-self: center;

      display: block;
      align-items: flex-start;
      row-gap: 2.5rem;
      line-height: 150%;
      font-size: 1.4rem;
      color: Var(--color-gray-medium);

      h3 ~ h3 {
        display: inline-block;
      }
    }

    & > div:last-child {
      display: block;
      flex-basis: 100%;
      text-align: center;

      font-size: 1.2rem;
      line-height: 175%;
    }
  }

  h2 {
    font-size: 2.2rem;
  }

  h3 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: Var(--color-text);
  }

  a {
    color: Var(--color-gray-medium);

    :hover {
      color: Var(--color-blue-medium);
    }
    :active {
      opacity: 0.75;
    }
  }
`;

export const FooterMenuTitle = styled.h2`
  position: relative;
`;

export const FooterLiLink = styled.a.attrs({ href: '#!' })`
  display: block;
  max-width: 14rem;
  font-size: 1.6rem;
  line-height: 175%;
  padding-left: 2.5rem;
  box-sizing: border-box;
`;
