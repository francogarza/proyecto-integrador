import React, {useContext} from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref,onValue,update} from 'firebase/database';
import {useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import TallerCard from './components/TallerCard.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert, FormLabel} from 'react-bootstrap'
import { UserContext } from './UserContext';
import Box from '@mui/material/Box';

const TalleresInscritos = (props) => {

    //global
    const {userId, setUserId} = useContext(UserContext);
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    //local
    const [talleres,setTalleres] = useState([]);
    const [realTalleres,setRealTalleres] = useState([]);

    useEffect(() => {
        onValue(ref(db,'Participante/'+userId+'/talleres/'),(snapshot) => {
            setTalleres([]);
            const data = snapshot.val();
            if(data !== null){
                Object.values(data).map((e) => {
                    setTalleres((oldArray) => [...oldArray,e])
                });
            }
        });
    }, [userId,isLoggedIn])


  return(
    <Box
        component="main"
        sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
    >
        <div>
        {/* {isLoggedIn?<p>logged in</p> : <p>logged out</p>}
        {isLoggedIn && <h1>{userId}</h1>} */}
        <div style={{padding: "50px", textAlign: "center", background: "#F95828", color: "#fdfffc", fontSize: "30px"}}>
            <h1> Talleres inscritos </h1>
        </div>
        <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
        {talleres.map(taller => (
                    <div style={{display: "inline-block"}} key={taller.id}>
                        <TallerCard EsAdmin={false} id={taller.id} EstaInscrito={true} Nombre={taller.Nombre} Descripcion={taller.Descripcion} imgUrl={taller.imgUrl}/>
                    </div>
                ))}
        </div>
        </div>

        <div style={{padding: "50px", textAlign: "center", color: "gray", fontSize: "18px"}}>
            <p> Si tiene dudas puede contactar al correo: <a href="mailto:axtateen@csoftmty.org">axtateen@csoftmty.org</a> o al correo: <a href="mailto:capitalhumano@csoftmty.org">capitalhumano@csoftmty.org</a></p>
        </div>
    </Box>
  )
}

export default TalleresInscritos