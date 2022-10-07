import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref,onValue,update} from 'firebase/database';
import {useState,useEffect} from "react";
import TallerCard from './components/TallerCard.js';

const CatalogoTalleres = (props) => {
    

    const [talleres,setTalleres] = useState([])

    useEffect(() => {

            onValue(ref(db,'Taller/'),(snapshot) => {
                setTalleres([]);
                const data = snapshot.val();
                if(data !== null){
                    //console.log(data);
                    Object.values(data).map((e) => {
                        setTalleres((oldArray) => [...oldArray,e])
                    });
                }
              });
      }, [])

  return(
    <div>
        <div style={{padding: "50px", textAlign: "center", background: "#864fba", color: "#fdfffc", fontSize: "30px"}}>
            <h1> Catálogo de talleres </h1>
            <p> Talleres disponibles </p>
        </div>
        <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            {talleres.map(taller => (
                <div style={{display: "inline-block"}} key={taller.uuid}>
                    {props.EsAdmin ? (<TallerCard EsAdmin={true} id={taller.uuid} Nombre={taller.Nombre} Descripcion={taller.Descripcion}></TallerCard>) : <TallerCard EsAdmin={false} id={taller.uuid} Nombre={taller.Nombre} Descripcion={taller.Descripcion}></TallerCard>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default CatalogoTalleres