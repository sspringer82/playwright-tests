import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './List'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Form from './Form'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<List />} />
      <Route path="/create" element={<Form />} />
    </Routes>
  </BrowserRouter>
}

export default App;
