import React, { useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import { Typography, Grid, CardContent, Card, Container, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { useCadastroContext } from '../../contexts/CadastroContext';

export const Cadastro = () => {
  const [userToBeRegistered, setUserToBeRegistered] = useState('');
  const [usersList, setUsersList] = useState({});
  const theme = useTheme();
  // const { setCadastroContext } = useCadastroContext();

  useEffect(() => {
    const users = getLocalStorage('tuca_lanches_users');
    if (!users) {
      setLocalStorage('tuca_lanches_users', {});
    }
    setUsersList(users);
  }, []);

  // useEffect(() => {
  //   setCadastroContext(usersList);
  // }, [usersList]);

  const addUser = () => {
    const newUsersList = { ...usersList };
    const listLength = Object.keys(usersList).length;

    newUsersList[listLength] = userToBeRegistered;

    setLocalStorage('tuca_lanches_users', newUsersList);
    setUsersList(newUsersList);
    setUserToBeRegistered('');
  };

  // const updateUser = (id) => {
  //   const newUsersList = { ...usersList };

  //   newUsersList[id] = userToBeRegistered;
  // };

  const deleteUser = (id) => {
    const newUsersList = { ...usersList };

    delete newUsersList[id];

    setLocalStorage('tuca_lanches_users', newUsersList);
    setUsersList(newUsersList);
  };

  return (
    <Container className="cadastro">
      <Typography gutterBottom variant="h4" align="center" sx={{ textSizeAdjust: 100 }}>
        Cadastro de Usuários
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.dark }}>
                Usuários Cadastrados
              </Typography>
              {Object.values(usersList).map((user, index) => (
                <Box>
                  <Typography key={index} gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.dark }}>
                    {user}
                    <Button onClick={() => deleteUser(index)}><DeleteForeverIcon  /></Button>
                  </Typography>
                  {/* <Button onClick={() => {}}>Editar</Button> */}
                </Box>
              )
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Divider />
      <form>
        <Card>
          <CardContent>
            <Grid container spacing={1}>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Nome"
                  placeholder="Digite seu nome"
                  variant="outlined"
                  fullWidth
                  value={userToBeRegistered}
                  onChange={(e) => setUserToBeRegistered(e.target.value)}
                  required
                />
                <Button
                  onClick={addUser}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: theme.spacing(2) }}
                >
                  Adicionar
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  )
};
