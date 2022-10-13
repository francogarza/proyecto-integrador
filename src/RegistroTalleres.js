import React from 'react';
import {db,storage} from './firebase';
import {uid} from 'uid';
import {set, ref as ref_db,onValue,update} from 'firebase/database';
import {uploadBytes, ref as ref_st,getDownloadURL} from 'firebase/storage'
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert, FormLabel} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';


///
///Se llama <RegistroTalleres/> cuando es el nuevo taller
///Se llama <RegistroTalleres  isUpdate={true} id={id}/> cuando se usa como update
///

const RegistroTalleres = (props) => {

    const location = useLocation();
    const [Descripcion, setDescripcion] = useState("");
    const [Fechas, setFechas] = useState("");
    const [Horarios, setHorarios] = useState("");
    const [ImpartidoPor, setImpartidoPor] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Prerequisitos, setPrerequisitos] = useState("");
    const [VirtualPresencial, setVirtualPresencial] = useState("presencial");
    const [InformacionConfidencial, setInformacionConfidencial] = useState("");
    const [alertActive, setAlertActive] = useState(false);
    const [id,setId] = useState("");
    const [isUpdate,setIsUpdate] = useState(false)
    const [img,setImg] = useState("");
    const [ImgUrl,setImgUrl] = useState("");


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

    const handleChangeImgUrl=(e)=>{
        setImgUrl(e.target.value);
    }

    const handleId=(e)=>{
        setId(e.target.value)
    }

    const handleIsUpdate=(e)=>{
        setIsUpdate(e.target.value)
    }

    const handleChangeImg=(e)=>{
        setImg(e.target.files[0])
    }

    function verificarDatos(){
        
        if(verificarDescripcion() && verificarImpartido() && verificarNombre() && verificarPrerequisitos() && verificarInformacionConfidencial()){
            return true
        }else{
            return false
        }
    }

    function verificarImagen(){
        if(img == null){
            return false;
        }else{
            return true;
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

    function verificarInformacionConfidencial(){
        if(InformacionConfidencial.length>0){
            return true
        }else{
            return false
        }
    }

    const writeToDatabase = () => {
        if(verificarDatos()){
            const uuid = uid()
            const imgRef = ref_st(storage,`images/${uuid + img.name}`)
            uploadBytes(imgRef,img).then(()=>{
                alert('image uploaded');
                
            }).then(() =>{
                getDownloadURL(imgRef)
                .then((url) => {
                        // `url` is the download URL for 'images/stars.jpg'
                    console.log(url);
                    if(img.name == '' || img.name==null){
                        url = null
                    }
                    const imgUrl = url;
                
                    set(ref_db(db, 'Taller/'+ uuid), {
                        Descripcion,
                        Fechas,
                        Horarios,
                        ImpartidoPor,
                        Nombre,
                        Prerequisitos,
                        VirtualPresencial,
                        InformacionConfidencial,
                        uuid,
                        imgUrl
                    });
        
                    setDescripcion("");
                    setFechas("");
                    setHorarios("");
                    setImpartidoPor("");
                    setNombre("");
                    setPrerequisitos("");
                    setVirtualPresencial("");
                    setInformacionConfidencial("");
                })
                    .catch((error) => {
                        // Handle any errors
                    });
            })

        }else{
            setAlertActive(true);
        }
        
    };

    const fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }

    const updateToDatabase = () => {
        
        if(verificarDatos()){
            
            update(ref_db(db, 'Taller/'+ id), {
                Descripcion,
                Fechas,
                Horarios,
                ImpartidoPor,
                Nombre,
                Prerequisitos,
                VirtualPresencial,
                InformacionConfidencial,
            });
            setDescripcion("");
            setFechas("");
            setHorarios("");
            setImpartidoPor("");
            setNombre("");
            setPrerequisitos("");
            setVirtualPresencial("");
            setInformacionConfidencial("");
        }else{
            setAlertActive(true);
        }
        
    };


    useEffect(() => {
        if(location.state != null){
            if(location.state.id != null){
                setId(location.state.id);
            }
            if(location.state.isUpdate != null){
                setIsUpdate(location.state.isUpdate);
            }
        }else if(props != null){
            if(props.id != null){
                setId(props.id);
            }
            if(props.isUpdate != null){
                setIsUpdate(props.isUpdate);
            }
        }

    }, [props.isUpdate,props.id])

    useEffect(() => {
        if(isUpdate){//si viene como update
            //sacar el id

            onValue(ref_db(db,'Taller/'+id),(snapshot) => {
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
        }
      }, [id,isUpdate])

    return(
        <div id='mainContainer'>
        <Container>
        {alertActive && <Alert variant='warning'>Por favor, verifique sus datos.</Alert>}
        <Form className="registroTaller">
        <Form.Label>
                Escriba el nombre del taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="NombreTaller" id="Nombre" value={Nombre} onChange={handleChangeNombre} required={true}/>
            <br/>
            <Form.Label>
                Escriba la descripción del taller.
            </Form.Label>
            <br/>
            <Form.Control as="textarea" type="textarea" placeholder="Descripción" className='description' id="Descripcion" value={Descripcion} onChange={handleChangeDescripcion} required={true}/>
            <br/>
            <Form.Label>
                Seleccione la fecha de inicio del taller.
            </Form.Label>
            <br/>
            <Form.Control type="date" id="Fechas" value={Fechas} onChange={handleChangeFechas} required={true}/>
            <br/>
            <Form.Label>
                Escriba el nombre de quien imparte el taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="NombreInstructor" id="ImpartidoPor" value={ImpartidoPor} onChange={handleChangeImpartidoPor} required={true}/>
            <br/>
            <Form.Label>
                Escriba los prerrequisitos del taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Prerrequisitos" id="Prerrequisitos" value={Prerequisitos} onChange={handleChangePrerequisitos} required={true}/>
            <br/>
            <Form.Label>
                Escriba la información confidencial del taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Información confidencial" id="InformacionConfidencial" value={InformacionConfidencial} onChange={handleChangeInformacionConfidencial} required={true}/>
            <br/>
            <Form.Label>
                Seleccione si el taller es virtual o presencial.
            </Form.Label>
            <br/>
            <input type="radio" id="Virtual" name="VirtualPresencial" value={'virtual'} onChange={handleChangeVirtualPresencial}
                   checked={VirtualPresencial == 'virtual' ? true:false}/>
            <label htmlFor="Virtual">Virtual</label>
            <input type="radio" id="Presencial" name="Presencial" value={'presencial'}
             onChange={handleChangeVirtualPresencial} checked={VirtualPresencial == 'presencial' ? true:false}/>
            <label htmlFor="Presencial">Presencial</label>
            <br/>
            <input type="file" onChange={handleChangeImg}></input>
            <br/>
            {
            <Button onClick={isUpdate ? updateToDatabase : writeToDatabase} className="registro">
                {isUpdate ? 'Actualizar Taller' : 'Registrar taller'}
            </Button>
            }

        </Form>
        </Container>
        </div>
    )
}

export default RegistroTalleres