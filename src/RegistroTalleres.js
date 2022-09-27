import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref,onValue,update} from 'firebase/database';
import {useState,useEffect} from "react";


///
///Se llama <RegistroTalleres/> cuando es el nuevo taller
///Se llama <RegistroTalleres  isUpdate={true} id={id}/> cuando se usa como update
///

const RegistroTalleres = (props) => {

    const [Descripcion, setDescripcion] = useState("");
    const [Fechas, setFechas] = useState("");
    const [Horarios, setHorarios] = useState("");
    const [ImpartidoPor, setImpartidoPor] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Prerequisitos, setPrerequisitos] = useState("");
    const [VirtualPresencial, setVirtualPresencial] = useState("");


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

    const writeToDatabase = () => {
        const uuid = uid()

        set(ref(db, 'Taller/patotest/'+ uuid), {
            Descripcion,
            Fechas,
            Horarios,
            ImpartidoPor,
            Nombre,
            Prerequisitos,
            VirtualPresencial,
        });
        setDescripcion("");
        setFechas("");
        setHorarios("");
        setImpartidoPor("");
        setNombre("");
        setPrerequisitos("");
        setVirtualPresencial("");
    };

    const updateToDatabase = () => {
        const id = props.id

        update(ref(db, 'Taller/patotest/'+ id), {
            Descripcion,
            Fechas,
            Horarios,
            ImpartidoPor,
            Nombre,
            Prerequisitos,
            VirtualPresencial,
        });
        setDescripcion("");
        setFechas("");
        setHorarios("");
        setImpartidoPor("");
        setNombre("");
        setPrerequisitos("");
        setVirtualPresencial("");
    };


    useEffect(() => {
        if(props.isUpdate){//si viene como update

            //sacar el id
            const id = props.id

            onValue(ref(db,'Taller/patotest/'+id),(snapshot) => {
                const data = snapshot.val();
                if(data !== null){
                    setDescripcion(data.Descripcion)
                    setFechas(data.Fechas)
                    setHorarios(data.Horarios)
                    setImpartidoPor(data.ImpartidoPor)
                    setNombre(data.Nombre)
                    setPrerequisitos(data.Prerequisitos)
                    setVirtualPresencial(data.VirtualPresencial)
                }
              });

        }
      }, [props.id,props.isUpdate])

    return(
        <form classname="registroTaller">
            <label>
                Escriba la descripcion del taller.
            </label>
            <br/>
            <input type="text" placeholder="Descripcion" id="Descripcion" value={Descripcion} onChange={handleChangeDescripcion} required="true"/>
            <br/>
            <br/>
            <label>
                Seleccione la fecha de inicio del Taller.
            </label>
            <br/>
            <input type="date" id="Fechas" value={Fechas} onChange={handleChangeFechas} required="true"/>
            <br/>
            <br/>
            <label>
                Escribe el nombre de quien imparte el taller.
            </label>
            <br/>
            <input type="text" placeholder="Nombre" id="ImpartidoPor" value={ImpartidoPor} onChange={handleChangeImpartidoPor} required="true"/>
            <br/>
            <br/>
            <label>
                Escriba el nombre del Taller.
            </label>
            <br/>
            <input type="text" placeholder="Nombre" id="Nombre" value={Nombre} onChange={handleChangeNombre} required="true"/>
            <br/>
            <br/>
            <label>
                Esriba los prerequisitos del taller.
            </label>
            <br/>
            <input type="text" placeholder="" id="Prerequisitos" value={Prerequisitos} onChange={handleChangePrerequisitos} required="true"/>
            <br/>
            <br/>
            <label>
                Seleccione si el taller es virtual o presencial.
            </label>
            <br/>
            <input type="radio" id="Virtual" name="VirtualPresencial" value={VirtualPresencial} onChange={handleChangeVirtualPresencial}
                   checked="true"/>
            <label htmlFor="Virtual">Virtual</label>
            <input type="radio" id="Presencial" name="Presencial" value={VirtualPresencial} onChange={handleChangeVirtualPresencial}/>
            <label htmlFor="Presencial">Presencial</label>
            <br/>
            <br/>
            <button onClick={props.isUpdate ? updateToDatabase : writeToDatabase} class="registro" type="submit">
                {props.isUpdate ? 'Actualizar Taller' : 'Registrar Taller'}
            </button>
        </form>
    )
}

export default RegistroTalleres