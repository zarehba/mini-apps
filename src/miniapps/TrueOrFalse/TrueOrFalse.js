/* eslint-disable no-eval */
/* eslint-disable eqeqeq */
import React, { useReducer } from 'react';
import Input from '../../shared/Input';
import styled, { createGlobalStyle } from 'styled-components';

const INITIAL_STATE = {
  valueA: null,
  valueB: null,
  inputA: '',
  inputB: '',
  isInitial: true,
  operator: '==',
  errorMessages: { inputA: [], inputB: [], operator: [] },
};

const isEqual = (valueA, valueB, operator) => {
  switch (operator) {
    case '===':
      return valueA === valueB;
    case '==':
      return valueA == valueB;
    default:
      return null;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_INPUT_A':
      try {
        const val = action.payload === '{}' ? {} : eval(action.payload);
        return {
          ...state,
          inputA: action.payload,
          valueA: val,
          errorMessages: {
            ...state.errorMessages,
            inputA: [],
          },
          isInitial: false,
        };
      } catch (err) {
        return {
          ...state,
          inputA: action.payload,
          valueA: null,
          errorMessages: {
            ...state.errorMessages,
            inputA: ['Not a Valid javascript value'],
          },
          isInitial: false,
        };
      }
    case 'HANDLE_INPUT_OPERATOR':
      if (!['===', '=='].includes(action.payload)) {
        return {
          ...state,
          operator: action.payload,
          errorMessages: {
            ...state.errorMessages,
            operator: ['This operator is not allowed'],
          },
          isInitial: false,
        };
      }
      return {
        ...state,
        operator: action.payload,
        errorMessages: { ...state.errorMessages, operator: [] },
        isInitial: false,
      };
    case 'HANDLE_INPUT_B':
      try {
        const val = action.payload === '{}' ? {} : eval(action.payload);
        return {
          ...state,
          inputB: action.payload,
          valueB: val,
          errorMessages: {
            ...state.errorMessages,
            inputB: [],
          },
          isInitial: false,
        };
      } catch (err) {
        return {
          ...state,
          inputB: action.payload,
          valueB: null,
          errorMessages: {
            ...state.errorMessages,
            inputB: ['Not a Valid javascript value'],
          },
          isInitial: false,
        };
      }
    default:
      throw new Error(`Action ${action.type} has not been defined!`);
  }
};

const TrueOrFalse = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <MiniAppContainer>
      <span>Is</span>
      <Input
        value={state.inputA}
        onChange={(e) =>
          dispatch({ type: 'HANDLE_INPUT_A', payload: e.target.value })
        }
        labelText="First value:"
        errorMessages={state.errorMessages.inputA}
      />
      <Input
        value={state.operator}
        onChange={(e) =>
          dispatch({ type: 'HANDLE_INPUT_OPERATOR', payload: e.target.value })
        }
        inputProps={{ placeholder: '=== or ==' }}
        labelText=""
        errorMessages={state.errorMessages.operator}
      />
      <Input
        value={state.inputB}
        onChange={(e) =>
          dispatch({ type: 'HANDLE_INPUT_B', payload: e.target.value })
        }
        labelText="Second value:"
        errorMessages={state.errorMessages.inputB}
      />
      <span>?</span>
      {state.inputA !== '' &&
        state.inputB !== '' &&
        !Object.values(state.errorMessages).find((errors) => errors.length) && (
          <Answer $isTrue={isEqual(state.valueA, state.valueB, state.operator)}>
            {isEqual(state.valueA, state.valueB, state.operator)
              ? 'TRUE '
              : 'FALSE '}
            <span>
              {isEqual(state.valueA, state.valueB, state.operator) ? '☺' : '☹'}
            </span>
          </Answer>
        )}
      <MiniAppStyles />
    </MiniAppContainer>
  );
};

const MiniAppStyles = createGlobalStyle`
  html {
    @media only screen and (min-width: 768px) {
      font-size: 75%;
    }
    @media only screen and (min-width: 1024px) {
      font-size: 100%;
    }
    @media only screen and (min-width: 1600px) {
      font-size: 125%;
    }
  }
`;

const MiniAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  row-gap: 2rem;
  height: 30rem;
  font-size: 2rem;

  input {
    max-width: 35vw;
  }

  label:nth-of-type(2) {
    align-self: center;
    input {
      width: 6rem;
    }
  }

  & > span {
    align-self: center;
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
`;

const Answer = styled.div`
  align-self: center;
  font-size: 4rem;
  color: ${(props) =>
    props.$isTrue ? 'Var(--color-success)' : 'Var(--color-danger)'};

  span {
    position: relative;
    bottom: 0.3rem;
  }
`;

export default TrueOrFalse;
