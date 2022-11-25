import React, {useContext} from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form} from 'react-bootstrap'
import { UserContext } from './UserContext';
import Box from '@mui/material/Box';

const LogIn = () => {

    //variables globales
    const {setIsLoggedIn} = useContext(UserContext);
    const {setParentId} = useContext(UserContext);
    const {setEsAdmin} = useContext(UserContext);

    //variables locales
    const [Mail, setMail] = useState("");
    const [Password,setPassword] = useState("");
    const [isPasswordReset,setIsPasswordReset] = useState(false);
    let navigate = useNavigate();

    //funcion para actualizar el valor de mail
    const handleChangeMail=(e)=>{
        setMail(e.target.value)
    }

    //funcion para actualizar el valor de password
    const HandlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }

    //funcion para hacer login
    const writeToDatabase = () => {
        if(checkAdmin()){
            setEsAdmin(true);
            console.log('es admin')
            navigate('/catalogo-talleres')
        }else{
            const auth = getAuth();//aqui se usa la funcionalidad de firebase auth para crear el usuario y regresar un UID que el objeto de padre pueda usar
            signInWithEmailAndPassword(auth,Mail,Password)
            .then((userCredential) =>{
                console.log(userCredential.user.uid)
                setIsLoggedIn(true);
                setParentId(userCredential.user.uid)
                navigate('/manage-children') //una vez ingresado se manda a la pagina de /manage-children 
            })
            .catch((error) =>{ //en caso de que encuentra un error
                if(error.code==='auth/user-not-found'){
                    alert('El correo que ingresó no está registrado. Por favor verifique que su correo está bien escrito o, si no ha creado una cuenta, por favor diríjase a la página de crear cuenta nueva.')
                }
                
            })
        }
    };
    
    //esta funcion cambia la variable de password reset para poder entrar en el workflow de password reset
    const setPasswordReset=(e)=>{
        setIsPasswordReset(true);
    }

    //esta funcion hace la funcionalidad de recuperacion de la contrasena, se usa la funcionalidad de firebase auth
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

    //esta funcion guarda las credenciales del administrador por el momento son user:admin password:csoftmty2022
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
                <p> Si tiene dudas, puede contactar al correo: <a href="mailto:axtateen@csoftmty.org">axtateen@csoftmty.org</a> o al correo: <a href="mailto:capitalhumano@csoftmty.org">capitalhumano@csoftmty.org</a></p>
            </div>
        </Box>
    )
}

export default LogIn