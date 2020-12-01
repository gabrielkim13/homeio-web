import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './components/Header';
import Routes from './routes';

import theme from './themes/theme';

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Header />

      <Routes />

      <CssBaseline />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
