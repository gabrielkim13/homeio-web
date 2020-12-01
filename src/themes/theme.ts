import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme(
  {
    palette: {
      type: 'dark',
      primary: {
        light: '#8d7794',
        main: '#5f4b66',
        dark: '#35233c',
      },
      secondary: {
        light: '#ffffff',
        main: '#f9cff2',
        dark: '#c69ebf',
      },
      success: {
        light: '#f3ffff',
        main: '#c0f8d1',
        dark: '#8fc5a0',
      },
      warning: {
        light: '#f0ffe7',
        main: '#bdcfb5',
        dark: '#8d9e85',
      },
      error: {
        light: '#ff9189',
        main: '#f25f5c',
        dark: '#ba2b32',
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  },
  ptBR,
);

export default theme;
