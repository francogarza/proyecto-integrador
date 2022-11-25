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
                    alert('El correo que ingresó no está registrado. Por favor verifique que su correo está bien escrito o, si no ha creado una cuenta, por favor diríjase a la página de crear cuenta nueva.')
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
            alert('Se mandó un correo a su dirección electrónica para restablecer su contraseña. Si no encuentra el correo, favor de verificarlo en su carpeta de correo no deseado.')
        })
        .catch((error) => {
            console.log(error.code)
            if(error.code==='auth/user-not-found'){
                alert('La cuenta que se está tratando de recuperar no se encuentra registrada. Por favor verifique su correo o considere registrar una cuenta nueva.')
            }
        });
    }

    function checkAdmin(){
        if(Mail==="admin" && Password==="csoftmty2022"){
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
                {alertActive && <Alert variant='warning'>Por favor verifique sus datos.</Alert>}
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
                <Form.Control type="password" placeholder="Contraseña" id="Password" value={Password} onChange={HandlePasswordChange}/>
                </Form.Group>
                }
                
                <br/>
                    <Button onClick={isPasswordReset ? passwordReset : writeToDatabase} class='submit'>
                    {isPasswordReset ? "Recuperar contraseña" : "Ingresar"} 
                    </Button>
                    {!isPasswordReset && 
                    <Button onClick={setPasswordReset}>¿Olvidó su contraseña?</Button>}
                    
                </Form>
                </Container>
            </div>

            <div style={{padding: "50px", textAlign: "center", color: "gray", fontSize: "18px"}}>
                <p> Si tiene dudas, puede contactar al correo: axtateen@csoftmty.org </p>
                <p> o al correo: capitalhumano@csoftmty.org </p>
            </div>
        </Box>
    )
}

export default LogIn