import React, {useContext} from 'react';
import {db} from './firebase';
import { useNavigate } from 'react-router-dom';
import {ref,onValue,remove,get} from 'firebase/database';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form} from 'react-bootstrap'
import { UserContext } from './UserContext';
import Box from '@mui/material/Box';


const BorrarCuenta = () => {

    //variable global
    const {EsAdmin,setEsAdmin} = useContext(UserContext);

    //variable local
    const [uid, setUid] = useState("");
    let navigate = useNavigate();

    //funcion para cambiar el estado de uid
    const handleChangeUid=(e)=>{
        setUid(e.target.value)
    }
    
    //funcion para borrar una cuenta, esto incluye borrar a los hijos, borrar a los hijos en el objeto de los talleres y borrar a el padre
    function borrarCuenta(){

        return new Promise((resolve, reject) => {
            get(ref(db,'Padre/'+uid+'/hijos/'))
            .then((snapshot)=>{//se saca la lista de hijos
                const hijos = [];
                const data = snapshot.val();
                if(data !== null){
                    Object.values(data).map((e) => {
                        hijos.push(e.uuid)//se guarda el hijo en el arreglo hijos
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