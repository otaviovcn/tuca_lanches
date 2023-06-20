import React, { useState, useMemo } from 'react';

import { Container, Button, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useRelatoriosContext } from '../../contexts/RelatoriosContext';
import { removeLocalStorage } from '../../utils/localStorage';

export const Relatorios = () => {
  const { relatorios } = useRelatoriosContext();
  const [dia, setDia] = useState(Object.keys(relatorios)[-1]);
  // const [categoryList, setCategoryList] = useState(['Sem categoria', 'Salgados']);

  useMemo(() => {
    const lastDay = Object.keys(relatorios);
    if (lastDay.length > 0) {
      setDia(lastDay[lastDay.length - 1]);
    }
  }, [])


  const theme = useTheme();

  const vendasPorKey = (primaryKey) => {
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
          result[endKey] += vendasDoDia[hora][nomeDoProduto]['quantity'];
        } else {
          result[endKey] = vendasDoDia[hora][nomeDoProduto]['quantity'];;
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
    <Container sx={{ paddingTop: 8, display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
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
                dias.length > 0 && dias.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
              }
            </Select>
          </FormControl>

          <Typography variant="h4" sx={{ marginTop: 2 }}>
            Vendas por categoria
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {
              Object.entries(vendasPorKey('category'))?.map((item, index, array) => (
                <p
                  key={index}
                >
                  {item[0]}: {item[1]}({calculaProporcao(array[index][1], array)}%)
                </p>
              )
              )
            }
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Button variant="contained" color="primary" onClick={() => console.log(relatorios)}>
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
      <Button sx={{marginTop:10}} variant="contained" color="error" onClick={() => removeLocalStorage('tuca_lanches_relatorios')}>
        Remover relatorios
      </Button>
    </Container>
  )
};
