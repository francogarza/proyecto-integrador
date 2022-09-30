import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref,onValue,update} from 'firebase/database';
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'


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
    const [alertActive, setAlertActive] = useState(false);


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

    function verificarDatos(){
        
        if(verificarDescripcion() && verificarImpartido() && verificarNombre() && verificarPrerequisitos()){
            return true
        }else{
            return false
        }
    }

    function verificarDescripcion(){
        if(Descripcion.length>0){
            return true
        }else{
            return false
        }
    }

    function verificarImpartido(){
        if(ImpartidoPor.length>0){
            return true
        }else{
            return false
        }
    }

    function verificarNombre(){
        if(Nombre.length>0){
            return true
        }else{
            return false
        }
    }

    function verificarPrerequisitos(){
        if(Prerequisitos.length>0){
            return true
        }else{
            return false
        }
    }

    const writeToDatabase = () => {
        if(verificarDatos()){
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
        }else{
            setAlertActive(true);
        }
        
    };

    const updateToDatabase = () => {
        if(verificarDatos()){
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
        }else{
            setAlertActive(true);
        }
        
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
        <Container>
        {alertActive && <Alert variant='warning'>porfavor verifique sus datos</Alert>}
        <Form className="registroTaller">
            <Form.Label>
                Escriba la descripcion del taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Descripcion" id="Descripcion" value={Descripcion} onChange={handleChangeDescripcion} required="true"/>
            <br/>
            <Form.Label>
                Seleccione la fecha de inicio del Taller.
            </Form.Label>
            <br/>
            <Form.Control type="date" id="Fechas" value={Fechas} onChange={handleChangeFechas} required="true"/>
            <br/>
            <Form.Label>
                Escribe el nombre de quien imparte el taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Nombre" id="ImpartidoPor" value={ImpartidoPor} onChange={handleChangeImpartidoPor} required="true"/>
            <br/>
            <Form.Label>
                Escriba el nombre del Taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Nombre" id="Nombre" value={Nombre} onChange={handleChangeNombre} required="true"/>
            <br/>
            <Form.Label>
                Escriba los prerequisitos del taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="" id="Prerequisitos" value={Prerequisitos} onChange={handleChangePrerequisitos} required="true"/>
            <br/>
            <Form.Label>
                Seleccione si el taller es virtual o presencial.
            </Form.Label>
            <br/>
            <input type="radio" id="Virtual" name="VirtualPresencial" value={VirtualPresencial} onChange={handleChangeVirtualPresencial}
                   checked="true"/>
            <label htmlFor="Virtual">Virtual</label>
            <input type="radio" id="Presencial" name="Presencial" value={VirtualPresencial} onChange={handleChangeVirtualPresencial}/>
            <label htmlFor="Presencial">Presencial</label>
            <br/>
            <Button onClick={props.isUpdate ? updateToDatabase : writeToDatabase} class="registro" type="submit" style={{backgroundColor:"#864FBA"}}>
                {props.isUpdate ? 'Actualizar Taller' : 'Registrar Taller'}
            </Button>
        </Form>
        </Container>
    )
}

export default RegistroTalleres