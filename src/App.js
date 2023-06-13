import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { MenuLateral } from './components/menu-lateral/MenuLateral';
import { AppThemeProvider } from './contexts/ThemeContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>

        <MenuLateral>
          <AppRoutes />
        </MenuLateral>

      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
