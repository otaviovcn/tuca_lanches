import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Container, Typography, Tab, Tabs, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';


export const CardProduct = (props) => {
  const { id, productPrice, costPrice, type, name } = props;
  const theme = useTheme();
  return (
    <Box sx={{ width: 110, margin: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
            {}
          </Typography>
        </CardContent>
        <Button variant="contained" color="success">Adicionar</Button>
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
}
