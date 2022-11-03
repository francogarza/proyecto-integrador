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
import ManageChild from './manageChild';
import Navbar from './Navbar'
import Box from '@mui/material/Box';

function App() {
  
  const [userId, setUserId] = useState(false);
  const [userSelected,setUserSelected] = useState(false);
  const [parentId,setParentId] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{userId,setUserId,userSelected,setUserSelected,parentId,setParentId,isLoggedIn,setIsLoggedIn}}>
      <Box sx={{ display: 'flex' }}>
        <Router>
          <Navbar/>
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
                  <RegistroTaller />
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
                <Route path='/manage-children' element={
                  <ManageChild/>
                }
                />
          </Routes>
        </Router>
        </Box>
    </UserContext.Provider>
  )
}

export default App