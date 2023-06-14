import { createContext, useCallback, useContext, useState } from 'react';


const ProdutosContext = createContext({});

export const useProdutosContext = () => {
  return useContext(ProdutosContext);
}

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState({});
  const [productIsUpdating, setProductIsUpdating] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(0);

  const setProductIsUpdatingContext = (isUpdating=false, id=0) => {
    setProductIsUpdating(isUpdating);
    setUpdateProduct(id);
  };

  const setProdutosContext = useCallback((newProdutos) => {
    setProdutos(newProdutos);
  }, []);

  const value = {
    produtos,
    setProdutosContext,
    setProductIsUpdatingContext,
    productIsUpdating,
    updateProduct,
  }

  return (
    <ProdutosContext.Provider value={value}>
      {children}
    </ProdutosContext.Provider>
  );
}