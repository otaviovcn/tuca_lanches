import React, { useMemo } from 'react';
import { Typography, Tab, Tabs, Box, Button } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PropTypes from 'prop-types';

import { useProdutosContext } from '../../contexts/ProdutosContext';
import { CardProduct } from './CardProduct';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { useCarrinhoContext } from '../../contexts/CarrinhoContext';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function VendaDoProduto() {
  const [value, setValue] = React.useState(0);
  const productsType = ['Comida', 'Bebida', 'Carrinho']

  const { setCarrinhoContext } = useCarrinhoContext();

  useMemo(() => {
    const cartStorage = getLocalStorage('tuca_lanches_cart');
    if (!cartStorage) {
      setLocalStorage('tuca_lanches_cart', {});
      setCarrinhoContext({})
    }
    setCarrinhoContext(cartStorage)
  }, [])

  const { produtos } = useProdutosContext();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', background: 'white' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
            productsType.map((type) => {
              if (type === "Carrinho") {
                return <Tab icon={<ProductionQuantityLimitsIcon />} />
              }
              return <Tab label={type} />
            })
          }
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }} value={value} index={0}>
        {
          Object.values(produtos).map(({ id, productPrice, costPrice, type, name, imgLink, category }) => {
            return (
              <>
                {productsType[value] === type && (
                  <>
                    <CardProduct
                      id={id}
                      productPrice={productPrice}
                      costPrice={costPrice}
                      type={type}
                      name={name}
                      imgLink={imgLink}
                      category={category}
                    />
                  </>
                )}
              </>
            );
          })
        }
        {
          Object.values(produtos).map((produto) => {
            // const { id, productPrice, costPrice, type, name } = produto;
            return (
              <>
                {productsType[value] === "Carrinho" && (
                  <CardProduct />
                )}
              </>
            );
          })
        }
      </Box>
      <Button sx={{ background: "red"}} variant="contained" onClick={() => removeLocalStorage('tuca_lanches_cart')}>Limpar Produtos</Button>
    </Box>
  );
}
