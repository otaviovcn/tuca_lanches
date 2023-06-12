import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { AppThemeProvider } from '../contexts/ThemeContext'
import { useAppThemeContext } from '../contexts/ThemeContext'

export const Home = () => {
  const [text, setText] = useState('');
  const changeInput = (t) => {
    setText(t.target.value);
  };
  
  const handleClick = () => {
    toggleTheme();
  };

  const { toggleTheme } = useAppThemeContext();

  return (
    <div className="App">
      <h1>Teste</h1>
      <Box sx={{ width: '100%' }}>
      </Box>
      <input className="input" onChange={(t) => changeInput(t)} value={text} type="text" />
      <Button onClick={handleClick} variant='contained' color='primary'>Teste</Button>
    </div>
  )
}
