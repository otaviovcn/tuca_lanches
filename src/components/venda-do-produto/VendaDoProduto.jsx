import React, { useMemo, useState } from 'react';
import { Typography, Tab, Tabs, Box, Button, Badge, useTheme } from '@mui/material';

import { useProdutosContext } from '../../contexts/ProdutosContext';
import { CardProduct } from './CardProduct';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { useCarrinhoContext } from '../../contexts/CarrinhoContext';
import { useRelatoriosContext } from '../../contexts/RelatoriosContext';
import { adicionaAoRelatorio } from '../../utils/relatorios';

import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from '@emotion/styled';


export const VendaDoProduto = () => {
  const [value, setValue] = useState(0);
  const productsType = ['Comida', 'Bebida', 'Carrinho']

  const { setCarrinhoContext, carrinho } = useCarrinhoContext();
  const { setRelatoriosContext, relatorios } = useRelatoriosContext();

  const theme = useTheme();

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

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const carrinhoList = Object.values(carrinho);

  return (
    <Box sx={{ width: '100%', background: 'white', marginTop: theme.spacing(1) }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
            productsType.map((type, index) => {
              if (type === "Carrinho") {
                return <Tab key={index} icon={
                  <StyledBadge badgeContent={carrinhoList.length} color="default">
                    <ShoppingCartIcon />
                  </StyledBadge>
                } label={type} />
              }
              if (type === "Comida") {
                return <Tab key={index} icon={<LunchDiningIcon />} label={`${type}s`} />
              }
              return <Tab key={index} icon={<LocalBarIcon />} label={`${type}s`} />
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
                      key={id}
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
        {/* Confere se o carrinho tem algo */}
        {
          (carrinhoList.length === 0 && productsType[value] === "Carrinho") && (
            <Box>
              <Typography variant="h5" component="div" sx={{ marginTop: "20px", textAlign:"center", color: theme.palette.primary.dark }}>
              <ProductionQuantityLimitsIcon /> Sem produtos no carrinho.
              </Typography>
            </Box>
          )
        }
        {/* Expõe os itens do carrinho */}
        {
          carrinhoList.map((produto, index) => {
            const { id, productPrice, costPrice, type, name, imgLink, category } = produto;
            return (
              (
                <div key={id}>
                  {productsType[value] === "Carrinho" && (
                    <>
                      <CardProduct
                        key={id}
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
      </Box>

      {/* Botão de finalizar compra */}
      {
        (productsType[value] === "Carrinho" && carrinhoList.length > 0) && (
          <Box>
            <Button
              onClick={() => {
                const novoRelatório = adicionaAoRelatorio(relatorios, carrinhoList);
                setRelatoriosContext(novoRelatório);
                setCarrinhoContext({});
              }}
              type="button"
              variant="contained"
              color="success"
              fullWidth
              disabled={false}
              sx={{ marginTop: "20px" }}
            >
              Finalizar
            </Button>
          </Box>
        )
      }

      <Button sx={{ background: "red", display: "none" }} variant="contained" onClick={() => removeLocalStorage('tuca_lanches_cart')}>Limpar Produtos</Button>
    </Box>
  );
}
