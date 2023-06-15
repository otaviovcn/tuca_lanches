import React, { useState, useMemo, useEffect } from 'react'

import { Typography, Grid, CardContent, Card, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { useProdutosContext } from '../../contexts/ProdutosContext';
import { productsData } from '../../data/productsData';


export const CadastroDeProdutos = () => {
  const [productName, setProductName] = useState('');
  const [costPrice, setCostPrice] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [imgLink, setImgLink] = useState('');

  const categoriesFood = ['Comida', 'Bebida'];
  const categories = ['Sem categoria', 'Salgados'];

  const [category, setCategory] = useState(categories[0]);
  const [typeFood, setTypeFood] = useState(categoriesFood[0]);

  const { produtos, setProdutosContext, productIsUpdating, updateProduct, setProductIsUpdatingContext } = useProdutosContext();
  const theme = useTheme();

  useMemo(() => {
    const productsList = getLocalStorage('tuca_lanches_produtos');
    if (!productsList) {
      setLocalStorage('tuca_lanches_produtos', productsData);
    }
    setProdutosContext(productsList);
  }, []);

  useMemo(() => {
    if (productIsUpdating) {
      setProductName(produtos[updateProduct].name);
      setCostPrice(produtos[updateProduct].costPrice);
      setProductPrice(produtos[updateProduct].productPrice);
      setTypeFood(produtos[updateProduct].type);
      setImgLink(produtos[updateProduct].imgLink);
    }
  }, [productIsUpdating]);

  const resetStates = () => {
    setProductName('');
    setCostPrice(0);
    setProductPrice(0);
    setTypeFood(categoriesFood[0]);
    setImgLink('');
    setCategory(categories[0]);
  };

  const handleChange = (event) => {
    return setTypeFood(event.target.value);
  };

  const updateProductList = () => {
    const newListProducts = { ...produtos };
    newListProducts[updateProduct] = {
      id: updateProduct,
      name: productName,
      costPrice: costPrice,
      productPrice: productPrice,
      type: typeFood,
      imgLink: imgLink,
      category: category,
    }
    setLocalStorage('tuca_lanches_produtos', newListProducts);

    resetStates();

    setProdutosContext(newListProducts);
    setProductIsUpdatingContext();
  };

  const addProduct = () => {
    const nextId = Object.keys(produtos).length;
    const newProduct = {
      id: nextId,
      name: productName,
      costPrice: costPrice,
      productPrice: productPrice,
      type: typeFood,
      imgLink: imgLink,
      category: category,
    };
    const newProductsList = { ...produtos, [nextId]: newProduct };
    setProdutosContext(newProductsList);
    setLocalStorage('tuca_lanches_produtos', newProductsList);
    resetStates();
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
          sx={{ marginBottom: 2 }}
        />
      </Grid>
    )
  }


  return (
    <form>
      <Typography variant="h4" align="center" sx={{ fontSize: 30, marginBottom: 2 }}>
        Cadastro de Produtos
      </Typography>
      <Card>
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

            {
              inputCreator({
                label: 'Link da imagem',
                placeholder: 'Cole o url da imagem',
                type: 'text',
                sm: 12,
                value: imgLink,
                onChangeInput: (e) => setImgLink(e.target.value)
              })
            }

            <FormControl sx={{width: "50%", padding:1}}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={typeFood}
                label="Tipo de produto"
                onChange={handleChange}
                sx={{ color: theme.palette.secondary.main, stopColor: 'red' }}
              >
                {
                  categoriesFood.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>

            <FormControl sx={{width: "50%", padding:1}}>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={category}
                label="Categoria"
                onChange={(event) => setTypeFood(event.target.value)}
                sx={{ color: theme.palette.secondary.main, stopColor: 'red' }}
              >
                {
                  categories.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
              </Select>
            </FormControl>
            {
              productIsUpdating ?
                <Button
                  onClick={() => {
                    updateProductList();
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!productName || !costPrice || !productPrice}
                  sx={
                    { marginTop: theme.spacing(2) }
                  }
                >
                  Editar
                </Button> :
                <Button
                  onClick={addProduct}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!productName || !costPrice || !productPrice}
                  sx={
                    { marginTop: theme.spacing(2), disabled: { color: 'red' } }
                  }
                >
                  Salvar
                </Button>
            }

          </Grid>
        </CardContent>
      </Card>
    </form>
  )
};
