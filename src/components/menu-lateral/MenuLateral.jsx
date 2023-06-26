import React, { useState, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ButtonToggleThemeMode } from '../ButtonToggleThemeMode';
import { useNavigate } from 'react-router-dom'
import { routesList } from '../../data';
import { Container } from '@mui/material';
import "./menuLateral.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { useProdutosContext } from '../../contexts/ProdutosContext';
import { productsData } from '../../data/productsData';
import { useRelatoriosContext } from '../../contexts/RelatoriosContext';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const MenuLateral = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('Venda do produto');

  const { setProdutosContext } = useProdutosContext();
  const { setRelatoriosContext } = useRelatoriosContext();

  // Verifica se existe produtos no localStorage, caso não exista, cria uma lista de produtos
  useMemo(() => {
    const productsList = getLocalStorage('tuca_lanches_produtos');
    if (!productsList) {
      setLocalStorage('tuca_lanches_produtos', productsData);
    }
    setProdutosContext(productsList);
  }, []);

  // Verifica se existe relatorios no localStorage, caso exista, seta o valor no contexto
  useMemo(() => {
    const relatoriosLocalStorage = getLocalStorage('tuca_lanches_relatorios');
    if (!relatoriosLocalStorage) {
      setLocalStorage('tuca_lanches_relatorios', {});
    }
    setRelatoriosContext(relatoriosLocalStorage);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (to, pageTitle) => {
    setPageTitle(pageTitle);
    navigate(to);
  };

  return (
    <Box sx={{ display: 'flex' }} color={theme.palette.secondary.main}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar color={theme.palette.secondary.main}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color: theme.palette.secondary.main,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color={theme.palette.secondary.main}>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img
            className="logo"
            width="140px"
            src={require("../../assets/tuca_lanches_icon_sf.png")}
            alt="Tuca Lanches"
            onClick={() => handleClick('/', 'Venda do produto')}
          />
          <IconButton onClick={handleDrawerClose} color={theme.palette.secondary.main}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routesList.map(({ title, path, icon }) => (
            <ListItem key={title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleClick(path, title)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: theme.palette.secondary.main,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: theme.palette.primary.dark,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <Box component="main">
          <ButtonToggleThemeMode />
        </Box> */}
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              href="https://www.linkedin.com/in/otavio-vinicius/"
              target="_blank"
              rel="noreferrer"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: theme.palette.secondary.main,
              }}
            >
              <LinkedInIcon sx={{ color: theme.palette.primary.main }} />
              <ListItemText primary='Meu Linkedin' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              href="https://github.com/otaviovcn/tuca_lanches"
              target="_blank"
              rel="noreferrer"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color: theme.palette.secondary.main,
              }}
            >
              <GitHubIcon sx={{ color: theme.palette.primary.main }} />
              <ListItemText primary='Repositório do Projeto' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

          </ListItem>
        </List>
      </Drawer>
      <Container width="100%" sx={{ display: 'flex', paddingTop: 8 }}>
        {children}
      </Container>

    </Box>
  );
}
