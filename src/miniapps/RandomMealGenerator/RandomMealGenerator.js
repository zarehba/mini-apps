import React, { useState, useCallback } from 'react';
import { fetchData } from '../../shared/functions';
import Button from '../../shared/Button';
import styled, { createGlobalStyle, css } from 'styled-components';

const RANDOM_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getIngredientsNames = (meal) =>
  Object.entries(meal)
    .filter(([key, val]) => key.includes('strIngredient') && val)
    .map(([ingrKey, ingrVal]) => ingrVal);
const getIngredientsAmounts = (meal) =>
  Object.entries(meal)
    .filter(([key, val]) => key.includes('strMeasure') && val)
    .map(([ingrKey, ingrVal]) => ingrVal);
const getIngredients = (meal) => {
  const ingredients = [];
  if (!meal) return ingredients;

  const ingrNames = getIngredientsNames(meal);
  const ingrAmounts = getIngredientsAmounts(meal);
  for (const index in ingrNames) {
    ingredients.push({ name: ingrNames[index], amount: ingrAmounts[index] });
  }
  return ingredients;
};

const RandomMealGenerator = () => {
  const [meal, setMeal] = useState(null);

  const getMeal = useCallback(async () => {
    const { meals } = await fetchData(RANDOM_MEAL_URL);
    setMeal(meals[0]);
  }, []);

  return (
    <MiniAppContainer $noMeal={!meal}>
      <div>
        <PictureAndIngredients>
          <div>
            <Title>{meal?.strMeal}</Title>
            <div>
              <Picture src={meal?.strMealThumb} alt={meal?.strMeal || ''} />
            </div>
          </div>
          <Ingredients>
            <Subtitle>Ingredients</Subtitle>
            {getIngredients(meal).map((ingredient) => (
              <React.Fragment key={ingredient.name}>
                <span>{ingredient.amount}</span>
                <span>{ingredient.name}</span>
              </React.Fragment>
            ))}
          </Ingredients>
        </PictureAndIngredients>
        <Subtitle>Instructions</Subtitle>
        <div>{meal?.strInstructions}</div>
      </div>
      <Button onClick={getMeal}>Get random meal recipe</Button>
      <GlobalStyle />
    </MiniAppContainer>
  );
};

const GlobalStyle = createGlobalStyle`
  html {
    @media only screen and (max-width: 568px) {
      font-size: 50%;
    }
  }
`;

const MiniAppContainer = styled.div`
  margin-top: 1rem;
  padding: 3rem;
  box-shadow: 0 0 4px Var(--color-blue-dark);
  border-radius: 10px;
  line-height: 1.5;
  font-size: 1.8rem;

  @media only screen and (max-width: 568px) {
    padding: 2rem;
  }

  & > div {
    ${(props) => (props.$noMeal ? 'display: none;' : '')}
  }
  & > button {
    margin: auto;
    font-size: 1em;
    ${(props) => (props.$noMeal ? '' : 'margin-top: 3rem;')}
  }
`;

const PictureAndIngredients = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 3rem;
  margin-bottom: 3rem;

  & > div {
    flex: 1 1 auto;
  }
  & > div:first-child {
    display: flex;
    flex-direction: column;
  }
`;

const Ingredients = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto 1fr;
  grid-template-rows: 5rem;
  column-gap: 2rem;
  align-items: center;
  font-size: 1.6rem;

  h3 {
    grid-column: 1/-1;
  }
  span:nth-child(2n) {
    grid-column: 2/3;
    text-align: right;
  }
`;

const headingHeight = css`
  min-height: 5rem;
`;

const Title = styled.h2`
  ${headingHeight}
  text-align: center;
  font-size: 2.4rem;
  color: Var(--color-blue-medium);
`;

const Subtitle = styled.h3`
  ${headingHeight}
  font-size: 1.8rem;
  color: Var(--color-blue-dark-lighter);
  text-align: center;
`;

const Picture = styled.img`
  display: block;
  height: 100%;
  max-height: min(40vw, 45rem);
  width: auto;
  margin: auto;
  border-radius: 5px;
`;

export default RandomMealGenerator;
