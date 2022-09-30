import React  from 'react';
import { BrowserRouter as Router, Route, RouterProvider, Routes } from "react-router-dom";
import TallerCard from './components/TallerCard';
import Home from './components/Home';
import RegistroPadres from './RegistroPadres.js';
import RegistroTaller from './RegistroTaller.js';
import RegistroTalleres from './RegistroTalleres.js';
import CatalogoTalleres from './CatalogoTalleres.js';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Home/>
        }
        />
        <Route path="/registro-padres" element={
          <RegistroPadres />
        }
        />
        <Route path="/registro-taller-usuario" element={
          <RegistroTaller />
        }
        />
        <Route path="/registro-taller-admin" element={
          <RegistroTalleres />
        }
        />
        <Route path="/catalogo-talleres" element={
          <CatalogoTalleres EsAdmin={false} />
        }
        />
        <Route path="/catalogo-talleres-admin" element={
          <CatalogoTalleres EsAdmin={true} />
        }
        />
      </Routes>
    </Router>
  )
}

export default App