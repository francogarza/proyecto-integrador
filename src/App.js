import React  from 'react';
import { BrowserRouter as Router, Route, RouterProvider, Routes } from "react-router-dom";
import TallerCard from './components/TallerCard';
import Home from './components/Home';
import RegistroPadres from './RegistroPadres.js';
import RegistroTaller from './RegistroTaller.js';
import RegistroTalleres from './RegistroTalleres.js';
import CatalogoTalleres from './CatalogoTalleres.js';
import DetalleTaller from './DetalleTaller.js';

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
          <RegistroTaller PadreId={"10366ae44ab"}/>
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
        <Route path="/detalle-taller" element={
          <DetalleTaller id={"16a2b3ee056"} EstaInscrito={true} />
        }
        />
      </Routes>
    </Router>
  )
}

export default App