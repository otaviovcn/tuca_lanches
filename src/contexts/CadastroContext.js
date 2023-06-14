import { createContext, useCallback, useContext, useState } from 'react';

const CadastroContext = createContext({});

export const useCadastroContext = () => {
  return useContext(CadastroContext);
}

export const CadastroProvider = ({ children }) => {
  const [cadastro, setCadastro] = useState({});

  const setCadastroContext = (newCadastro) => {
    setCadastro(newCadastro);
  };

  return (
    <CadastroContext.Provider value={{ cadastro, setCadastroContext }}>
      {children}
    </CadastroContext.Provider>
  );
}