import React, { useState, useMemo } from 'react';

import { Container, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useRelatoriosContext } from '../../contexts/RelatoriosContext';
import { removeLocalStorage } from '../../utils/localStorage';
import { vendasPDF } from './relatorio-pdf/vendas';

export const Relatorios = () => {
  const { relatorios } = useRelatoriosContext();
  const [dia, setDia] = useState();

  useMemo(() => {
    const lastDay = Object.keys(relatorios);
    if (lastDay.length > 0) {
      setDia(lastDay[lastDay.length - 1]);
    }
  }, [])


  const theme = useTheme();

  const produtosPorHora = () => {
    const vendasDoDia = relatorios[dia];

    if (!vendasDoDia) {
      return 'Sem vendas';
    }

    const result = {};

    const horasDoDia = Object.keys(vendasDoDia);
    horasDoDia.forEach((hora) => {
      const nomesDosProdutos = Object.keys(vendasDoDia[hora]);
      nomesDosProdutos.forEach((nomeDoProduto) => {
        const relativeHour = vendasDoDia[hora][nomeDoProduto]['relativeHour'];

        // result = {
        //   11: {
        //     coxinha: 1,
        //     kibe: 3,
        // }
        //   }
        // }

        const quantity = vendasDoDia[hora][nomeDoProduto]['quantity'];
        if (result[relativeHour]) {

          if (result[relativeHour][nomeDoProduto]) {
            result[relativeHour] = {
              ...result[relativeHour],
              [nomeDoProduto]: result[relativeHour][nomeDoProduto] + vendasDoDia[hora][nomeDoProduto]['quantity'],
            }
          } else {
            result[relativeHour] = {
              ...result[relativeHour],
              [nomeDoProduto]: vendasDoDia[hora][nomeDoProduto]['quantity'],
            }
          }

        } else {
          result[relativeHour] = {
            ...result[relativeHour],
            [nomeDoProduto]: quantity,
          }
        }
      });
    });
    console.log(result);
    return result;
  };

  // produtosPorHora();

  const vendasPorKey = (primaryKey, secondaryKey) => {
    // vendasDoDia[dia][hora][produto]
    const vendasDoDia = relatorios[dia];

    const result = {};

    if (!vendasDoDia) {
      return 'Sem vendas';
    }

    const horasDoDia = Object.keys(vendasDoDia);
    horasDoDia.forEach((hora) => {
      const nomesDosProdutos = Object.keys(vendasDoDia[hora]);
      nomesDosProdutos.forEach((nomeDoProduto) => {
        const endKey = vendasDoDia[hora][nomeDoProduto][primaryKey];
        if (result[endKey]) {
          result[endKey] += vendasDoDia[hora][nomeDoProduto][secondaryKey];
        } else {
          result[endKey] = vendasDoDia[hora][nomeDoProduto][secondaryKey];;
        }
      });
    });

    return result;
  };

  const calculaProporcao = (itemCorrente, array) => {
    const result = itemCorrente / array.reduce((acc, cur) => acc + cur[1], 0) * 100;
    return result.toFixed(2);
  };

  const dias = Object.keys(relatorios);
  return (
    <Container sx={{ background: "white", paddingTop: 8, marginTop: theme.spacing(1), display: "flex", flexDirection: "column", justifyItems: "center", alignContent: "center" }}>
      {Object.keys(relatorios).length > 0 ? (
        <>
          <FormControl sx={{ width: "50%", padding: 1 }}>
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
            Object.entries(vendasPorKey('category', 'quantity'))?.map((item, index, array) => (
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
            Object.entries(produtosPorHora())?.map((item, index, array) => (
                <Accordion>
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
            )
          }


          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Button variant="contained" color="primary" onClick={() => vendasPDF(relatorios)}>
              Imprimir relatório
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
