import React, {useContext,useEffect} from 'react';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {uid} from 'uid';
import {set, ref,onValue} from 'firebase/database';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'
import { UserContext } from './UserContext';

const ManageChild = () => {

//global
      
const {userId, setUserId} = useContext(UserContext);
const {userSelected,setUserSelected} = useContext(UserContext);
const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
const {parentId,setParentId} = useContext(UserContext);


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
    console.log("el hijo elejido fue")
    console.log(userId)
}, [userId,userSelected])

const agregarHijo = () => {
    navigate('/registro-taller-usuario')
}

const seleccionarHijo = (id) =>{
    setUserId(id);
    setUserSelected(true);
}



return(
<div>
    {/* {isLoggedIn?<p>logged in</p> : <p>logged out</p>}
    {isLoggedIn && <h1>{userId}</h1>} */}
    <div style={{padding: "50px", textAlign: "center", background: "#F95828", color: "#fdfffc", fontSize: "30px"}}>
        <h1> Seleccionar hijo </h1>
    </div>
    <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
    {hijos.map(hijo => (
                <div style={{display: "inline-block"}} key={hijo.uuid}>
                        <p>{hijo.Nombre}{hijo.uuid===userId && "(seleccionado)"}</p>
                        <Button onClick={() => seleccionarHijo(hijo.uuid)}>Seleccionar hijo</Button>
                        <Button>editar hijo</Button>
                        <Button>Borrar hijo</Button>
                </div>
            ))}
    </div>
    <Button onClick={agregarHijo}>agregar hijo</Button>
</div>  
)
}

export default ManageChild