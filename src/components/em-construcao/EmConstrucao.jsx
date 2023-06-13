import React from 'react'
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@emotion/react';


export const EmConstrucao = () => {
  const theme = useTheme();
  return (
    <Container sx={{  padding: 8 }} className="App" maxWidth="sm">
      <Box bgcolor={theme.palette.primary.main}>
        <img src={require("../../assets/em-constucao.png")} alt="Em construção" />
      </Box>
    </Container>
  )
};
