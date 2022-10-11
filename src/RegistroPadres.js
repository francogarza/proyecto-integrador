import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref} from 'firebase/database';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'

const RegistroPadres = () => {
  
  const [todoNombre, setTodoNombre] = useState("");
  const [todoMail, setTodoMail] = useState("");
  const [todoCelular, setTodoCelular] = useState("");
  const [alertActive, setAlertActive] = useState(false);


  const handleTodoChangeNombre=(e)=>{
    setTodoNombre(e.target.value)
  }

  const handleTodoChangeMail=(e)=>{
    setTodoMail(e.target.value)
  }



  const handleTodoChangeCelular=(e)=>{
    setTodoCelular(e.target.value)
  }

  function validaMail(mail){
    return /\S+@\S+\.\S+/.test(mail);
  }

  function validaCelular(celular){
    return !isNaN(parseInt(celular))
  }

  function verificarDatos(){
    if(validaMail(todoMail) && todoNombre.length>0 && validaCelular(todoCelular)){
      return true
    }else{
      return false
    }
  }

  const writeToDatabase = () => {
    if(verificarDatos()){
      const uuid = uid()
      const hijos = [""]
      set(ref(db,'Padre/' + uuid), {
        todoNombre,
        todoMail,
        todoCelular,
        hijos,
        uuid,
      });
      setTodoNombre("");
      setTodoMail("");
      setTodoCelular("");
    }else{
      console.log("wow");
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
          <Form.Control type="text" placeholder="Nombre" id="Nombre" value={todoNombre} onChange={handleTodoChangeNombre}/>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>
            Escriba su correo electrónico.
          </Form.Label>
          <br/>
          <Form.Control type="text" placeholder="Correo" id="Mail" value={todoMail} onChange={handleTodoChangeMail}/>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Label>
            Escriba su número de teléfono.
          </Form.Label>
          <br/>
          <Form.Control type="number" placeholder="Teléfono" id="Celular" value={todoCelular} onChange={handleTodoChangeCelular}/>
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