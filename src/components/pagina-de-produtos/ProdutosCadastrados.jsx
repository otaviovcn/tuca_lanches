import { Button, CardContent, Grid, Box, Typography, Card, Avatar, Tabs, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
// import { Avatar } from '@mui/material';

import React, { useState } from 'react';

import { useProdutosContext } from '../../contexts/ProdutosContext';
import { setLocalStorage } from '../../utils/localStorage';


export const ProdutosCadastrados = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { produtos, setProdutosContext, setProductIsUpdatingContext } = useProdutosContext();

  const deleteUser = (id, localStorageKey) => {
    const newProductsList = { ...produtos };

    delete newProductsList[id];

    setLocalStorage('tuca_lanches_produtos', newProductsList);
    setProdutosContext(newProductsList);
  };

  const productsType = ["Comida", "Bebida"]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {
            productsType.map((type) => {
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
                    <Box sx={{ minWidth: 115, margin: 1 }}>
                      <Card variant="outlined" sx={{ width: 110 }}>
                        <CardContent>
                          <Avatar sx={{ width: 80, height: 80, alignSelf: "center" }} alt={name} src={imgLink} />
                          <Typography sx={{ fontSize: 14, textAlign: "center" }} color={theme.palette.secondary.dark}>
                            {name}
                          </Typography>
                        </CardContent>
                        <Box sx={
                          { display: "flex", justifyContent: "center" }
                        }>
                          <Typography key={id} gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.light, fontSize: 15, paddingLeft: 1, paddingRight: 1 }}>
                            {`Custo: R$${costPrice}`}
                          </Typography>
                          <Typography key={id} gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.light, fontSize: 15, paddingLeft: 1, paddingRight: 1 }}>
                            {`Valor: RS${productPrice}`}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Button variant="text" onClick={() => deleteUser(id)}><DeleteForeverIcon /></Button>
                          <Button
                            variant="text"
                            onClick={() => setProductIsUpdatingContext(true, id)}
                          >
                            <EditIcon />
                          </Button>

                        </Box>
                      </Card>
                    </Box >
                  </>
                )}
              </>
            );
          })
        }
      </Box>
    </>
  )
}
