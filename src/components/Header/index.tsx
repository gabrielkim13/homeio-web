import React from 'react';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';

import { Title } from './styles';

const Header: React.FC = () => (
  <AppBar position="static">
    <Container>
      <Toolbar>
        <Title variant="h6">home.io</Title>

        <Button color="inherit">Sign In</Button>
        <Button color="secondary">Sign Up</Button>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
