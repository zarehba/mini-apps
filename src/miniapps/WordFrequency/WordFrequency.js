import React, { useState } from 'react';
import Textarea from '../../shared/Textarea';
import styled from 'styled-components';

const getFrequencyMap = (words) => {
  if (!words?.length) return new Map();

  const frequencies = new Map();
  words.forEach((word) => {
    const frequency = frequencies.get(word) || 0;
    frequencies.set(word, frequency + 1);
  });

  // sort by frequency descending, then alphabetically asc
  const sortedFrequencies = new Map(
    [...frequencies].sort((a, b) => {
      if (b[1] - a[1] === 0) {
        return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1;
      }
      return b[1] - a[1];
    })
  );

  return sortedFrequencies;
};

const WordFrequency = () => {
  const [text, setText] = useState('');

  const words = text.match(/[a-z'-]+/gi);
  const frequencies = getFrequencyMap(words);

  return (
    <MiniAppContainer>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} />
      <WordFrequencies>
        <>
          <span>Word</span>
          <span>Occurences</span>
        </>
        {[...frequencies].map((frequency) => (
          <React.Fragment key={frequency[0]}>
            <span>{frequency[0]}</span>
            <span>{frequency[1]}</span>
          </React.Fragment>
        ))}
      </WordFrequencies>
    </MiniAppContainer>
  );
};

const MiniAppContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  max-width: 1000px;
  width: 100%;
  margin-top: 1rem;

  @media only screen and (max-width: 568px) {
    flex-direction: column;
    align-items: center;
  }
`;

const WordFrequencies = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 0rem;
  padding: 2rem;
  box-sizing: border-box;
  max-height: min(30rem, 35vh);
  overflow-y: auto;
  min-width: fit-content;
  text-align: center;

  /* first column */
  span:nth-child(2n-1) {
    min-width: 10ch;
    color: Var(--color-blue-dark);
    font-weight: bold;
    word-break: break-all;
  }

  /* heading */
  span:nth-child(-n + 2) {
    font-weight: bold;
    color: Var(--color-blue-medium);
    text-transform: uppercase;
  }
`;

export default WordFrequency;
