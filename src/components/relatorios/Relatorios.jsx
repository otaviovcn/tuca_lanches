import React, { useState, useMemo } from 'react';

import { Container, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { useRelatoriosContext } from '../../contexts/RelatoriosContext';
import { removeLocalStorage } from '../../utils/localStorage';
import {
  calculaProporcao,
  vendasPorKey,
  produtosPorHora,
  calculaLucro,
  calculaCustoOuLucro,
  calculaPrecoTotal,
} from '../../utils/relatorios';
import { vendasPDF } from './relatorio-pdf/vendas';
import { calculaVendasPorHora } from './relatorio-pdf/utils/index';

export const Relatorios = () => {
  const { relatorios } = useRelatoriosContext();
  const [dia, setDia] = useState();
  const dias = Object.keys(relatorios);

  // CONSTANTES

  const listaDeVendasPorCategoria = Object.entries(vendasPorKey({ primaryKey: 'category', secondaryKey: 'quantity', relatorios, dia }));
  const listaDeProdutosPorHora = Object.entries(produtosPorHora({ relatorios, dia }));
  const listaDoLucroPorCategoria = Object.entries(calculaLucro({ relatorios, dia }));


  useMemo(() => {
    const lastDay = Object.keys(relatorios);
    if (lastDay.length > 0) {
      setDia(lastDay[lastDay.length - 1]);
    }
  }, []);

  const theme = useTheme();

  
  // const calculaPrecoTotal = () => {
  //   let lucroTotalBruto = 0;
  //   let lucroTotalLiquido = 0;
  //   let custoTotalEstimado = 0;
  //   const custoPorCategoria = {};
  //   Object.entries(calculaLucro({ relatorios, dia }))?.forEach((category, index) => {
  //     let currentCost = 0;
  //     Object.entries(category[1])?.forEach((product, i, array) => {
  //       lucroTotalBruto += Number(calculaCustoOuLucro({ ...product[1], type: 'lucro bruto'}));
  //       lucroTotalLiquido += Number(calculaCustoOuLucro({ ...product[1], type: 'lucro líquido' }));
  //       custoTotalEstimado += Number(calculaCustoOuLucro({ ...product[1], type: 'custo' }));
  //       currentCost += Number(calculaCustoOuLucro({ ...product[1], type: 'custo' }));
  //     });
  //     custoPorCategoria[category[0]] = currentCost;
  //   })
  //   return { lucroTotalBruto, lucroTotalLiquido, custoTotalEstimado, custoPorCategoria };
  // }

  const geraPDF = () => {
    const lucro = `Bruto - R$${calculaPrecoTotal({ relatorios, dia }).lucroTotalBruto.toFixed(2)} / Líquido - R$ ${calculaPrecoTotal({ relatorios, dia }).lucroTotalLiquido.toFixed(2)}`;
    const custo = `R$${calculaPrecoTotal({ relatorios, dia }).custoTotalEstimado.toFixed(2)}`
    const vendasPorHora = calculaVendasPorHora({listaDeProdutosPorHora});
    vendasPDF({ dia, vendasPorHora, lucro, custo });
  }

  return (
    <Container sx={{ background: "white", paddingTop: 8, marginTop: theme.spacing(1), display: "flex", flexDirection: "column", justifyItems: "center", alignContent: "center" }}>
      {Object.keys(relatorios).length > 0 ? (
        <>
          <FormControl sx={{ width: theme.spacing(60), padding: 1 }}>
            <InputLabel>Selecione o dia</InputLabel>
            <Select
              value={dia}
              label="Dias"
              onChange={(event) => setDia(event.target.value)}
              sx={{ color: theme.palette.secondary.main }}
            >
              {
                dias.length > 0 && dias.map((item, index) => <MenuItem key={index} value={item}><Typography variant="h6">{item}</Typography></MenuItem>)
              }
            </Select>
          </FormControl>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Vendas por categoria
          </Typography>

          {
            listaDeVendasPorCategoria?.map((item, index, array) => (
              <Typography variant="h6" key={item} sx={{ fontSize: 17 }}>
                {item[0]}: {item[1]}({calculaProporcao(array[index][1], array)}%)
              </Typography>
            )
            )
          }

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Lucro total estimado do dia:
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 2, fontSize:17 }}>
          Bruto - R${calculaPrecoTotal({ relatorios, dia }).lucroTotalBruto.toFixed(2)} / Líquido - R$ {calculaPrecoTotal({ relatorios, dia }).lucroTotalLiquido.toFixed(2)}
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Custo total estimado do dia:
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 2, fontSize:17 }}>
          R${calculaPrecoTotal({ relatorios, dia }).custoTotalEstimado.toFixed(2)}
          </Typography>

          <Typography variant="h6" sx={{ marginTop: 2 }}>
          Vendas por intervalo de hora:
          </Typography>

          {
            listaDeProdutosPorHora?.map((item, index) => {

              return (
                <Accordion sx={{ width: theme.spacing(60) }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ marginTop: 2 }} key={index}>
                      {item[0]}:00 - {item[0]}:59:
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                    {Object.entries(item[1])?.map((item, index, array) => (
                      <li><Typography variant="h6" key={item} sx={{ fontSize: 17 }}>
                        {item[0]}: {item[1]}({calculaProporcao(array[index][1], array)}%)
                      </Typography></li>
                    )
                    )}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              )
            }
            )
          }

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Lucro estimado por categoria
          </Typography>
          {
            listaDoLucroPorCategoria?.map((category, index) => {

              return (
                <Accordion sx={{ width: theme.spacing(60) }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ marginTop: 2 }} key={index}>
                      {category[0]}:
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <ul>
                    {Object.entries(category[1])?.map((product, i, array) => (
                      <li><Typography variant="h6" key={i} sx={{ fontSize: 17 }}>
                        {product[0]}: Bruto - R${calculaCustoOuLucro({ ...product[1], type: 'lucro bruto' })} / Líquido - R$ {calculaCustoOuLucro({ ...product[1], type: 'lucro líquido' })}
                      </Typography></li>
                    )
                    )}
                    </ul>
                    {<Typography variant="h6" sx={{ fontSize: 17 }}>
                      Lucro Bruto Total: R${calculaPrecoTotal({ relatorios, dia }).lucroPorCategoria[category[0]]['grossProfit'].toFixed(2)}
                    </Typography>}
                    {<Typography variant="h6" sx={{ fontSize: 17 }}>
                      Lucro Líquido Total: R${calculaPrecoTotal({ relatorios, dia }).lucroPorCategoria[category[0]]['netProfit'].toFixed(2)}
                    </Typography>}
                  </AccordionDetails>
                </Accordion>
              )
            }
            )
          }

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Custo estimado por categoria
          </Typography>
          {
            listaDoLucroPorCategoria?.map((category, index) => {

              return (
                <Accordion sx={{ width: theme.spacing(60) }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ marginTop: 2 }} key={index}>
                      {category[0]}:
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                    {Object.entries(category[1])?.map((product, i, array) => {
                      return (<li><Typography variant="h6" key={i} sx={{ fontSize: 17 }}>
                        {product[0]}: R${calculaCustoOuLucro({ ...product[1], type: 'custo' })}
                      </Typography></li>)
                    }
                    )}
                    </ul>
                    {<Typography variant="h6" sx={{ fontSize: 17 }}>
                      Total: R${calculaPrecoTotal({ relatorios, dia }).custoPorCategoria[category[0]].toFixed(2)}
                    </Typography>}
                  </AccordionDetails>
                </Accordion>
              )
            }
            )
          }

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bottom: 30, right: 15, flexDirection: 'column', position: "fixed" }}>
            <Button variant="contained" color="error" onClick={geraPDF}>
              <PictureAsPdfIcon /> Abrir Relatório
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          Sem relatórios
        </Typography>
      )
      }
      <Button sx={{ marginTop: 10 }} variant="contained" color="error" onClick={() => removeLocalStorage('tuca_lanches_relatorios')}>
        Remover relatorios
      </Button>
    </Container>
  )
};
