import React, { useState } from 'react'

import { Typography, Grid, CardContent, Card, Container, TextField, Divider, Button, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export const CadastroDeProdutos = () => {
  const [productName, setProductName] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const theme = useTheme();
  const categoriesFood = ['Comida', 'Bebida'];
  const [typeFood, setTypeFood] = useState(categoriesFood[0]);

  const handleChange = (event) => {
    return setTypeFood(event.target.value);
  };

  const inputCreator = ({ label, placeholder, type, sm, onChangeInput, value }) => {
    return (
      <Grid item xs={12} sm={sm}>
        <TextField
          label={label}
          placeholder={placeholder}
          color="primary"
          variant="outlined"
          fullWidth
          type={type}
          value={value}
          required
          onChange={onChangeInput}
        />
      </Grid>
    )
  }


  return (
    <form>
      <Card>
        <Typography variant="h4" align="center" sx={{ fontSize: 30 }}>
          Cadastro de Produtos
        </Typography>
        <CardContent>
          <Grid container spacing={1}>
            {
              inputCreator({
                label: 'Nome',
                placeholder: 'Digite o nome do produto',
                type: 'text',
                sm: 12,
                value: productName,
                onChangeInput: (e) => setProductName(e.target.value)
              })
            }

            {
              inputCreator({
                label: 'Preço de custo',
                placeholder: 'Digite o preço de custo',
                type: 'number',
                sm: 6,
                value: costPrice,
                onChangeInput: (e) => setCostPrice(e.target.value)
              })
            }

            {
              inputCreator({
                label: 'Preço de venda',
                placeholder: 'Digite o preço de venda',
                type: 'number',
                sm: 6,
                value: productPrice,
                onChangeInput: (e) => setProductPrice(e.target.value)
              })
            }

            <FormControl fullWidth sx={{marginTop: 2}} >
              <InputLabel>Tipo</InputLabel>
              <Select
                value={typeFood}
                label="Tipo de produto"
                onChange={handleChange}
              >
                {
                  categoriesFood.map((item, index) => <MenuItem value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>

            <Button
              onClick={() => { }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!productName || !costPrice || !productPrice}
              sx={{ marginTop: theme.spacing(2) }}
            >
              Salvar
            </Button>

          </Grid>
        </CardContent>
      </Card>
    </form>
  )
};
