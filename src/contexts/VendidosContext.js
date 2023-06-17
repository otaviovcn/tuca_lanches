import { createContext, useCallback, useContext, useMemo, useState } from 'react';
const { setLocalStorage, getLocalStorage } = require('../utils/localStorage');

const VendidosContext = createContext({});

export const useVendidosContext = () => {
  return useContext(VendidosContext);
}

export const VendidosProvider = ({ children }) => {
  const [relatorios, setRelatorios] = useState({});

  const setVendidosContext = useCallback((newRelatorios) => {
    setRelatorios(newRelatorios);
    if (newRelatorios) {
      setLocalStorage('tuca_lanches_relatorios', newRelatorios);
    }
  }, []);

  useMemo(() => {
    const relatoriosLocalStorage = getLocalStorage('tuca_lanches_relatorios');
    if (relatoriosLocalStorage) {
      setRelatorios(relatoriosLocalStorage);
    }
    setLocalStorage('tuca_lanches_relatorios', {});
  }, []);

  const value = {
    setVendidosContext,
    relatorios,
  };

  return (
    <VendidosContext.Provider value={value}>
      {children}
    </VendidosContext.Provider>
  )
};
