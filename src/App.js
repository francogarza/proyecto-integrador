import React  from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set,ref,onValue,remove,update} from 'firebase/database';
import {useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TallerCard from './components/TallerCard'

function App() {
  const [todo,setTodo] = useState("");//write stuffs
  const [todos,setTodos] = useState([]);//read stuff
  const [isEdit,setIsEdit] = useState(false);
  const [tempUuid,setTempUuid] = useState("");

  const handleTodoChange=(e)=>{
    setTodo(e.target.value)
  }

  //write
  const writeToDatabase = () => {
    var uuid = uid()
    set(ref(db,'test/'+ uuid),{
      todo:todo,
      uuid:uuid
    })
    setTodo("");
  };
  //read
  useEffect(()=> {
    onValue(ref(db,'test/'),(snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if(data !== null){
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray,todo]);
        });
      }
    });
  },[]);
  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempUuid(todo.uuid);
    
  }

  const handleSubmitChange = () => {
    console.log('test/' + tempUuid);
    update(ref(db,'test/' + tempUuid),{
      todo:todo,
      uuid:tempUuid
    });

    setTodo("");
    setIsEdit(false);
  };


  //delete
  const handleDelete = (todo) => {
  remove(ref(db,'test/' + todo.uuid));
  }

  return (
    <Router>
      <Routes>
        <Route path="/card-test" element={
          <TallerCard />
        } />
      </Routes>
    </Router>
    /* /* {/* <div className='App'>
      <input type="text" value={todo} onChange={handleTodoChange}></input>
      {isEdit ? ( //esto es para update
        <>
          <button onClick={handleSubmitChange}>submit change</button>
          <button onClick={() => setIsEdit(false)}>X</button>
        </>
      ): ( //esto para create
        <button onClick={writeToDatabase}>submit</button>
      )}
      {todos.map(todo => ( 
        <>
          <h1>{todo.todo}</h1>
          <button onClick={() => handleUpdate(todo)}>update</button>
          <button onClick={() => handleDelete(todo)}>delete</button>
        </>
      ))}
    </div> }*/
  )
}

export default App