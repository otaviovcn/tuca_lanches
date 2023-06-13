import { createTheme } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: grey[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: grey[100],
      dark: grey[200],
      light: grey[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      default: '#282c34',
    }
  }
});
