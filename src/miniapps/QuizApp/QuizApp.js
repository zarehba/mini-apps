import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import Dropdown from '../../shared/Dropdown';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';
import { fetchData } from '../../shared/functions';
import styled, { createGlobalStyle } from 'styled-components';

const URL_GET_CATEGORIES = 'https://opentdb.com/api_category.php';
const URL_GET_QUESTIONS =
  'https://opentdb.com/api.php?amount=10&type=multiple&category=$categoryId';

const QuizApp = () => {
  const [quizCategories, setQuizCategories] = useState([]);
  const [quizCategoriesMap, setQuizCategoriesMap] = useState(null);
  const [quizCategory, setQuizCategory] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [quizStartedByUser, setQuizStartedByUser] = useState(false);

  const startQuiz = () => setQuizStartedByUser(true);
  const handleSelect = (quiz) => setQuizCategory(quiz);

  useEffect(() => {
    const arrayFromApi = (categories) =>
      categories.reduce((categs, category) => [...categs, category.name], []);
    const mapFromApi = (categories) =>
      new Map(categories.map((category) => [category.name, category.id]));

    const fetchCategories = async () => fetchData(URL_GET_CATEGORIES);
    fetchCategories().then(({ trivia_categories: categories }) => {
      setQuizCategories(arrayFromApi(categories));
      setQuizCategoriesMap(mapFromApi(categories));
      setQuizCategory(categories[0].name);
    });
  }, [setQuizCategoriesMap]);

  useEffect(() => {
    if (!quizCategory || !quizStartedByUser) return;

    setQuizData(null);
    const categoryId = quizCategoriesMap.get(quizCategory);
    const fetchQuestions = async (catId) =>
      fetchData(URL_GET_QUESTIONS.replace('$categoryId', catId));
    fetchQuestions(categoryId).then(({ results }) => setQuizData(results));
  }, [quizCategory, quizStartedByUser, quizCategoriesMap]);

  return (
    <QuizContainer>
      {!quizStartedByUser && (
        <Dropdown
          title="Quiz category:"
          options={quizCategories}
          handleSelect={handleSelect}
          selected={quizCategory}
        />
      )}
      {!quizStartedByUser && <Button onClick={startQuiz}>Start</Button>}
      {quizStartedByUser && !quizData && (
        <>
          Acquiring questions...
          <Spinner />
        </>
      )}
      {quizStartedByUser && quizData && (
        <Quiz quizData={quizData} quizEndHandler={setQuizStartedByUser} />
      )}
      <QuizAppStyles />
    </QuizContainer>
  );
};

const QuizAppStyles = createGlobalStyle`
  @media only screen and (max-width: 568px) {
    html {
      font-size: 50%;
    }
  }
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;

  button {
    text-transform: uppercase;
  }
`;

export default QuizApp;
