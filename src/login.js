import React, {useContext} from 'react';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {uid} from 'uid';
import {set, ref} from 'firebase/database';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'
import { UserContext } from './UserContext';

const LogIn = () => {

//global
      
const {userId, setUserId} = useContext(UserContext);
const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);

const [Mail, setMail] = useState("");
const [Password,setPassword] = useState("");
const [alertActive, setAlertActive] = useState(false);


const handleChangeMail=(e)=>{
    setMail(e.target.value)
}

const HandlePasswordChange=(e)=>{
    setPassword(e.target.value)
}

const writeToDatabase = () => {

const auth = getAuth();

signInWithEmailAndPassword(auth,Mail,Password)
.then((userCredential) =>{
    console.log(userCredential.user.uid)
    setIsLoggedIn(true);
    //hay que poner al padre
    //setUserId(userCredential.user.uid);
})
.catch((error) =>{
    console.log(error);
})

};



return(
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
    <Form.Group>
        <Form.Label>
        Escriba su contraseña.
        </Form.Label>
        <br/>
        <Form.Control type="password" placeholder="password" id="Password" value={Password} onChange={HandlePasswordChange}/>
    </Form.Group>
    <br/>
        <Button onClick={writeToDatabase} class='submit'>
        Ingresar
        </Button>
    
    </Form>
    </Container>
</div>
)
}

export default LogIn