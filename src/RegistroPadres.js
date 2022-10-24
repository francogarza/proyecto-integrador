import React from 'react';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import {uid} from 'uid';
import {set, ref} from 'firebase/database';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'

const RegistroPadres = () => {
  
  const [Nombre, setNombre] = useState("");
  const [Mail, setMail] = useState("");
  const [Password,setPassword] = useState("");
  const [Password2,setPassword2] = useState("");
  const [Celular, setCelular] = useState("");
  const [alertActive, setAlertActive] = useState(false);


  const handleChangeNombre=(e)=>{
    setNombre(e.target.value)
  }

  const handleChangeMail=(e)=>{
    setMail(e.target.value)
  }

  const HandlePasswordChange=(e)=>{
    setPassword(e.target.value)
  }

  const HandlePassword2Change=(e)=>{
    setPassword2(e.target.value)
  }


  const handleChangeCelular=(e)=>{
    setCelular(e.target.value)
  }

  function validaMail(mail){
    return /\S+@\S+\.\S+/.test(mail);
  }

  function validaCelular(celular){
    return !isNaN(parseInt(celular))
  }

  function verificarDatos(){
    if(validaMail(Mail) && Nombre.length>0 && validaCelular(Celular) && validarPassword()){
      return true
    }else{
      return false
    }
  }

  function validarPassword(){
    if(Password===""){
      return false
    }else if(Password === Password2){
      return true
    }
    return false
  }

  const writeToDatabase = () => {

    if(verificarDatos()){

          //prueba crear usuario
      const auth = getAuth();

      createUserWithEmailAndPassword(auth,Mail,Password)
      .then((userCredential) => {
        console.log(userCredential);
        const uuid = userCredential.user.uid
        const hijos = [""]
        set(ref(db,'Padre/' + uuid), {
          Nombre,
          Mail,
          Celular,
          hijos,
          uuid,
        });
        setNombre("");
        setMail("");
        setCelular("");
      })
      .catch((error)=>{
        console.log(error);
      })
      }else{
      setAlertActive(true);
      
    }
    
  };



  return(
    <div id="mainContainer">
      <Container>
      {alertActive && <Alert variant='warning'>porfavor verifique sus datos</Alert>}
      <Form className="registroPadres">
        <Form.Group>
          <Form.Label>
            Escriba su nombre completo.
          </Form.Label>
          <br/>
          <Form.Control type="text" placeholder="Nombre" id="Nombre" value={Nombre} onChange={handleChangeNombre}/>
        </Form.Group>
        <br/>
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
        <Form.Group>
          <Form.Label>
            Por favor confirme su contraseña
          </Form.Label>
          <br/>
          <Form.Control type="password" placeholder="password" id="Password2" value={Password2} onChange={HandlePassword2Change}/>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>
            Escriba su número de teléfono.
          </Form.Label>
          <br/>
          <Form.Control type="number" placeholder="Teléfono" id="Celular" value={Celular} onChange={handleChangeCelular}/>
        </Form.Group>
        <br/>
          <Button onClick={writeToDatabase} class='submit'>
            Registrarse
          </Button>
        
      </Form>
      </Container>
    </div>
  )
}

export default RegistroPadres