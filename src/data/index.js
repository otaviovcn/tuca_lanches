// import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BadgeIcon from '@mui/icons-material/Badge';

export const routesList = [
  {
    title: 'Venda do produto',
    path: '/tuca_lanches/venda-do-produto',
    icon: <ShoppingCartIcon />,
  },
  {
    title: 'Página de Produtos',
    path: '/tuca_lanches/pagina-de-produtos',
    icon: <Inventory2Icon />,
  },
  {
    title: 'Relatórios',
    path: '/tuca_lanches/relatorios',
    icon: <AssessmentIcon />,
  },
  {
    title: 'Cadastro',
    path: '/tuca_lanches/cadastro-vendedor',
    icon: <BadgeIcon />,
  }
];