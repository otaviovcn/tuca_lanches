import { createContext, useCallback, useContext, useState } from 'react';
const { setLocalStorage } = require('../utils/localStorage');

const RelatoriosContext = createContext({});

export const useRelatoriosContext = () => {
  return useContext(RelatoriosContext);
}

export const RelatoriosProvider = ({ children }) => {
  const [relatorios, setRelatorios] = useState({});

  const setRelatoriosContext = useCallback((newRelatorios) => {
    setRelatorios(newRelatorios);
    if (newRelatorios) {
      setLocalStorage('tuca_lanches_relatorios', newRelatorios);
    }
  }, []);

  const value = {
    setRelatoriosContext,
    relatorios,
  };

  return (
    <RelatoriosContext.Provider value={value}>
      {children}
    </RelatoriosContext.Provider>
  )
};
