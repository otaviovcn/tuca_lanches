import React, { useMemo } from 'react';
import { Typography, Tab, Tabs, Box, Button, SpeedDialIcon, SpeedDial } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import { useProdutosContext } from '../../contexts/ProdutosContext';
import { CardProduct } from './CardProduct';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { CarrinhoProvider, useCarrinhoContext } from '../../contexts/CarrinhoContext';

// import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export const VendaDoProduto = () => {
  const [value, setValue] = React.useState(0);
  const productsType = ['Comida', 'Bebida', 'Carrinho']

  const { setCarrinhoContext, carrinho } = useCarrinhoContext();

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

  const carrinhoList = Object.values(carrinho);

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
          carrinhoList.map((produto) => {
            const { id, productPrice, costPrice, type, name, imgLink, category } = produto;
            return (carrinhoList.length === 0 ? <Typography>Nenhum produto no carrinho</Typography> :
              (
                <div >
                  {productsType[value] === "Carrinho" && (
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
                </div>
              )
            )
          })
        }
        {/* <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box> */}
      </Box>
      {
        (productsType[value] === "Carrinho" && carrinhoList.length > 0 ) && (
          <Box>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ width: "100%" }}
            >
              <Button
                onClick={() => { }}
                type="button"
                variant="contained"
                color="success"
                fullWidth
                disabled={false}
              // sx={{  }}
              >
                Finalizar
              </Button>
            </BottomNavigation>
          </Box>
        )
      }

      <Button sx={{ background: "red" }} variant="contained" onClick={() => removeLocalStorage('tuca_lanches_cart')}>Limpar Produtos</Button>
    </Box>
  );
}
