import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { MenuLateral } from './components/menu-lateral/MenuLateral';
import { AppRoutes } from './routes';

import { CadastroProvider } from './contexts/CadastroContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { ProdutosProvider } from './contexts/ProdutosContext';

function App() {
  return (
    <AppThemeProvider>
      <CadastroProvider>
        <ProdutosProvider>
          <BrowserRouter>

            <MenuLateral>
              <AppRoutes />
            </MenuLateral>

          </BrowserRouter>
        </ProdutosProvider>
      </CadastroProvider>
    </AppThemeProvider >
  );
}

export default App;
