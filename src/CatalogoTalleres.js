import React, { useContext } from 'react';
import {db} from './firebase';
import {ref as ref_db,onValue} from 'firebase/database';
import {useState,useEffect} from "react";
import TallerCard from './components/TallerCard.js';
import { UserContext } from './UserContext';
import Box from '@mui/material/Box';

const CatalogoTalleres = (props) => {
    
    //variables globales
    const {userId,setUserId} = useContext(UserContext);
    const {EsAdmin,setEsAdmin} = useContext(UserContext)
    //variables globales
    const [talleres,setTalleres] = useState([])

    //la funcion se corre cuando se nota userId, verifica si el usuario esta inscrito en los talleres
    useEffect(() => {
            onValue(ref_db(db,'Taller/'),(snapshot) => {
                setTalleres([]);
                const data = snapshot.val();
                if(data !== null){
                    //console.log(data);
                    Object.values(data).map((e) => {
                        if(e.participantes != null){
                            if(userId in e.participantes){
                                e.EstaInscrito=true
                            }else{
                                e.EstaInscrito=false
                            }
                        }else{
                            e.EstaInscrito=false
                        }
                        setTalleres((oldArray) => [...oldArray,e])
                    });
                }
            });
      }, [userId])

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
            <div style={{padding: "50px", textAlign: "center", background: "#F95828", color: "#fdfffc", fontSize: "30px"}}>
                <h1> Catálogo de talleres </h1>
                <p> Talleres disponibles </p>
            </div>
            <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
                {talleres.map((taller) => (
                    <div style={{display: "inline-block"}} key={taller.uuid}>
                        {EsAdmin ? (<TallerCard EsAdmin={true} key={taller.uuid} id={taller.uuid} Nombre={taller.Nombre} Descripcion={taller.Descripcion} imgUrl={taller.imgUrl}></TallerCard>) : <TallerCard key={taller.uuid} EsAdmin={false} EstaInscrito={taller.EstaInscrito} id={taller.uuid} Nombre={taller.Nombre} Descripcion={taller.Descripcion} imgUrl={taller.imgUrl}></TallerCard>}
                    </div>
                ))}
            </div>
            <div style={{padding: "50px", textAlign: "center", color: "gray", fontSize: "18px"}}>
                <p> Si tiene dudas puede contactar al correo: axtateen@csoftmty.org </p>
                <p> o al correo: capitalhumano@csoftmty.org </p>
            </div>
        </div>
    </Box>
  )
}

export default CatalogoTalleres