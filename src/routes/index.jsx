import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { EmConstrucao } from '../components/em-construcao/EmConstrucao'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<EmConstrucao />} />
      <Route path="/tuca_lanches" exact element={<EmConstrucao />} />
      <Route path="/tuca_lanches/venda-do-produto" exact element={<EmConstrucao />} />
      <Route path="/tuca_lanches/pagina-de-produtos" exact element={<EmConstrucao />} />
      <Route path="/tuca_lanches/relatorios" exact element={<EmConstrucao />} />
      <Route path="/tuca_lanchescadastro-vendedor" exact element={<EmConstrucao />} />
      <Route path="/tuca_lanches/not-found" exact element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  )
}
