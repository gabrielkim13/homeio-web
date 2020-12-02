import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';

import { useAuth } from '../../hooks/auth';

import { Title } from './styles';

const Header: React.FC = () => {
  const { user, signout } = useAuth();
  const history = useHistory();

  const onSigninClick = useCallback(() => history.push('/signin'), [history]);
  const onSignupClick = useCallback(() => history.push('/signup'), [history]);
  const onSignoutClick = useCallback(() => signout(), [signout]);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Title variant="h6">{(!!user && user.username) || 'home.io'}</Title>

          {user ? (
            <Button color="inherit" onClick={onSignoutClick}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={onSigninClick}>
                Sign In
              </Button>
              <Button color="secondary" onClick={onSignupClick}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
