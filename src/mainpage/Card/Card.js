import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ConditionalWrap from '../../shared/ConditionalWrap';

const CardContainer = styled.div`
  width: 18rem;
  height: 11.5rem;
  border-radius: 8px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  background: #ffffff;
  padding: 2rem;
  transition: 0.2s;

  ${(props) =>
    props.enabled
      ? `&:hover {
          transform: scale(1.1);
          box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.2),
            0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
        }`
      : `cursor: not-allowed;
          opacity: 0.5;
          filter: blur(0.5px);
        `}
`;

const StyledLink = styled.a`
  text-decoration: none;

  &:link,
  &:visited {
    color: currentColor;
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  font-size: 1.8rem;
  text-align: center;
  color: Var(--color-heading);
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  font-size: 1.6rem;
  text-align: center;
`;

const Card = (props) => {
  return (
    <CardContainer enabled={props.enabled}>
      <ConditionalWrap
        condition={props.enabled}
        wrap={(children) => (
          <StyledLink href={props.route}>{children}</StyledLink>
        )}
      >
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
      </ConditionalWrap>
    </CardContainer>
  );
};

Card.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
};

export default Card;
