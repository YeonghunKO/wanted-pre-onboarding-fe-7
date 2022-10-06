import { Paper, TextField } from '@material-ui/core';

import useInputState from '../../hooks/useInputState';

import { useContext } from 'react';
import { dispatchContext } from '../../context/Todo';

function TodoForm() {
  const [inputVal, setInputVal, reset] = useInputState('');
  const dispatch = useContext(dispatchContext);
  // console.log('TODOFORM RENDERING');

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(inputVal);
    dispatch({ type: 'ADD', todo: inputVal });
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
