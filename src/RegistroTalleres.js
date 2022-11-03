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
import TimePicker from 'react-time-picker';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { TimePickerView } from '@material-ui/pickers';
import { DateTimePicker } from '@mui/lab';



///
///Se llama <RegistroTalleres/> cuando es el nuevo taller
///Se llama <RegistroTalleres  isUpdate={true} id={id}/> cuando se usa como update
///

const RegistroTalleres = (props) => {

    const location = useLocation();
    const [Descripcion, setDescripcion] = useState("");
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
    const [maxCap,setMaxCap] = useState("");
    const [isCapped,setIsCapped] = useState("false");
    const [FechaInicio, setFechaInicio] = useState("");
    const [FechaFin,setFechaFin] = useState("");
    const [lunesI,setLunesI] = useState("");
    const [lunesF,setLunesF] = useState("");
    const [martesI,setMartesI] = useState("");
    const [martesF,setMartesF] = useState("");
    const [miercolesI,setMiercolesI] = useState("");
    const [miercolesF,setMiercolesF] = useState("");
    const [juevesI,setJuevesI] = useState("");
    const [juevesF,setJuevesF] = useState("");
    const [viernesI,setViernesI] = useState("");
    const [viernesF,setViernesF] = useState("");
    const [sabadoI,setSabadoI] = useState("");
    const [sabadoF,setSabadoF] = useState("");
    const [domingoI,setDomingoI] = useState("");
    const [domingoF,setDomingoF] = useState("");


    const handleChangeLunesI=(e)=>{
        setLunesI(e.target.value)
    }

    const handleChangeLunesF=(e)=>{
        setLunesF(e.target.value)
    }

    const handleChangeMartesI=(e)=>{
        setMartesI(e.target.value)
    }

    const handleChangeMartesF=(e)=>{
        setMartesF(e.target.value)
    }

    const handleChangeMiercolesI=(e)=>{
        setMiercolesI(e.target.value)
    }

    const handleChangeMiercolesF=(e)=>{
        setMiercolesF(e.target.value)
    }

    const handleChangeJuevesI=(e)=>{
        setJuevesI(e.target.value)
    }

    const handleChangeJuevesF=(e)=>{
        setJuevesF(e.target.value)
    }

    const handleChangeViernesI=(e)=>{
        setViernesI(e.target.value)
    }

    const handleChangeViernesF=(e)=>{
        setViernesF(e.target.value)
    }

    const handleChangeSabadoI=(e)=>{
        setSabadoI(e.target.value)
    }

    const handleChangeSabadoF=(e)=>{
        setSabadoF(e.target.value)
    }

    const handleChangeDomingoI=(e)=>{
        setDomingoI(e.target.value)
    }

    const handleChangeDomingoF=(e)=>{
        setDomingoF(e.target.value)
    }

    const handleChangeIsCapped=(e)=>{
        setIsCapped(e.target.value)
    }

    const handleChangeMaxCap=(e)=>{
        setMaxCap(e.target.value)
    }

    const handleChangeDescripcion=(e)=>{
        setDescripcion(e.target.value)
    }

    const handleChangeFechaInicio=(e)=>{
        setFechaInicio(e.target.value)
    }

    const handleChangeFechaFin=(e)=>{
        setFechaFin(e.target.value)
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
                
            }).then(() =>{
                getDownloadURL(imgRef)
                .then((url) => {
                        // `url` is the download URL for 'images/stars.jpg'
                    console.log(url);
                    if(img.name === '' || img.name==null){
                        url = null
                    }
                    const imgUrl = url;
                
                    set(ref_db(db, 'Taller/'+ uuid), {
                        Descripcion,
                        FechaInicio,
                        FechaFin,
                        Horarios,
                        ImpartidoPor,
                        Nombre,
                        Prerequisitos,
                        VirtualPresencial,
                        InformacionConfidencial,
                        uuid,
                        imgUrl,
                        maxCap,
                        isCapped,
                        lunesI,
                        lunesF,
                        martesI,
                        martesF,
                        miercolesI,
                        miercolesF,
                        juevesI,
                        juevesF,
                        viernesI,
                        viernesF,
                        sabadoI,
                        sabadoF,
                        domingoI,
                        domingoF,
                    });
        
                    setDescripcion("");
                    setFechaInicio("");
                    setFechaFin("");
                    setHorarios("");
                    setImpartidoPor("");
                    setNombre("");
                    setPrerequisitos("");
                    setVirtualPresencial("");
                    setInformacionConfidencial("");
                    setMaxCap("")
                    setLunesI("");
                    setLunesF("");
                    setMartesI("");
                    setMartesF("");
                    setMiercolesI("");
                    setMiercolesF("");
                    setJuevesI("");
                    setJuevesF("")
                    setViernesI("");
                    setViernesF("");
                    setSabadoI("");
                    setSabadoF("");
                    setDomingoI("");
                    setDomingoF("");
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
                FechaInicio,
                FechaFin,
                Horarios,
                ImpartidoPor,
                Nombre,
                Prerequisitos,
                VirtualPresencial,
                InformacionConfidencial,
                maxCap,
                isCapped,
                lunesI,
                lunesF,
                martesI,
                martesF,
                miercolesI,
                miercolesF,
                juevesI,
                juevesF,
                viernesI,
                viernesF,
                sabadoI,
                sabadoF,
                domingoI,
                domingoF,
            });
            setDescripcion("");
            setFechaInicio("");
            setFechaFin("");
            setHorarios("");
            setImpartidoPor("");
            setNombre("");
            setPrerequisitos("");
            setVirtualPresencial("");
            setInformacionConfidencial("");
            setMaxCap("");
            setLunesI("");
            setLunesF("");
            setMartesI("");
            setMartesF("");
            setMiercolesI("");
            setMiercolesF("");
            setJuevesI("");
            setJuevesF("")
            setViernesI("");
            setViernesF("");
            setSabadoI("");
            setSabadoF("");
            setDomingoI("");
            setDomingoF("");
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
                    setFechaInicio(data.FechaInicio)
                    setFechaFin(data.FechaFin)
                    setHorarios(data.Horarios)
                    setImpartidoPor(data.ImpartidoPor)
                    setNombre(data.Nombre)
                    setPrerequisitos(data.Prerequisitos)
                    setVirtualPresencial(data.VirtualPresencial)
                    setInformacionConfidencial(data.InformacionConfidencial)
                    setIsCapped(data.isCapped)
                    setMaxCap(data.maxCap)
                    setLunesI(data.lunesI);
                    setLunesF(data.lunesF);
                    setMartesI(data.martesI);
                    setMartesF(data.martesF);
                    setMiercolesI(data.miercolesI);
                    setMiercolesF(data.miercolesF);
                    setJuevesI(data.juevesI);
                    setJuevesF(data.juevesF)
                    setViernesI(data.viernesI);
                    setViernesF(data.viernesF);
                    setSabadoI(data.sabadoI);
                    setSabadoF(data.sabadoF);
                    setDomingoI(data.domingoI);
                    setDomingoF(data.domingoF);
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
                   checked={VirtualPresencial === 'virtual' ? true:false}/>
            <label htmlFor="Virtual">Virtual</label>
            <input type="radio" id="Presencial" name="Presencial" value={'presencial'}
             onChange={handleChangeVirtualPresencial} checked={VirtualPresencial === 'presencial' ? true:false}/>
            <label htmlFor="Presencial">Presencial</label>
            <br/>
            <Form.Label>
                Foto
            </Form.Label>
            <br/>
            <input type="file" onChange={handleChangeImg}></input>
            <br/>
            <br/>
            <Form.Label>
                Horarios
            </Form.Label>   
            <br/>
            <Form.Label>
                Seleccione la fecha de inicio del taller.
            </Form.Label>
            <br/>
            <Form.Control type="date" id="FechaInicio" value={FechaInicio} onChange={handleChangeFechaInicio} required={true}/>
            <br/>
            <Form.Label>
                Seleccione la fecha final del taller.
            </Form.Label>
            <br/>
            <Form.Control type="date" id="FechaFin" value={FechaFin} onChange={handleChangeFechaFin} required={true}/>
            <br/>
            <Form.Label>
                Lunes 
            </Form.Label>
            <br/>
            <Form.Label>
                Inicio
            </Form.Label>
            <Form.Control type="time" id="lunesI" value={lunesI} onChange={handleChangeLunesI} required={true}/>
            <Form.Label>
                Fin
            </Form.Label>
            <Form.Control type="time" id="lunesF" value={lunesF} onChange={handleChangeLunesF} required={true}/>
            <br/>

            <Form.Label>
                Martes 
            </Form.Label>
            <br/>
            <Form.Label>
                Inicio
            </Form.Label>
            <Form.Control type="time" id="lunesI" value={martesI} onChange={handleChangeMartesI} required={true}/>
            <Form.Label>
                Fin
            </Form.Label>
            <Form.Control type="time" id="martesF" value={martesF} onChange={handleChangeMartesF} required={true}/>
            <br/>

            <Form.Label>
                Miercoles
            </Form.Label>
            <br/>
            <Form.Label>
                Inicio
            </Form.Label>
            <Form.Control type="time" id="miercolesI" value={miercolesI} onChange={handleChangeMiercolesI} required={true}/>
            <Form.Label>
                Fin
            </Form.Label>
            <Form.Control type="time" id="miercolesF" value={miercolesF} onChange={handleChangeMiercolesF} required={true}/>
            <br/>

            <Form.Label>
                Jueves 
            </Form.Label>
            <br/>
            <Form.Label>
                Inicio
            </Form.Label>
            <Form.Control type="time" id="juevesI" value={juevesI} onChange={handleChangeJuevesI} required={true}/>
            <Form.Label>
                Fin
            </Form.Label>
            <Form.Control type="time" id="juevesF" value={juevesF} onChange={handleChangeJuevesF} required={true}/>
            <br/>

            <Form.Label>
                Viernes 
            </Form.Label>
            <br/>
            <Form.Label>
                Inicio
            </Form.Label>
            <Form.Control type="time" id="vierenesI" value={viernesI} onChange={handleChangeViernesI} required={true}/>
            <Form.Label>
                Fin
            </Form.Label>
            <Form.Control type="time" id="viernesF" value={viernesF} onChange={handleChangeViernesF} required={true}/>
            <br/>

            <Form.Label>
                Sabado 
            </Form.Label>
            <br/>
            <Form.Label>
                Inicio
            </Form.Label>
            <Form.Control type="time" id="sabadoI" value={sabadoI} onChange={handleChangeSabadoI} required={true}/>
            <Form.Label>
                Fin
            </Form.Label>
            <Form.Control type="time" id="sabadoF" value={sabadoF} onChange={handleChangeSabadoF} required={true}/>
            <br/>

            <Form.Label>
                Domingo 
            </Form.Label>
            <br/>
            <Form.Label>
                Inicio
            </Form.Label>
            <Form.Control type="time" id="domingoI" value={domingoI} onChange={handleChangeDomingoI} required={true}/>
            <Form.Label>
                Fin
            </Form.Label>
            <Form.Control type="time" id="domingoF" value={domingoF} onChange={handleChangeDomingoF} required={true}/>
            <br/>

            <Form.Label>
                Cupo maximo
            </Form.Label>
            <br/>
            <Form.Control type="number" placeholder="Capacidad maxima" id="maxCap" value={maxCap} onChange={handleChangeMaxCap} required={true}/>
            <br/>
            <Form.Label>
                Bloquear inscripciones
            </Form.Label>
            <br/>
            <input type="radio" id="Capped" name="Capped" value={'true'} onChange={handleChangeIsCapped}
                   checked={isCapped === 'true' ? true:false}/>
            <label htmlFor="Capped">Bloqueado</label>
            <input type="radio" id="NoCapped" name="NoCapped" value={'false'}
             onChange={handleChangeIsCapped} checked={isCapped === 'false' ? true:false}/>
            <label htmlFor="NoCapped">No bloqueado</label>
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