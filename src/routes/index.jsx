import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { EmConstrucao } from '../components/em-construcao/EmConstrucao'
import { Cadastro } from '../components/cadastro/Cadastro'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<EmConstrucao />} />
      <Route path="/venda-do-produto" exact element={<EmConstrucao />} />
      <Route path="/pagina-de-produtos" exact element={<EmConstrucao />} />
      <Route path="/relatorios" exact element={<EmConstrucao />} />
      <Route path="/cadastro" exact element={<Cadastro />} />
      <Route path="/not-found" exact element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  )
}
