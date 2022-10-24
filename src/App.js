import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, RouterProvider, Routes, Navigate  } from "react-router-dom";
import TallerCard from './components/TallerCard';
import Home from './components/Home';
import RegistroPadres from './RegistroPadres.js';
import RegistroTaller from './RegistroTaller.js';
import RegistroTalleres from './RegistroTalleres.js';
import CatalogoTalleres from './CatalogoTalleres.js';
import DetalleTaller from './DetalleTaller.js';
import TalleresInscritos from './TalleresInscritos';
import SendEmailTest from './SendEmailTest';
import { UserContext } from './UserContext';
import HorarioTalleres from './HorarioTalleres.js';
import LogIn from './login.js'

function App() {
  
  const [userId, setUserId] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{userId,setUserId,isLoggedIn,setIsLoggedIn}}>
    <Router>
      <Routes>
            <Route path="/" element={
              <Navigate to="/catalogo-talleres"/>
            }
            />
            <Route path="/talleres-inscritos" element={
              <TalleresInscritos/>
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
              <RegistroTalleres isUpdate={false} />
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
              <DetalleTaller />
            }
            />

            <Route path="/send-email-test" element={
              <SendEmailTest />
            }
            />
            <Route path="/horario-taller" element={
              <HorarioTalleres />
            }
            />
            <Route path="/login" element={
              <LogIn/>
            }/>
      </Routes>
    </Router>
    </UserContext.Provider>
  )
}

export default App