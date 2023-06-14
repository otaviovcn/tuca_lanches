// import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BadgeIcon from '@mui/icons-material/Badge';

export const routesList = [
  {
    title: 'Venda do produto',
    path: '/venda-do-produto',
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
  },
  {
    title: 'Cadastro',
    path: '/cadastro',
    icon: <BadgeIcon />,
  }
];