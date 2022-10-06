import React, { useState, useEffect } from 'react';
import * as ROUTES from '../../constants/routes';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LoadingButton from '@mui/lab/LoadingButton';

import styles from './Auth.module.css';

import { useNavigate } from 'react-router-dom';

function Auth() {
  const [authType, setAuthType] = useState('signIn');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, isLoading] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    if (isEmailError || isPasswordError) {
      return;
    }
    isLoading(true);
    localStorage.setItem('token', 'sdag');
    navigate(ROUTES.TODOS, { replace: true });
    // console.log(password, email);
  };

  const isValidateEmail = email => {
    return String(email).toLowerCase().includes('@');
  };

  const isValidatePassword = password => {
    return password.length > 8;
  };

  const handleAuthType = () => {
    authType === 'signIn' ? setAuthType('signUp') : setAuthType('signIn');
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);

    isValidateEmail(value) //
      ? setEmailError(false)
      : setEmailError(true);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);

    isValidatePassword(value)
      ? setPasswordError(false)
      : setPasswordError(true);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate(ROUTES.TODOS, { replace: true });
    }
  });

  return (
    <>
      <Box
        sx={{
          padding: '0 1rem',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span className={styles.todoTitle}>📝 TODOS 📝</span>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address(Must contain '@')"
            name="email"
            onChange={handleEmail}
            value={email}
            error={isEmailError}
            helperText={isEmailError && "Email must contain '@' sign!"}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password(Must be over 8 characters)"
            type="password"
            onChange={handlePassword}
            value={password}
            error={isPasswordError}
            helperText={isPasswordError && 'Password must be over 8 characters'}
          />
          <LoadingButton
            fullWidth
            type="submit"
            color="primary"
            loading={loading}
            variant="contained"
            onClick={handleSubmit}
            loadingPosition="start"
          >
            {authType === 'signIn' ? 'Sign in' : 'Sign Up'}
          </LoadingButton>

          <Grid container>
            <Grid item>
              <span className={styles.authType} onClick={handleAuthType}>
                {authType === 'signIn'
                  ? "Don't have an account?"
                  : 'Already Have an account?'}
              </span>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Auth;
