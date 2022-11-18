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
                if(error.code==='auth/user-not-found'){
                    alert('el correo que ingreso no esta registrado, porfavor verifique que su correo esta bien escrito o si no ha creado una cuenta porfavor dirigase a la pagina de Nueva cuenta')
                }
                
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
            alert('Se mando un correo a su cuenta de email para re-establecer su contraseña, si no encuentra el mail porfavor verificar su carpeta de spam')
        })
        .catch((error) => {
            console.log(error.code)
            if(error.code==='auth/user-not-found'){
                alert('La cuenta que se esta tratando de recuperar no se encuentra registrada, porfavor verifique su correo o considere registrar una cuenta en Nueva cuenta')
            }
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
                {alertActive && <Alert variant='warning'>porfavor verifique sus datos</Alert>}
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
                    <Button onClick={setPasswordReset}>olvidaste tu contraseña?</Button>}
                    
                </Form>
                </Container>
            </div>
        </Box>
    )
}

export default LogIn