import React, { useState, useEffect, useRef } from 'react';
import Button from '../../shared/Button';
import PropTypes from 'prop-types';
import { cardEnlargingOnHover } from '../../shared/styledUtilities';
import styled, { keyframes, css } from 'styled-components';

const QUESTIONS_LIMIT = 10;

const decodeHtml = (html) => {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};
const msToSeconds = (ms) => parseFloat((ms / 1000).toFixed(1));

const Quiz = ({ quizData, quizEndHandler }) => {
  const [questionNo, setQuestionNo] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const score = useRef(0);
  const startTs = useRef(new Date());

  useEffect(() => {
    if (questionNo > QUESTIONS_LIMIT - 1) return;

    function setTimer() {
      if (!selectedAnswer)
        return setTimeout(() => {
          setQuestionNo((questionNo) => ++questionNo);
        }, 10000);
      return setTimeout(() => {
        setSelectedAnswer('');
        setQuestionNo((questionNo) => ++questionNo);
      }, 500);
    }

    const timer = setTimer();
    return () => {
      clearTimeout(timer);
    };
  }, [questionNo, selectedAnswer]);

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    score.current += +(answer === quizData[questionNo].correct_answer);
  };
  const backToQuestionOne = () => {
    setQuestionNo(0);
    score.current = 0;
    startTs.current = new Date();
  };

  return (
    <StyledQuiz>
      {questionNo < QUESTIONS_LIMIT ? (
        <>
          <Category>QUIZ [category: {quizData[questionNo].category}]</Category>
          <Question>{decodeHtml(quizData[questionNo].question)}</Question>
          {[
            ...quizData[questionNo].incorrect_answers,
            quizData[questionNo].correct_answer,
          ]
            .sort()
            .map((answer) => (
              <Answer
                key={answer}
                $isAnswerPicked={!!selectedAnswer}
                $isSelected={answer === selectedAnswer}
                $isCorrect={answer === quizData[questionNo].correct_answer}
                onClick={() => handleAnswer(answer)}
              >
                {decodeHtml(answer)}
              </Answer>
            ))}
          <TimeRunningOutIndicator
            key={questionNo}
            $isAnswerPicked={!!selectedAnswer}
          />
        </>
      ) : (
        <QuizScore>
          Quiz finished in {msToSeconds(new Date() - startTs.current)}s ! <br />
          Your score: <b>{score.current} / 10</b>
          <Button onClick={backToQuestionOne}>Try again</Button>
          <Button onClick={() => quizEndHandler(false)}>Back to start</Button>
        </QuizScore>
      )}
    </StyledQuiz>
  );
};

const StyledQuiz = styled.div`
  position: relative;
  padding-bottom: 3rem;
  min-width: 32rem;
  max-width: 65rem;
  border-radius: 5px;

  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    z-index: -1;
    box-shadow: 0 0 5px Var(--color-dark);
  }
`;

const timeRunningOut = keyframes`
    0% {
      border-bottom-left-radius: 5px;
      max-width: 100%;
    }
    1% {
      border-bottom-left-radius: 0;
    }
    100% {
      max-width: 0%;
    }
`;

const TimeRunningOutIndicator = styled.div`
  display: block;
  height: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
  max-width: 89%;
  width: 100%;
  border-bottom-right-radius: 5px;
  background: Var(--color-blue-medium);
  animation: 10s ${timeRunningOut} linear;
  animation-play-state: ${(props) =>
    props.$isAnswerPicked ? 'paused' : 'running'};
`;

const Category = styled.h2`
  padding: 1.5rem;
  line-height: 1.35;
  text-align: center;
  font-size: 2.2rem;
  color: Var(--color-blue-dark);
  box-shadow: 0 5px 6px -6px Var(--color-dark);
`;

const Question = styled.h3`
  --font-size: 2.8rem;
  display: flex;
  align-items: center;
  min-height: calc(4 * 1.35 * Var(--font-size));
  margin: 4rem 2rem;
  font-size: Var(--font-size);
  line-height: 1.35;
  text-align: center;
  color: Var(--color-blue-medium);

  @media only screen and (max-width: 568px) {
    --font-size: 2.3rem;
  }
`;

const correctAnswer = css`
  color: Var(--color-success);
  ::before {
    box-shadow: 0 0 4px Var(--color-success) !important;
  }
  ::after {
    content: '💚';
  }
`;
const incorrectAnswer = css`
  color: Var(--color-danger);
  ::before {
    box-shadow: 0 0 4px Var(--color-danger) !important;
  }
  ::after {
    content: '❌';
  }
`;
const Answer = styled.li`
  ${cardEnlargingOnHover}
  margin: 1.5rem 2rem;
  padding: 1rem 3rem 1rem 2rem;
  font-size: 1.8rem;
  list-style: none;
  ${(props) => (props.$isAnswerPicked ? '' : 'cursor: pointer;')}

  :hover {
    transform: scale(${(props) => (props.$isAnswerPicked ? '1' : '1.01')});
  }
  ::before {
    box-shadow: 0 0 2px Var(--color-dark);
  }
  :hover::before {
    box-shadow: ${(props) =>
      props.$isAnswerPicked
        ? '0 0 2px Var(--color-dark)'
        : '0 0 4px Var(--color-dark)'};
  }

  ${(props) => {
    if (!props.$isSelected) return '';
    return `
      transform: scale(1.01) !important;
      ::after {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
      }
      ${props.$isCorrect ? correctAnswer : incorrectAnswer}
    `;
  }}
`;

const QuizScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
  padding: 3rem;
  font-size: 2.8rem;
  line-height: 1.5;
  text-align: center;

  b {
    margin-bottom: 1rem;
    color: Var(--color-blue-medium);
  }
`;

Quiz.propTypes = {
  quizData: PropTypes.array,
  quizEndHandler: PropTypes.func,
};

export default Quiz;
