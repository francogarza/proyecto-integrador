import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref,onValue,update} from 'firebase/database';
import {useState,useEffect} from "react";

const DetalleTaller = (props) => {
    const [Descripcion, setDescripcion] = useState("");
    const [Fechas, setFechas] = useState("");
    const [Horarios, setHorarios] = useState("");
    const [ImpartidoPor, setImpartidoPor] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Prerequisitos, setPrerequisitos] = useState("");
    const [VirtualPresencial, setVirtualPresencial] = useState("");
    const [InformacionConfidencial, setInformacionConfidencial] = useState("");
    
    useEffect(() => {
            //sacar el id
            const id = props.id

            onValue(ref(db,'Taller/'+id),(snapshot) => {
                const data = snapshot.val();
                if(data !== null){
                    setDescripcion(data.Descripcion)
                    setFechas(data.Fechas)
                    setHorarios(data.Horarios)
                    setImpartidoPor(data.ImpartidoPor)
                    setNombre(data.Nombre)
                    setPrerequisitos(data.Prerequisitos)
                    setVirtualPresencial(data.VirtualPresencial)
                    setInformacionConfidencial(data.InformacionConfidencial)
                }
              });
      }, [props.id])


      const handleChangeDescripcion=(e)=>{
        setDescripcion(e.target.value)
    }

    const handleChangeFechas=(e)=>{
        setFechas(e.target.value)
    }

    const handleChangeHorarios=(e)=>{
        setHorarios(e.target.value)
    }

    const handleChangeImpartidoPor=(e)=>{
        setImpartidoPor(e.target.value)
    }

    const handleChangeNombre=(e)=>{
        setNombre(e.target.value)
    }

    const handleChangePrerequisitos=(e)=>{
        setPrerequisitos(e.target.value)
    }
    const handleChangeVirtualPresencial=(e)=>{
        setVirtualPresencial(e.target.value)
    }

    const handleChangeInformacionConfidencial=(e)=>{
        setInformacionConfidencial(e.target.value)
    }

  return(
    <div>
        <div style={{padding: "50px", textAlign: "center", background: "#864fba", color: "#fdfffc", fontSize: "30px"}}>
        </div>
        <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            <h1>{Nombre}</h1>
            <h5>Impartido por:</h5>
            <h4>{ImpartidoPor}</h4>
        </div>
        <div style={{backgroundColor : "gray",padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            <h3>Descripción:</h3>
            <p>{Descripcion}</p>
        </div>

        <div style={{backgroundColor : "gray",padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            <h3>Prerrequisitos:</h3>
            <p>{Prerequisitos}</p>
        </div>

        <div style={{backgroundColor : "gray",padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            <h3>¿Virtual o presencial?</h3>
            <p>{VirtualPresencial}</p>
        </div>

        <div style={{backgroundColor : "gray",padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            {/*
            aqui va la parte de la informacion secreta, primero hay que hacer la variable InfoSecreta en registro talleres (el del admin) para que se guarde en firebase, luega se hace aqui un condicional para mostrar la informacion secreta si el usuario esta inscrito (por ahora pasa eso como un prop tipo <DetalleTaller EstaInscrito={true}/>)

            asi se ponen los ifs aqui
            <p>{props.EstaInscrito ? {InformacionSecreta} : "para ver esta informacion primero inscriba el taller"}</p>
            */}
            <h3>Información secreta:</h3>
            <p>{props.EstaInscrito ? {InformacionConfidencial} : "Para poder ver esta información, primero inscríbase al taller."}</p>
            
        </div>
    </div>
  )
}

export default DetalleTaller