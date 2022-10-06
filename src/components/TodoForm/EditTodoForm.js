import { Paper, TextField } from '@material-ui/core';
import useInputState from '../../hooks/useInputState';

import { useContext } from 'react';
import { dispatchContext } from '../../context/Todo';
import styles from './editForm.module.css';

function EditTodoForm({ id, task, resetIsEdit }) {
  const [inputVal, setInputVal, resetInputVal] = useInputState(task);

  const dispatch = useContext(dispatchContext);

  return (
    <li className={styles.editFormContainer}>
      <form
        className={styles.editForm}
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: 'EDIT', id, todo: inputVal });
          resetInputVal();
          resetIsEdit();
        }}
      >
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
