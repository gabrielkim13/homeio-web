import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import Routes from './routes';
import AppProvider from './hooks';
import theme from './themes/theme';

import Header from './components/Header';

const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Header />

        <Routes />

        <CssBaseline />
      </AppProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
