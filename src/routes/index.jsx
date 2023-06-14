import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { EmConstrucao } from '../components/em-construcao/EmConstrucao'
import { Cadastro } from '../components/cadastro/Cadastro'
import { PaginaDeProdutos } from '../components/pagina-de-produtos/PaginaDeProdutos'

import { useCadastroContext } from '../contexts/CadastroContext'

export const AppRoutes = () => {
  const { cadastro } = useCadastroContext();
  return (
    <Routes>
      <Route path="/" exact element={Object.values(cadastro).length === 0 ? <Cadastro /> : <EmConstrucao />} />
      <Route path="/venda-do-produto" exact element={<EmConstrucao />} />
      <Route path="/pagina-de-produtos" exact element={<PaginaDeProdutos />} />
      <Route path="/relatorios" exact element={<EmConstrucao />} />
      <Route path="/cadastro" exact element={<Cadastro />} />
      <Route path="/not-found" exact element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  )
}
