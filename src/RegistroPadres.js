import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref} from 'firebase/database';
import {useState} from "react";

const RegistroPadres = () => {
  
  const [todoNombre, setTodoNombre] = useState("");
  const [todoMail, setTodoMail] = useState("");
  const [todoCelular, setTodoCelular] = useState("");

  const handleTodoChangeNombre=(e)=>{
    setTodoNombre(e.target.value)
  }

  const handleTodoChangeMail=(e)=>{
    setTodoMail(e.target.value)
  }

  const handleTodoChangeCelular=(e)=>{
    setTodoCelular(e.target.value)
  }

  const writeToDatabase = () => {
    const uuid = uid()
    set(ref(db,'Padre/' + uuid), {
      todoNombre,
      todoMail,
      todoCelular,
      uuid,
    });
    setTodoNombre("");
    setTodoMail("");
    setTodoCelular("");
  };

  return(
    <form classname="registroPadres">
      <label>
        Escriba su nombre completo.
      </label>
      <br/>
      <input type="text" placeholder="Nombre" id="Nombre" value={todoNombre} onChange={handleTodoChangeNombre}/>
      <br/>
      <br/>
      <label>
        Escriba su correo electrónico.
      </label>
      <br/>
      <input type="text" placeholder="Correo" id="Mail" value={todoMail} onChange={handleTodoChangeMail}/>
      <br/>
      <br/>
      <label>
        Escriba su número de teléfono.
      </label>
      <br/>
      <input type="text" placeholder="Teléfono" id="Celular" value={todoCelular} onChange={handleTodoChangeCelular}/>
      <br/>
      <br/>
      <button onClick={writeToDatabase} class="registro" type="submit">
        Registrarse
      </button>
    </form>
  )
}

export default RegistroPadres