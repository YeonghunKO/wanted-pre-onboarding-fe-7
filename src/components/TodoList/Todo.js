import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import useToggleState from '../../hooks/useToggleState';
import EditTodoForm from '../TodoForm/EditTodoForm';

import { useContext, memo } from 'react';
import { dispatchContext } from '../../context/Todo';

import styles from '../TodoList/todo.module.css';
import { api } from '../../utils/api';

function Todo({ id, isCompleted, todo }) {
  const [isEdit, setIsEdit, resetIsEdit] = useToggleState(false);
  const handleEdit = () => {
    setIsEdit();
  };

  const dispatch = useContext(dispatchContext);

  const handleCheck = () => {
    dispatch({ type: 'TOGGLE', id });
  };

  if (isEdit) {
    return (
      <EditTodoForm
        resetIsEdit={resetIsEdit}
        isCompleted={isCompleted}
        todo={todo}
        id={id}
      />
    );
  } else {
    return (
      <li className={styles.itemContainer} key={id}>
        <div
          className={styles.itemFront}
          style={{ textDecoration: `${isCompleted ? 'line-through' : 'none'}` }}
        >
          <Checkbox
            tabIndex={-1}
            checked={isCompleted}
            onClick={async () => {
              dispatch({ type: 'TOGGLE', id });
              api.updateTodo(id, { todo, isCompleted: !isCompleted });
            }}
          />
          <span>{todo}</span>
        </div>
        <div>
          <IconButton
            className={styles.deleteBtn}
            onClick={() => {
              dispatch({ type: 'REMOVE', id });
              api.deleteTodo(id);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton className={styles.editBtn} onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </div>
      </li>
    );
  }
}


export default memo(Todo);
