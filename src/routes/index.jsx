import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  )
}
