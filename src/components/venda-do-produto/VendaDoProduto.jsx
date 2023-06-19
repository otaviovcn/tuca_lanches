import React, { useMemo, useState } from 'react';
import { Typography, Tab, Tabs, Box, Button, SpeedDialIcon, SpeedDial } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import { useProdutosContext } from '../../contexts/ProdutosContext';
import { CardProduct } from './CardProduct';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { useCarrinhoContext } from '../../contexts/CarrinhoContext';
import { useRelatoriosContext } from '../../contexts/RelatoriosContext';
import { actualData, actualHour, adicionaAoRelatorio } from '../../utils/relatorios';

import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';



// const adicionaAoRelatorio = (relatorio, carrinho) => {
//   const relatorios = Object.values(getLocalStorage('tuca_lanches_relatorios'));
//   const date = actualData();
//   const { hour, timeFormat } = actualHour();

//   const vendaAtual = {};
//   const novoRelatorio = { ...relatorios };

//   //  Organiza os dados da venda atual
//   Object.values(carrinho).forEach(({
//     name,
//     productPrice,
//     quantity,
//     costPrice,
//     category,
//   }) => {
//     vendaAtual[name] = {
//       quantity,
//       productPrice,
//       costPrice,
//       category,
//     }
//   });

//   // Verifica se já existe um relatório para a data atual
//   if (novoRelatorio[date]) {
//     if (novoRelatorio[date][timeFormat]) {
//       novoRelatorio[date][timeFormat] = {
//         ...novoRelatorio[date][timeFormat],
//         ...vendaAtual,
//       };
//       novoRelatorio[date][timeFormat] = vendaAtual;
//     }
//     novoRelatorio[date] = {
//       ...novoRelatorio[date],
//       [timeFormat]: vendaAtual,
//     }
//   } else {
//     novoRelatorio[date] = {
//       ...novoRelatorio[date],
//       [timeFormat]: vendaAtual,
//     }
//   }


export const VendaDoProduto = () => {
  const [value, setValue] = useState(0);
  const productsType = ['Comida', 'Bebida', 'Carrinho']

  const { setCarrinhoContext, carrinho } = useCarrinhoContext();
  const { setRelatoriosContext, relatorios } = useRelatoriosContext();

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
                return <Tab icon={<ProductionQuantityLimitsIcon />} label={type} />
              }
              if (type === "Comida") {
                return <Tab icon={<LunchDiningIcon />} label={`${type}s`} />
              }
              return <Tab icon={<LocalBarIcon />} label={`${type}s`} />
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
      </Box>

       {/* Botão de finalizar compra */}
      {
        (productsType[value] === "Carrinho" && carrinhoList.length > 0 ) && (
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
