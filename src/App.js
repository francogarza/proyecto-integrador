import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from "react-router-dom";
import RegistroPadres from './RegistroPadres.js';
import RegistroTalleres from './RegistroTalleres.js';
import CatalogoTalleres from './CatalogoTalleres.js';
import DetalleTaller from './DetalleTaller.js';
import TalleresInscritos from './TalleresInscritos';
import { UserContext } from './UserContext';
import LogIn from './login.js'
import ManageChild from './manageChild';
import Navbar from './Navbar'
import Box from '@mui/material/Box';
import RegistroHijo from './RegistroHijo.js';
import BorrarCuenta from './borrarCuenta';

function App() {

  //variables globales
  const [userId, setUserId] = useState(false);
  const [userSelected,setUserSelected] = useState(false);
  const [parentId,setParentId] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [EsAdmin,setEsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{userId,setUserId,userSelected,setUserSelected,parentId,setParentId,isLoggedIn,setIsLoggedIn,EsAdmin,setEsAdmin}}>
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
                <Route path="/registro-hijo" element={
                  <RegistroHijo />
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
                <Route path="/detalle-taller" element={
                  <DetalleTaller />
                }
                />
                <Route path="/login" element={
                  <LogIn/>
                }/>
                <Route path='/manage-children' element={
                  <ManageChild/>
                }
                />
                <Route path='/borrar-cuenta' element={
                  <BorrarCuenta/>
                }
                />
          </Routes>
        </Router>
        </Box>
    </UserContext.Provider>
  )
}

export default App