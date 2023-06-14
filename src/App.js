import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { MenuLateral } from './components/menu-lateral/MenuLateral';
import { CadastroProvider } from './contexts/CadastroContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <AppThemeProvider>
      <CadastroProvider>

        <BrowserRouter>

          <MenuLateral>
            <AppRoutes />
          </MenuLateral>

        </BrowserRouter>
      </CadastroProvider>
    </AppThemeProvider>
  );
}

export default App;
