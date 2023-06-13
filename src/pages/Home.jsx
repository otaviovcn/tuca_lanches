import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useAppThemeContext } from '../contexts/ThemeContext'

import { Container, Typography } from '@mui/material';

export const Home = () => {
  return (
    <Container className="App" maxWidth="sm">
      <h1>Home</h1>
    </Container>
  )
}
