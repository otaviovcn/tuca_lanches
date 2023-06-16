import React, { useState, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography, Box, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { setLocalStorage } from '../../utils/localStorage';
import { useCarrinhoContext } from '../../contexts/CarrinhoContext';


export const CardProduct = (props) => {
  const [value, setValue] = useState(0);
  const { setCarrinhoContext, carrinho } = useCarrinhoContext();
  const { id, productPrice, costPrice, type, name, imgLink, category } = props;

  useMemo(() => {
    if (carrinho[name]) {
      setValue(carrinho[name].quantity);
    }
  }, [carrinho])

  const addInCart = () => {
    if (!carrinho[name]) {
      const newCart = {
        ...carrinho,
        [name]: {
          id,
          productPrice,
          costPrice,
          type,
          name,
          imgLink,
          category,
          quantity: 1,
        }
      }
      setLocalStorage('tuca_lanches_cart', newCart);
    }
    const newCart = { ...carrinho };
    newCart[name] = {
      id,
      productPrice,
      costPrice,
      type,
      name,
      imgLink,
      category,
      quantity: value + 1,
    }
    setCarrinhoContext(newCart);
    setValue(value + 1);
  };

  const removeInCart = () => {
    const newCart = { ...carrinho };
    if (value - 1 === 0) {
      delete newCart[name];
      setLocalStorage('tuca_lanches_cart', newCart);
      setCarrinhoContext(newCart);
      setValue(value - 1);
    }
    else {
      newCart[name] = {
        id,
        productPrice,
        costPrice,
        type,
        name,
        imgLink,
        category,
        quantity: value - 1,
      }
      setLocalStorage('tuca_lanches_cart', newCart);
      setValue(value - 1);
    }
  };

  const theme = useTheme();
  return (
    <Box sx={{ minWidth: 110, margin: 1 }}>
      <Card variant="outlined" sx={{ width: 110 }}>
        <CardContent>
          <Avatar sx={{ width: 80, height: 80, alignSelf: "center" }} alt={name} src={imgLink} />
          <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
            {name}
          </Typography>
        </CardContent>
        <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
          {value}
        </Typography>
        <Button onClick={addInCart} variant="contained" color="success" fullWidth>
          Adicionar
        </Button>
        <Button onClick={removeInCart} disabled={value === 0 ? true : false} variant="contained" color="error" fullWidth>
          Remover
        </Button>
      </Card>
    </Box >
  );
}


CardProduct.propTypes = {
  id: PropTypes.number.isRequired,
  productPrice: PropTypes.number.isRequired,
  costPrice: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
}
