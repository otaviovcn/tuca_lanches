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
import { calculaProporcao, vendasPorKey, produtosPorHora, calculaLucro } from '../../utils/relatorios';
import { vendasPDF } from './relatorio-pdf/vendas';

export const Relatorios = () => {
  const { relatorios } = useRelatoriosContext();
  const [dia, setDia] = useState();
  const dias = Object.keys(relatorios);

  useMemo(() => {
    const lastDay = Object.keys(relatorios);
    if (lastDay.length > 0) {
      setDia(lastDay[lastDay.length - 1]);
    }
  }, []);

  const theme = useTheme();
  // calculaLucro({relatorios, dia});

  const vendasPorHora = [];
  Object.entries(produtosPorHora({relatorios, dia})).forEach((item) => {
    const productsList = [];
    Object.entries(item[1])?.forEach((item, index, array) => {
      const product = `${item[0]}: ${item[1]}(${calculaProporcao(array[index][1], array)}%)`
      productsList.push(product);
    })

    vendasPorHora.push([
      `${item[0]}:00 - ${item[0]}:59`,
      { ul: productsList },
    ])
  });

  return (
    <Container sx={{ background: "white", paddingTop: 8, marginTop: theme.spacing(1), display: "flex", flexDirection: "column", justifyItems: "center", alignContent: "center" }}>
      {Object.keys(relatorios).length > 0 ? (
        <>
          <FormControl sx={{ width: theme.spacing(40), padding: 1 }}>
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
            Object.entries(vendasPorKey({primaryKey:'category', secondaryKey:'quantity', relatorios, dia}))?.map((item, index, array) => (
              <Typography variant="h6" key={index} sx={{ fontSize: 17 }}>
                {item[0]}: {item[1]}({calculaProporcao(array[index][1], array)}%)
              </Typography>
            )
            )
          }

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Vendas por intervalo de hora
          </Typography>
          {
            Object.entries(produtosPorHora({relatorios, dia}))?.map((item, index, array) => {

              return (
                <Accordion sx={{ width: theme.spacing(40) }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ marginTop: 2 }} key={index}>
                      {item[0]}:00 - {item[0]}:59:
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Object.entries(item[1])?.map((item, index, array) => (
                      <Typography variant="h6" key={index} sx={{ fontSize: 17 }}>
                        {item[0]}: {item[1]}({calculaProporcao(array[index][1], array)}%)
                      </Typography>
                    )
                    )}
                  </AccordionDetails>
                </Accordion>
              )
            }
            )
          }

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bottom: 30, right: 15, flexDirection: 'column', position: "fixed" }}>
            <Button variant="contained" color="error" onClick={() => vendasPDF({ vendasPorHora, dia })}>
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
