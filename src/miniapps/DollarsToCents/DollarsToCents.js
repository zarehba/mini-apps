import React, { useState } from 'react';
import Input from '../../shared/Input';
import styled from 'styled-components';

const coins = [
  { name: 'quarter', namePlural: 'quarters', howMuch: 25 },
  { name: 'dime', namePlural: 'dimes', howMuch: 10 },
  { name: 'nickel', namePlural: 'nickels', howMuch: 5 },
  { name: 'penny', namePlural: 'pennies', howMuch: 1 },
];

const calculateCents = (dollars) => Math.floor((dollars * 1000) / 10);

const calculateCoins = (amount) => {
  let i = 0,
    coinsCount = {},
    cents = Math.round(amount * 100);
  do {
    coinsCount[coins[i].name] = Math.floor(cents / coins[i].howMuch);
    cents %= coins[i].howMuch;
    i++;
  } while (cents);
  return coinsCount;
};

const DollarsToCents = () => {
  const [dollars, setDollars] = useState('0.68');
  const [coinsCount, setCoinsCount] = useState(calculateCoins(dollars));

  const handleDollars = (e) => {
    setDollars(e.target.value);
    setCoinsCount(calculateCoins(+e.target.value));
  };

  return (
    <DollarsToCentsContainer>
      $
      <Input
        onChange={handleDollars}
        value={dollars}
        style={{ fontSize: '2rem', width: '100rem' }}
      ></Input>
      <InterText>equals:</InterText>
      <div>
        <CoinCount>{calculateCents(dollars)}</CoinCount> cent
        {calculateCents(dollars) === 1 || 's'}
      </div>
      <InterText>which translates to:</InterText>
      {coins.map((coin) => (
        <div key={coin.name}>
          <CoinCount>{coinsCount[coin.name] || 0}</CoinCount>
          {coinsCount[coin.name] === 1 ? coin.name : coin.namePlural}
        </div>
      ))}
    </DollarsToCentsContainer>
  );
};

const DollarsToCentsContainer = styled.div`
  font-size: 2rem;
  line-height: 3rem;
  text-align: center;
`;

const InterText = styled.span`
  display: block;
  margin: 1rem auto;
  font-style: italic;
`;

const CoinCount = styled.span`
  position: relative;
  top: 0.1rem;
  margin-right: 1rem;
  font-weight: bold;
`;

export default DollarsToCents;
