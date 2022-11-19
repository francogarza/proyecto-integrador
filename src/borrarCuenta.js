import React, {useContext,useEffect} from 'react';
import {db} from './firebase';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail,deleteUser  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {set, ref,onValue,remove,get, child} from 'firebase/database';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'
import { UserContext } from './UserContext';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { isAdmin } from '@firebase/util';

const BorrarCuenta = () => {

    //global
    const {userId, setUserId} = useContext(UserContext);
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    const {parentId,setParentId} = useContext(UserContext);
    const {EsAdmin,setEsAdmin} = useContext(UserContext);

    const [uid, setUid] = useState("");

    let navigate = useNavigate();

    const handleChangeUid=(e)=>{
        setUid(e.target.value)
    }

    function borrarCuenta(){

        return new Promise((resolve, reject) => {
            get(ref(db,'Padre/'+uid+'/hijos/'))
            .then((snapshot)=>{//se saca la lista de hijos
                
                const hijos = [];
                const data = snapshot.val();
                if(data !== null){
                    Object.values(data).map((e) => {
                            ////setHijos((oldArray) => [...oldArray,e])
                        hijos.push(e.uuid)
                    });
                    return hijos;
                }
            })
            .then((hijos)=>{//se borran los hijos de los talleres y luego se borran los objetos hijo
                hijos.map(hijo=>{
                    console.log('aggarra hijos')
                    onValue(ref(db,'Participante/'+hijo+'/talleres/'),(snapshot) => {
                        const data = snapshot.val();
                        console.log(snapshot)
                        if(data !== null){
                            Object.values(data).map((taller) => {
                                console.log('Taller/'+taller.id+'/participantes/'+hijo);
                                remove(ref(db,'Taller/'+taller.id+'/participantes/'+hijo));
                            });
                            remove(ref(db,'Participante/'+hijo));
                            
                        }
                    });
                })
                return hijos
            })
            .then((hijos)=>{//se borra el padre
                remove(ref(db,'Padre/'+uid));
                navigate('/catalogo-talleres')
                resolve(hijos)
            })
        })

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
            <div id="mainContainer">
                <Container>
                    {EsAdmin &&
                        <Form className="Cuenta">
                        <Form.Group>
                            <Form.Label>
                            Escriba el identificador único (UID) de la cuenta que desea borrar.
                            </Form.Label>
                            <br/>
                            <Form.Control type="text" placeholder="UID" id="Mail" value={uid} onChange={handleChangeUid}/>
                        </Form.Group>
                        
                        <br/>
                            <Button onClick={borrarCuenta} className='submit'>
                            Borrar cuenta
                            </Button>
        
                            <p>Para conseguir el UID de un usuario, se requiere que entre a la plataforma de Firebase en la sección de autenticación y se busque la cuenta con el correo del padre.</p>
                            <p>Recuerde que, para que se borre correctamente la cuenta, también se tiene que borrar la cuenta desde la sección de autenticación después de introducir el UID en esta página.</p>
                        </Form>
                    }

                </Container>
            </div>
        </Box>
    )
}

export default BorrarCuenta