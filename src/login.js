import React, {useContext,useEffect} from 'react';
import {db} from './firebase';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
import {uid} from 'uid';
import { useNavigate } from 'react-router-dom';
import {set, ref} from 'firebase/database';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'
import { UserContext } from './UserContext';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const LogIn = () => {

    //global
    const {userId, setUserId} = useContext(UserContext);
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    const {parentId,setParentId} = useContext(UserContext);
    const {EsAdmin,setEsAdmin} = useContext(UserContext);

    const [Mail, setMail] = useState("");
    const [Password,setPassword] = useState("");
    const [alertActive, setAlertActive] = useState(false);
    const [isPasswordReset,setIsPasswordReset] = useState(false);
    let navigate = useNavigate();

    const handleChangeMail=(e)=>{
        setMail(e.target.value)
    }

    const HandlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }

    const writeToDatabase = () => {//funcion general para hacer login
    
        if(checkAdmin()){
            setEsAdmin(true);
            console.log('es admin')
            navigate('/catalogo-talleres')
        }else{
            const auth = getAuth();
            signInWithEmailAndPassword(auth,Mail,Password)
            .then((userCredential) =>{
                console.log(userCredential.user.uid)
                setIsLoggedIn(true);
                setParentId(userCredential.user.uid)
                navigate('/manage-children')
                //hay que poner al padre
                //setUserId(userCredential.user.uid);
            })
            .catch((error) =>{
                console.log(error);
            })
        }
    };
    
    const setPasswordReset=(e)=>{
        setIsPasswordReset(true);
    }

    const passwordReset=()=>{
        const auth = getAuth();
        sendPasswordResetEmail(auth, Mail)
        .then(() => {
            alert('se mando un correo a su cuenta de email para re-establecer su contraseña, si no encuentra el mail porfavor verificar su carpeta de spam')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error');
        });
    }

    function checkAdmin(){
        if(Mail==="admin" && Password==="csoftmty2022"){
            console.log("what")
            return true;
        }else{
            return false;
        }
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
                {alertActive && <Alert variant='warning'>Porfavor verifique sus datos</Alert>}
                <Form className="login">
                <Form.Group>
                    <Form.Label>
                    Escriba su correo electrónico.
                    </Form.Label>
                    <br/>
                    <Form.Control type="text" placeholder="Correo" id="Mail" value={Mail} onChange={handleChangeMail}/>
                </Form.Group>
                <br/>
                {!isPasswordReset &&
                <Form.Group>
                <Form.Label>
                Escriba su contraseña.
                </Form.Label>
                <br/>
                <Form.Control type="password" placeholder="password" id="Password" value={Password} onChange={HandlePasswordChange}/>
                </Form.Group>
                }
                
                <br/>
                
                    <Button onClick={isPasswordReset ? passwordReset : writeToDatabase} class='submit'>
                    {isPasswordReset ? "Recuperar contraseña" : "Ingresar"} 
                    </Button>
                    {!isPasswordReset && 
                    <Button onClick={setPasswordReset}>Olvidaste tu contraseña?</Button>}
                    
                </Form>
                </Container>
            </div>
        </Box>
    )
}

export default LogIn