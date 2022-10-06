import { Paper, TextField } from '@material-ui/core';
import useInputState from '../../hooks/useInputState';

import { useContext } from 'react';
import { dispatchContext } from '../../context/Todo';
import styles from './editForm.module.css';
import { api } from '../../utils/api';

function EditTodoForm({ id, todo, resetIsEdit, isCompleted }) {
  const [inputVal, setInputVal, resetInputVal] = useInputState(todo);

  const dispatch = useContext(dispatchContext);

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch({ type: 'EDIT', id, todo: inputVal });

    resetInputVal();
    resetIsEdit();
    await api.updateTodo(id, { todo: inputVal, isCompleted });
  };
  return (
    <li className={styles.editFormContainer}>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <TextField
          fullWidth={true}
          style={{ padding: '15px' }}
          value={inputVal}
          onChange={setInputVal}
          autoFocus
        />
      </form>
    </li>
  );
}

export default EditTodoForm;
