import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Toolbar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import styles from './Register.module.css';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

// Email
const USER_REGEX = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$/;
// Min 5 characters, at least one number and one letter
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrMsg('Invalid entry');
      return;
    }
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/auth/register',
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      setSuccess(true);
      setUsername('');
      setPassword('');
      setMatchPassword('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.data?.errors) {
        setErrMsg(err.response.data.errors[0].msg);
      } else {
        setErrMsg('Registration failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Toolbar sx={{ height: '8rem' }} />
          <h1>Success!</h1>
          <p>
            <a href='/login'>Sign in</a>
          </p>
        </Container>
      ) : (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Toolbar sx={{ height: '8rem' }} />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#151515' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    inputRef={userRef}
                    autoComplete='off'
                    onChange={(e) => setUsername(e.target.value)}
                    aria-invalid={validUsername ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                  />
                  <p
                    id='uidnote'
                    className={
                      usernameFocus && username && !validUsername
                        ? styles.instructions
                        : styles.offscreen
                    }
                  >
                    <InfoIcon />
                    Must be an email address.
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='off'
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={validPassword ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                  />
                  <p
                    id='pwdnote'
                    className={
                      passwordFocus && !validPassword
                        ? styles.instructions
                        : styles.offscreen
                    }
                  >
                    <InfoIcon />
                    Must be at least 5 characters. <br />
                    Must include at least 1 letter and 1 number.
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='c-password'
                    label='Confirm Password'
                    type='password'
                    id='c-password'
                    aria-describedby='confirmnote'
                    onChange={(e) => setMatchPassword(e.target.value)}
                    aria-invalid={validMatch ? 'false' : 'true'}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <p
                    id='confirmnote'
                    className={
                      matchFocus && !validMatch
                        ? styles.instructions
                        : styles.offscreen
                    }
                  >
                    <InfoIcon />
                    Must match the first password input field.
                  </p>
                </Grid>
              </Grid>
              <p
                ref={errRef}
                className={errMsg ? styles.errmsg : styles.offscreen}
                aria-live='assertive'
              >
                {errMsg}
              </p>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !validUsername || !validPassword || !validMatch ? true : false
                }
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
