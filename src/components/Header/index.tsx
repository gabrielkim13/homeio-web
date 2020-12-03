import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { user, signout } = useAuth();
  const history = useHistory();

  const onHomeClick = useCallback(() => history.push('/home'), [history]);
  const onSigninClick = useCallback(() => history.push('/signin'), [history]);
  const onSignupClick = useCallback(() => history.push('/signup'), [history]);
  const onSignoutClick = useCallback(() => signout(), [signout]);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            {user ? (
              <Button variant="text" color="inherit" onClick={onHomeClick}>
                <Typography variant="h6">{user.username}</Typography>
              </Button>
            ) : (
              <Typography variant="h6">home.io</Typography>
            )}

            {user ? (
              <Button color="inherit" onClick={onSignoutClick}>
                Sign Out
              </Button>
            ) : (
              <Grid item>
                <Button color="inherit" onClick={onSigninClick}>
                  Sign In
                </Button>
                <Button color="secondary" onClick={onSignupClick}>
                  Sign Up
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
