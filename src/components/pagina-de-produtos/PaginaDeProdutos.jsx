import React from 'react'

import { Grid, Container, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { CadastroDeProdutos } from './CadastroDeProdutos';
import { ProdutosCadastrados } from './ProdutosCadastrados';
import { removeLocalStorage } from '../../utils/localStorage';

export const PaginaDeProdutos = () => {
  const theme = useTheme();

  const containersList = [
    <CadastroDeProdutos />,
    <ProdutosCadastrados />,
  ]

  return (
    <Container sx={{ marginTop: theme.spacing(5), width: theme.spacing(100), maxHeight: 80 }}>
      {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}
      {containersList.map((item, index) => (
        // <Grid max item xs={20} sm={8} md={18} key={index}>
        <Box sx={{ width: '100%', background: 'white', marginTop: 2, marginBottom: 2 }}>
          {item}
        </ Box>
        // </Grid>
      ))}
      {/* </Grid> */}
      <Button sx={{ background: "red", display: "none" }} variant="contained" onClick={() => removeLocalStorage('tuca_lanches_produtos')}>Limpar Produtos</Button>
    </Container>
  )
};
