// most of the miniapp is borrowed from RandomMealGenerator miniapp
import React, { useState, useEffect, useCallback } from 'react';
import { fetchData } from '../../shared/functions';
import Spinner from '../../shared/Spinner';
import styled, { createGlobalStyle, css } from 'styled-components';

const ALL_MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const MEAL_ID_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
// const RANDOM_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

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

const RecipeApp = () => {
  const [allRecipes, setAllRecipes] = useState(null);
  const [meal, setMeal] = useState(null);

  const getMeal = useCallback(async (url) => {
    const { meals } = await fetchData(url);
    setMeal(meals[0]);
  }, []);

  useEffect(() => {
    fetchData(ALL_MEALS_URL).then((result) => setAllRecipes(result.meals));
  }, []);

  return (
    <>
      <RecipesContainer>
        <h2>Click a name to show the whole recipe below!</h2>
        {allRecipes?.length &&
          allRecipes.map((recipe) => (
            <figure key={recipe.idMeal}>
              <img
                src={recipe?.strMealThumb}
                alt={recipe?.strMeal || ''}
                onLoad={(e) => (e.target.dataset.loaded = 'yes')}
              />
              <Spinner />
              <figcaption
                title="Show recipe"
                onClick={() => getMeal(`${MEAL_ID_URL}${recipe.idMeal}`)}
              >
                {recipe.strMeal}
              </figcaption>
            </figure>
          ))}
      </RecipesContainer>
      <MealContainer $noMeal={!meal}>
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
      </MealContainer>
      <GlobalStyle />
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  html {
    @media only screen and (max-width: 568px) {
      font-size: 50%;
    }
  }
`;

const RecipesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
  height: 50vh;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 0 4px Var(--color-blue-dark);
  border-radius: 8px;
  box-sizing: border-box;
  overflow-y: auto;

  h2 {
    grid-column: 1/-1;
    align-self: start;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figure {
    position: relative;
    align-self: start;

    :last-child {
      margin-bottom: 2rem;
    }
  }

  figcaption {
    position: absolute;
    font-size: 1.4rem;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: Var(--color-white);
    cursor: pointer;
    transition: all 0.25s ease;

    :hover {
      background: rgba(17, 45, 78, 0.85);
    }
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }

  img + div {
    transform: scale(0.5);
  }
  img[data-loaded='yes'] + div {
    display: none;
  }
`;

const MealContainer = styled.div`
  margin-top: 1rem;
  padding: 3rem;
  box-shadow: 0 0 4px Var(--color-blue-dark);
  border-radius: 8px;
  line-height: 1.5;
  font-size: 1.8rem;
  ${(props) => (props.$noMeal ? 'display: none;' : '')}

  @media only screen and (max-width: 568px) {
    padding: 2rem;
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

export default RecipeApp;
