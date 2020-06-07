import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 18rem;
  height: 11.5rem;
  border-radius: 8px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  background: #ffffff;
  padding: 2rem;
  color: #333333;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.2),
      0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  }
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
    <CardContainer>
      <StyledLink href={props.route}>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
      </StyledLink>
    </CardContainer>
  );
};

Card.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
