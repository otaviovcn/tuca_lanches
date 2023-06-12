import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

import { DarkTheme, LightTheme } from '../themes';

const ThemeContext = createContext({});

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}

export const AppThemeProvider= ({ children }) => {
  const [themeName, setThemeName] = useState('light');

  useEffect(() => {
    const activeTheme = getLocalStorage('tuca_lanches_theme');
    if(!activeTheme) {
      setLocalStorage('tuca_lanches_theme', 'light');
      setThemeName('light');
    };
    setThemeName(activeTheme);
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    setLocalStorage('tuca_lanches_theme', themeName === 'light' ? 'dark' : 'light');
    // return themeName === 'light' ? 'dark' : 'light';
  }, [themeName]);



  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);

  const value = {
    themeName,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}