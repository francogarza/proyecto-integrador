import React, { useContext } from 'react';
import {db,storage} from './firebase';
import {uid} from 'uid';
import {set, ref as ref_db,onValue,update} from 'firebase/database';
import { getDownloadURL, ref as ref_st } from 'firebase/storage';
import {useState,useEffect} from "react";
import TallerCard from './components/TallerCard.js';
import { UserContext } from './UserContext';

const CatalogoTalleres = (props) => {
    
    //global
    const {userId, setUserId} = useContext(UserContext);
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    //local
    const [talleres,setTalleres] = useState([])
    const [talleresInscritos,setTalleresInscritos] = useState([])

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
    <div>
        {/* {isLoggedIn?<p>logged in</p> : <p>logged out</p>}
        {isLoggedIn && <h1>{userId}</h1>} */}
        <div style={{padding: "50px", textAlign: "center", background: "#F95828", color: "#fdfffc", fontSize: "30px"}}>
            <h1> Catálogo de talleres </h1>
            <p> Talleres disponibles </p>
        </div>
        <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            {talleres.map((taller) => (
                <div style={{display: "inline-block"}} key={taller.uuid}>
                    {props.EsAdmin ? (<TallerCard EsAdmin={true} key={taller.uuid} id={taller.uuid} Nombre={taller.Nombre} Descripcion={taller.Descripcion} imgUrl={taller.imgUrl}></TallerCard>) : <TallerCard key={taller.uuid} EsAdmin={false} EstaInscrito={taller.EstaInscrito} id={taller.uuid} Nombre={taller.Nombre} Descripcion={taller.Descripcion} imgUrl={taller.imgUrl}></TallerCard>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default CatalogoTalleres