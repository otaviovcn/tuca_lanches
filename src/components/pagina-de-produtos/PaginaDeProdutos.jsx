import React, { useState } from 'react'

import { Typography, Grid, CardContent, Card, Container, TextField, Divider, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { CadastroDeProdutos } from './CadastroDeProdutos';


export const PaginaDeProdutos = () => {
  const [productName, setProductName] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const theme = useTheme();

  const containersList = [
    <CadastroDeProdutos />,
    // <CadastroDeProdutos />,
  ]

  return (
    <Container sx={{ marginTop: theme.spacing(5), width: theme.spacing(100) }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {containersList.map((item, index) => (
          <Grid item xs={20} sm={8} md={6} key={index}>
            {item}
          </Grid>
        ))}
      </Grid>
    </Container>
    // <Container sx={{ marginTop: theme.spacing(5), width: theme.spacing(100) }}>
    //   <Grid container spacing={1}>
    //     <Grid item xs={8} sm={8}>
    //       <CadastroDeProdutos />
    //     </Grid>

    //     <Grid item xs={4} sm={12}>
    //       <CadastroDeProdutos />
    //     </Grid>

    //   </Grid>
    // </Container>
  )
};
