import { createContext, useReducer } from 'react';
import todoReducer from '../helpers/todoReducer';
import { api } from '../utils/api';

export const dispatchContext = createContext('');
export const todoContext = createContext('');

const initTodos = [];

export default function TodoContextWrapper(props) {
  const [todos, dispatch] = useReducer(todoReducer, initTodos);

  return (
    <todoContext.Provider value={todos}>
      <dispatchContext.Provider value={dispatch}>
        {props.children}
      </dispatchContext.Provider>
    </todoContext.Provider>
  );
}
