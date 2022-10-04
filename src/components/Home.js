import {db} from '../firebase';
import {uid} from 'uid';
import {set,ref,onValue,remove,update} from 'firebase/database';
import {useState,useEffect} from "react";

export default function Home() {
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
        <div className='App'>
            <input type="text" value={todo} onChange={handleTodoChange}></input>
            {isEdit ? ( //esto es para update
                <>
                    <button onClick={handleSubmitChange}>Submit change</button>
                    <button onClick={() => setIsEdit(false)}>X</button>
                </>
            ): ( //esto para create
                    <button onClick={writeToDatabase}>Submit</button>
            )}
            {todos.map(todo => ( 
                <>
                    <h1>{todo.todo}</h1>
                    <button onClick={() => handleUpdate(todo)}>Update</button>
                    <button onClick={() => handleDelete(todo)}>Delete</button>
                </>
            ))}
        </div>
    )
}