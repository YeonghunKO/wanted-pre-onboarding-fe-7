import Todo from './Todo';
import { Paper, List, Divider } from '@material-ui/core';
import { useContext, Fragment, useEffect, useState } from 'react';
import { todoContext } from '../../context/Todo';
import { api } from '../../utils/api';

import { dispatchContext } from '../../context/Todo';

export default function TodoList() {
  const todos = useContext(todoContext);

  const dispatch = useContext(dispatchContext);

  useEffect(() => {
    async function getTodo() {
      const initTodos = await api.getTodos();
      console.log('todos', initTodos);
      dispatch({ type: 'INIT', initTodos });
      // setTodos(todos);
    }

    getTodo();
  }, []);
  return (
    <ul>
      {todos.length
        ? todos.map((todo, i) => <Todo {...todo} key={todo.id} />)
        : null}
    </ul>
  );
}
