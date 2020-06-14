import React from 'react';
import PropTypes from 'prop-types';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import { Container, Header, OverflowY } from './ContainerStyle';
import styled from 'styled-components';

const Customers = ({ customersData }) => {
  return (
    <Container>
      <Header>Customers:</Header>
      <OverflowY>
        {customersData.map((customer) => (
          <CustomerRow key={customer.email}>
            <CustomerLabel>Name:</CustomerLabel> {customer.name}
            <br />
            <CustomerLabel>Email:</CustomerLabel>
            <a href={`mailto:${customer.email}`}>{customer.email}</a>
          </CustomerRow>
        ))}
      </OverflowY>
    </Container>
  );
};

Customers.propTypes = {
  customersData: PropTypes.array,
};

const CustomerRow = styled.div`
  padding: 2rem;
  line-height: 2.5rem;
  font-size: 1.8rem;
  ${cardEnlargingOnHover}
`;

const CustomerLabel = styled.span`
  display: inline-block;
  width: 6.5rem;
  font-weight: bold;
  color: Var(--color-blue-medium);
`;

export default Customers;
