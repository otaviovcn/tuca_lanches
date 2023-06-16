import React, { useState, useEffect, useMemo } from 'react'

import { Typography, Grid, CardContent, Card, Container, TextField, Divider, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { getLocalStorage, setLocalStorage } from '../../utils/localStorage'
import { useCadastroContext } from '../../contexts/CadastroContext';

export const Cadastro = () => {
  const [userToBeRegistered, setUserToBeRegistered] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [usersList, setUsersList] = useState({});
  const [userToBeUpdated, setUserToBeUpdated] = useState(0);
  const theme = useTheme();
  const { setCadastroContext } = useCadastroContext();

  useEffect(() => {
    const users = getLocalStorage('tuca_lanches_users');
    if (!users) {
      setLocalStorage('tuca_lanches_users', {});
    }
    setUsersList(users);
  }, []);

  const addUser = () => {
    const newUsersList = { ...usersList };
    const listLength = Object.keys(usersList).length;

    newUsersList[listLength] = userToBeRegistered;

    setLocalStorage('tuca_lanches_users', newUsersList);
    setUsersList(newUsersList);
    setUserToBeRegistered('');
  };

  const updateUser = (id, localStorageKey) => {
    const newUsersList = { ...usersList };

    newUsersList[id] = userToBeRegistered;
    setLocalStorage('tuca_lanches_users', newUsersList);
    setIsUpdate(false);
    setUserToBeUpdated(0);
  };

  const deleteUser = (id, localStorageKey) => {
    const newUsersList = { ...usersList };

    delete newUsersList[id];

    setLocalStorage('tuca_lanches_users', newUsersList);
    setUsersList(newUsersList);
  };

  useMemo(() => {
    setCadastroContext(usersList);
  }, [usersList]);

  return (
      <Container  className="cadastro" sx={{ marginTop: theme.spacing(2), width: theme.spacing(100) }}>
      <Typography gutterBottom variant="h4" align="center" sx={{ fontSize: 30 }}>
        Cadastro de Usuários
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.dark, fontSize: 19 }}>
                Usuários Cadastrados
              </Typography>
              {Object.values(usersList).map((user, index) => (
                <Box>
                  <Typography key={index} gutterBottom variant="h6" align="center" sx={{ color: theme.palette.secondary.dark }}>
                    {user}
                    <Button variant="text" onClick={() => deleteUser(index)}><DeleteForeverIcon /></Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        setIsUpdate(true)
                        setUserToBeRegistered(user)
                        setUserToBeUpdated(index)
                      }}
                    >
                      <EditIcon  />
                    </Button>
                  </Typography>
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
                  color="primary"
                  variant="outlined"
                  fullWidth
                  value={userToBeRegistered}
                  onChange={(e) => setUserToBeRegistered(e.target.value)}
                  required
                />
                {isUpdate ?
                   <Button
                   onClick={() => updateUser(userToBeUpdated)}
                   type="submit"
                   variant="contained"
                   color="primary"
                   fullWidth
                   disabled={!userToBeRegistered}
                   sx={{ marginTop: theme.spacing(2) }}
                 >
                   Editar
                 </Button> :
                   <Button
                  onClick={addUser}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!userToBeRegistered}
                  sx={{ marginTop: theme.spacing(2) }}
                >
                  Adicionar
                </Button>}
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  )
};
