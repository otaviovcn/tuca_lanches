import { Button, CardContent, Grid, Box, Typography, Card, Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
// import { Avatar } from '@mui/material';

import React from 'react';

import { useProdutosContext } from '../../contexts/ProdutosContext';
import { setLocalStorage } from '../../utils/localStorage';


export const ProdutosCadastrados = ({ productType }) => {
  const theme = useTheme();
  const { produtos, setProdutosContext, setProductIsUpdatingContext } = useProdutosContext();

  const deleteUser = (id, localStorageKey) => {
    const newProductsList = { ...produtos };

    delete newProductsList[id];

    setLocalStorage('tuca_lanches_produtos', newProductsList);
    setProdutosContext(newProductsList);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Typography gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.main, fontSize: 19 }}>
            {`${productType}s cadastradas`}
          </Typography>
          <Grid item xs={12} sm={12} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {Object.values(produtos).map(({ id, name, costPrice, productPrice, type, imgLink }) => {
              if (type !== productType) return null;
              return (
                <Box sx={
                  { display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column", border: 1, borderColor: theme.palette.secondary.main, borderRadius: 1, padding: 1, margin: 1, backgroundColor: theme.palette.background.default, width: "130px" }
                }>
                  <Avatar sx={{ width: 80, height: 80, alignSelf: "center" }} alt={name} src={imgLink} />
                  <Typography key={id} gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.dark, fontSize: 17 }}>
                    {name}
                  </Typography>
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
                </Box>);
            }
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
