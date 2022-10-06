import { Paper, TextField } from '@material-ui/core';

import useInputState from '../../hooks/useInputState';

import { useContext } from 'react';
import { dispatchContext } from '../../context/Todo';
import { api } from '../../utils/api';

function TodoForm() {
  const [inputVal, setInputVal, reset] = useInputState('');
  const dispatch = useContext(dispatchContext);
  // console.log('TODOFORM RENDERING');

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(inputVal);
    const { userId, id } = await api.createTodo(inputVal);
    dispatch({ type: 'ADD', id, todo: inputVal, userId });
    reset();
  };

  return (
    <Paper style={{ width: '90%', margin: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <TextField
          fullWidth
          placeholder="Enter your Todo!"
          margin="normal"
          style={{ padding: '0 10px' }}
          value={inputVal}
          onChange={setInputVal}
        />
      </form>
    </Paper>
  );
}

export default TodoForm;
