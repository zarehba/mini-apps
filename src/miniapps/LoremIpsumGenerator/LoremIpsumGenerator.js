import React, { useState } from 'react';
import LoremContainer from './LoremContainer';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled from 'styled-components';

const DEFAULT_PARAGRAPHS_CNT = 8;

const LoremIpsumGenerator = () => {
  const [paragraphsCnt, setParagraphsCnt] = useState(DEFAULT_PARAGRAPHS_CNT);
  const [loremText, setLoremText] = useState([]);

  const getLoremFromApi = () => {
    async function fetchLoremFromApi() {
      const result = await fetch(
        `https://hipsum.co/api/?type=hipster-latin&paras=${paragraphsCnt}`
      ).then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong');
      });
      return result;
    }

    fetchLoremFromApi()
      .then((text) => setLoremText(text))
      .catch(() => {
        setLoremText([`There was an error. Text cannot be generated.`]);
      });
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          getLoremFromApi();
        }}
      >
        <Heading>Generate hipster ipsum text</Heading>
        <Input
          value={paragraphsCnt}
          onChange={(e) =>
            setParagraphsCnt(+e.target.value <= 0 ? 1 : e.target.value)
          }
          inputProps={{ type: 'number' }}
          labelText="Number of paragraphs:"
        />
        <Button type="submit">Generate text</Button>
      </Form>
      <LoremContainer loremText={loremText} />
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  ${cardEnlargingOnHover}
`;

const Heading = styled.h2`
  margin-bottom: 2rem;
  font-size: 2.4rem;
  font-weight: bold;
  color: Var(--color-blue-dark);
`;

export default LoremIpsumGenerator;
