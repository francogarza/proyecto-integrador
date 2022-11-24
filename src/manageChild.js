import React, {useContext,useEffect} from 'react';
import {auth, db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {uid} from 'uid';
import {set, ref,onValue,remove} from 'firebase/database';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'
import { UserContext } from './UserContext';
import Box from '@mui/material/Box';

const ManageChild = () => {

//global
      
const {userId, setUserId} = useContext(UserContext);
const {userSelected,setUserSelected} = useContext(UserContext);
const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
const {parentId,setParentId} = useContext(UserContext);
const [talleresBorrar,setTalleresBorrar] = useState([]);


//local
const [hijos,setHijos] = useState([]);
let navigate = useNavigate();


useEffect(() => {
    if(isLoggedIn){
        onValue(ref(db,'Padre/'+parentId+'/hijos/'),(snapshot) => {
            setHijos([]);
            const data = snapshot.val();
            if(data !== null){
                Object.values(data).map((e) => {
                    setHijos((oldArray) => [...oldArray,e])
                });
            }
        });
    }
}, [parentId,isLoggedIn])

useEffect(() => {
    console.log("El hijo elegido fue")
    console.log(userId)
}, [userId,userSelected])

const agregarHijo = () => {
    navigate('/registro-hijo',{state:{isUpdate:false}})
}

const seleccionarHijo = (id) =>{
    setUserId(id);
    setUserSelected(true);

}

const irCatalogo = () => {
    navigate('/catalogo-talleres')
}

const verTalleresInscritos=(e)=>{
    setUserId(e)
    navigate('/talleres-inscritos')
}

const borrarHijo=(e)=>{
    onValue(ref(db,'Participante/'+e+'/talleres/'),(snapshot) => {
        setTalleresBorrar([]);
        const data = snapshot.val();
        if(data !== null){
            Object.values(data).map((taller) => {
                console.log('Taller/'+taller.id+'/participantes/'+e);
                remove(ref(db,'Taller/'+taller.id+'/participantes/'+e));
                ////setTalleresBorrar((oldArray) => [...oldArray,e])
            });
        }
    });
    remove(ref(db,'Participante/'+e));
    remove(ref(db,'Padre/'+parentId+'/hijos/'+e));
}


const editarHijo=(idEditar)=>{
    navigate('/registro-hijo',{state:{isUpdate:true,idEditar:idEditar}})
}


return(
    <Box
        component="main"
        sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
    >
        <div>
            {/* {isLoggedIn?<p>logged in</p> : <p>logged out</p>}
            {isLoggedIn && <h1>{userId}</h1>} */}
            <div style={{padding: "50px", textAlign: "center", background: "#F95828", color: "#fdfffc", fontSize: "30px"}}>
                <h1> Seleccionar hijo/a </h1>
            </div>
            <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            {hijos.map(hijo => (
                        <div className={hijo.uuid===userId ? 'divHijoSelect':'divhijos'} key={hijo.uuid}>
                                <p>{hijo.Nombre}</p>
                                <Button onClick={() => seleccionarHijo(hijo.uuid)}>Seleccionar hijo/a</Button>
                                <Button onClick={() => verTalleresInscritos(hijo.uuid)}>Ver talleres inscritos</Button>
                                <Button onClick={() => editarHijo(hijo.uuid)}>Editar hijo/a</Button>
                                <Button onClick={() => borrarHijo(hijo.uuid)}>Borrar hijo/a</Button>
                        </div>
                    ))}
            </div>
            <Button onClick={agregarHijo}>Agregar hijo/a</Button>
            <Button onClick={irCatalogo}>Catálogo</Button>
        </div>

        <div style={{padding: "50px", textAlign: "center", color: "gray", fontSize: "18px"}}>
            <p> Si tiene dudas puede contactar al correo: axtateen@csoftmty.org </p>
            <p> o al correo: capitalhumano@csoftmty.org </p>
        </div>
    </Box>
)
}

export default ManageChild