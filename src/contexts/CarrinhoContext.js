import { createContext, useCallback, useContext, useState } from 'react';
const { setLocalStorage } = require('../utils/localStorage');

const CarrinhoContext = createContext({});

export const useCarrinhoContext = () => {
  return useContext(CarrinhoContext);
}

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState({});

  // const [productIsUpdating, setProductIsUpdating] = useState(false);
  // const [updateProduct, setUpdateProduct] = useState(0);

  // const setProductIsUpdatingContext = (isUpdating=false, id=0) => {
  //   setProductIsUpdating(isUpdating);
  //   setUpdateProduct(id);
  // };

  const setCarrinhoContext = useCallback((newCarrinho) => {
    setCarrinho(newCarrinho);
    if (newCarrinho) {
      setLocalStorage('tuca_lanches_cart', newCarrinho);
    }
  }, []);

  const value = {
    carrinho,
    setCarrinhoContext,
    // setProductIsUpdatingContext,
    // productIsUpdating,
    // updateProduct,
  }

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
}