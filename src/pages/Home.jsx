import React, { useState } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

export const Home = () => {
  const [text, setText] = useState('');
  const changeInput = (t) => {
    setText(t.target.value);
  };

  const handleClick = () => {
    console.log(text);
  };

  return (
    <div className="App">
      <h1>Teste</h1>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          With a start adornment
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>

    </Box>
      <input className="input" onChange={(t) => changeInput(t)} value={text} type="text" />
      <button onClick={handleClick} className="button" type="button">Clique</button>
    </div>
  )
}
