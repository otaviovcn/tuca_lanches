import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './components/venda-do-produto/vendaDoProduto.css';
import { MenuLateral } from './components/menu-lateral/MenuLateral';
import { AppRoutes } from './routes';

import { CadastroProvider } from './contexts/CadastroContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { ProdutosProvider } from './contexts/ProdutosContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
const { RelatoriosProvider } = require('./contexts/RelatoriosContext');

function App() {
  return (
    <AppThemeProvider>
      <CadastroProvider>
        <ProdutosProvider>
          <CarrinhoProvider>
            <RelatoriosProvider>
              <BrowserRouter>

                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>

              </BrowserRouter>
            </RelatoriosProvider>s
          </CarrinhoProvider>
        </ProdutosProvider>
      </CadastroProvider>
    </AppThemeProvider >
  );
}

export default App;
