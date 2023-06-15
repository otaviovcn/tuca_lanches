import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Container, Typography, Tab, Tabs, Box, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';


export const CardProduct = (props) => {
  const [value, setValue] = useState(0);

  const addInCart = () => {
    setValue(value + 1);
  };

  const removeInCart = () => {
    setValue(value - 1);
  };

  const { id, productPrice, costPrice, type, name, imgLink, category } = props;
  const theme = useTheme();
  return (
    <Box sx={{ minWidth: 110, margin: 1 }}>
      <Card variant="outlined" sx={{ width: 110, height: "100%" }}>
        <CardContent>
          <Avatar sx={{ width: 80, height: 80, alignSelf: "center" }} alt={name} src={imgLink} />
          <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
            { }
          </Typography>
        </CardContent>
        {/* <CardContent> */}
          <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
            {value}
          </Typography>
        {/* </CardContent> */}
        <Button onClick={addInCart} variant="contained" color="success" fullWidth>
          Adicionar
        </Button>
        <Button onClick={removeInCart} disabled={value === 0 ? true : false} variant="contained" color="error" fullWidth>
          Remover
        </Button>
      </Card>
    </Box>
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
