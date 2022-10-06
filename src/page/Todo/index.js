import { useEffect } from 'react';

import * as ROUTES from '../../constants/routes';

import { useNavigate } from 'react-router-dom';

import { getItem, removeItem } from '../../utils/storage';

import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import TodoContextWrapper from '../../context/Todo';

import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core';

import styles from './todo.module.css';

function Todo() {
  const navigate = useNavigate();

  const signOut = () => {
    removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    if (!getItem('token')) {
      navigate(ROUTES.AUTH, { replace: true });
    }
  });
  return (
    <Paper
      style={{
        // padding: 0,
        // margin: 0,
        height: '100vh',
        backgroundColor: '#f3f2ef',
      }}
      elevation={0}
    >
      <AppBar color="primary" position="sticky" style={{ height: '64px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            style={{
              fontFamily: "'Indie Flower', cursive",
              fontSize: '1.5rem',
            }}
            color="inherit"
          >
            🔥FIRE TODOS🔥
          </Typography>
          <button
            // variant="contained"
            // color="secondary"
            // endIcon={<LogoutIcon />}
            className={styles.signOutBtn}
            onClick={signOut}
          >
            Sign Out
          </button>
        </Toolbar>
      </AppBar>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TodoContextWrapper>
          <TodoForm />
          <TodoList />
        </TodoContextWrapper>
      </main>
    </Paper>
  );
}

export default Todo;
