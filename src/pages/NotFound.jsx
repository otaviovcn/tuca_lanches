import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Typography, Button, Box } from '@mui/material';

export const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column" }}>
      <Typography paragraph textAlign='center' variant='h2'>
        Erro 404
      </Typography>
      <Typography paragraph variant='h4' textAlign='center'>
        Epa! Parece que a página que você está procurando não existe.
      </Typography>
      <Typography paragraph variant='h4' textAlign='center'>
        Caso tenha se perdido, não se preocupe!
      </Typography>
      <Button
        onClick={() => navigate('/')}
        type="submit"
        variant="contained"
        color="primary"
        sx={
          { marginTop: theme.spacing(2), width:"18%" }
        }
      >
        Página inicial
      </Button>
    </Box>
  )
}
