import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import { AppRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes /> 
    </BrowserRouter>
  );
}

export default App;
