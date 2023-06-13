// import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const routesList = [
  {
    title: 'Venda do produto',
    path: '/',
    icon: <ShoppingCartIcon />,
  },
  {
    title: 'Página de Produtos',
    path: '/pagina-de-produtos',
    icon: <Inventory2Icon />,
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    icon: <AssessmentIcon />,
  }
];