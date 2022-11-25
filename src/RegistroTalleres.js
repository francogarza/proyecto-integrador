import React,{useContext} from 'react';
import {db,storage} from './firebase';
import {uid} from 'uid';
import {set, ref as ref_db,onValue,update} from 'firebase/database';
import {uploadBytes, ref as ref_st,getDownloadURL} from 'firebase/storage'
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { UserContext } from './UserContext';


///
///Se llama <RegistroTalleres/> cuando es el nuevo taller
///Se llama <RegistroTalleres  isUpdate={true} id={id}/> cuando se usa como update
///

const RegistroTalleres = (props) => {
    //variable global
    const {EsAdmin,setEsAdmin} = useContext(UserContext);
    //variables locales
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
    const [maxCap,setMaxCap] = useState("");
    const [isCapped,setIsCapped] = useState("false");
    const [FechaCierre, setFechaCierre] = useState("");
    const [HorarioFin, setHorarioFin] = useState("");
    const [selectedDays, setSelectedDays] = useState("");

    const navigate = useNavigate();

    const daysOfWeek = [
        {name: 'Lunes', id: 1},
        {name: 'Martes', id: 2},
        {name: 'Miércoles', id: 3},
        {name: 'Jueves', id: 4},
        {name: 'Viernes', id: 5},
        {name: 'Sábado', id: 6},
        {name: 'Domingo', id: 7}
    ];
    //funcion para manejar IsCapped
    const handleChangeIsCapped=(e)=>{
        setIsCapped(e.target.value)
    }
    //funcion para manejar MaxCap
    const handleChangeMaxCap=(e)=>{
        setMaxCap(e.target.value)
    }
    //funcion para manejar Descripcion
    const handleChangeDescripcion=(e)=>{
        setDescripcion(e.target.value)
    }
    //funcion para manejar Fechas
    const handleChangeFechas=(e)=>{
        setFechas(e.target.value)
    }
    //funcion para manejar FechaCierre
    const handleChangeFechaCierre=(e)=>{
        console.log(selectedDays);
        setFechaCierre(e.target.value)
    }
    //funcion para manejar Horarios
    const handleChangeHorarios=(e)=>{
        setHorarios(e.target.value)
    }
    //funcion para manejar HorarioFin
    const handleChangeHorarioFin=(e)=>{
        setHorarioFin(e.target.value)
    }
    //funcion para manejar ImpartidoPor
    const handleChangeImpartidoPor=(e)=>{
        setImpartidoPor(e.target.value)
    }
    //funcion para manejar Nombre
    const handleChangeNombre=(e)=>{
        setNombre(e.target.value)
    }
    //funcion para manejar Prerequisitos
    const handleChangePrerequisitos=(e)=>{
        setPrerequisitos(e.target.value)
    }
    //funcion para manejar VirtualPresencial
    const handleChangeVirtualPresencial=(e)=>{
        setVirtualPresencial(e.target.value)
    }
    //funcion para manejar InformacionConfidencial
    const handleChangeInformacionConfidencial=(e)=>{
        setInformacionConfidencial(e.target.value)
    }
    //funcion para manejar Img
    const handleChangeImg=(e)=>{
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
    }
    //funcion para seleccionar el dia
    function selectDay (selectedList, selectedItem) {
        console.log(selectedItem.id);
        switch(selectedItem.id){
            case 1:
                setSelectedDays(selectedDays+"L");
                break;
            case 2:
                setSelectedDays(selectedDays+"M");
                break;
            case 3:
                setSelectedDays(selectedDays+"W");
                break;
            case 4:
                setSelectedDays(selectedDays+"J");
                break;
            case 5:
                setSelectedDays(selectedDays+"V");
                break;
            case 6:
                setSelectedDays(selectedDays+"S");
                break;
            default:
                setSelectedDays(selectedDays+"D");
                break;
        }
    }
    //funcion para quitar dia
    function unselectDay (selectedList, removedItem) {
        console.log(removedItem.id);
        switch(removedItem.id){
            case 1:
                setSelectedDays(selectedDays.replace('L', ''));
                break;
            case 2:
                setSelectedDays(selectedDays.replace('M', ''));
                break;
            case 3:
                setSelectedDays(selectedDays.replace('W', ''));
                break;
            case 4:
                setSelectedDays(selectedDays.replace('J', ''));
                break;
            case 5:
                setSelectedDays(selectedDays.replace('V', ''));
                break;
            case 6:
                setSelectedDays(selectedDays.replace('S', ''));
                break;
            default:
                setSelectedDays(selectedDays.replace('D', ''));
                break;
        }
    }
    //funcion para traducir letras a dias
    function checkDays () {
        let myUpdatedDates = [];
        for(var i=0; i < selectedDays.length; i++){
            switch(selectedDays.charAt(i)){
                case 'L':
                    myUpdatedDates.push({name: "Lunes", id: 1});
                    break;
                case 'M':
                    myUpdatedDates.push({name: "Martes", id: 2});
                    break;
                case 'W':
                    myUpdatedDates.push({name: "Miércoles", id: 3});
                    break;
                case 'J':
                    myUpdatedDates.push({name: "Jueves", id: 4});
                    break;
                case 'V':
                    myUpdatedDates.push({name: "Viernes", id: 5});
                    break;
                case 'S':
                    myUpdatedDates.push({name: "Sábado", id: 6});
                    break;
                default:
                    myUpdatedDates.push({name: "Domingo", id: 7});
                    break;
            }
        }
        return myUpdatedDates;
    }
    //funcion para verificar datos del taller
    function verificarDatos(){
        
        if(verificarDescripcion() && verificarImpartido() && verificarNombre() && verificarPrerequisitos() && verificarInformacionConfidencial()){
            return true
        }else{
            return false
        }
    }

    //funcion para verificar que la descripcion exista
    function verificarDescripcion(){
        if(Descripcion.length>0){
            return true
        }else{
            return false
        }
    }

    //funcion para verificar que el Impartidor exista
    function verificarImpartido(){
        if(ImpartidoPor.length>0){
            return true
        }else{
            return false
        }
    }
    //funcion para verificar que el nombre exista
    function verificarNombre(){
        if(Nombre.length>0){
            return true
        }else{
            return false
        }
    }
    //funcian para verificar que los prerequisitos existan
    function verificarPrerequisitos(){
        if(Prerequisitos.length>0){
            return true
        }else{
            return false
        }
    }
    //funcion para verificar la informacion confidencial
    function verificarInformacionConfidencial(){
        if(InformacionConfidencial.length>0){
            return true
        }else{
            return false
        }
    }
    //funcion para guardar el taller
    const writeToDatabase = () => {
        if(verificarDatos()){
            const uuid = uid()
            const imgRef = ref_st(storage,`images/${uuid + img.name}`)
            uploadBytes(imgRef,img).then(()=>{//aqui se sube la imagen a firebase storage 
                
            }).then(() =>{
                getDownloadURL(imgRef)
                .then((url) => { //url es el link a la imagen subida
                        // `url` is the download URL for 'images/stars.jpg'
                    console.log(url);
                    if(img.name === '' || img.name==null){
                        url = null
                    }
                    const imgUrl = url;
                
                    set(ref_db(db, 'Taller/'+ uuid), { //aqui se sube el taller
                        Descripcion,
                        Fechas,
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
                        FechaCierre,
                        HorarioFin,
                        selectedDays
                    });


                    
                    setDescripcion("");
                    setFechas("");
                    setHorarios("");
                    setImpartidoPor("");
                    setNombre("");
                    setPrerequisitos("");
                    setVirtualPresencial("");
                    setInformacionConfidencial("");
                    setFechaCierre("");
                    setHorarioFin("");
                    setSelectedDays("");
                    navigate('/catalogo-talleres');
                })
                    .catch((error) => {
                        // Handle any errors
                    });
            })

        }else{
            setAlertActive(true);
        }
        
    };

    //esta funcion actualiza un taller
    const updateToDatabase = () => {

        if(verificarDatos()){

            const imageRef = ref_st(storage,`images/${id + img.name}`)
            uploadBytes(imageRef,img).then(()=>{
                
            }).then(() =>{
                getDownloadURL(imageRef).then((url) => {
                    console.log(img.name);
                    if(img.name === '' || img.name==null){
                        url = ImgUrl
                    }
                    const imgUrl = url;
                    console.log(id);
                    if(ImgUrl===undefined && img.name===undefined){//aqui se pregunta si se subio una imagen o no
                        update(ref_db(db, 'Taller/'+ id), { //si no se subio imagen
                            Descripcion,
                            Fechas,
                            Horarios,
                            ImpartidoPor,
                            Nombre,
                            Prerequisitos,
                            VirtualPresencial,
                            InformacionConfidencial,
                            maxCap,
                            isCapped,
                            FechaCierre,
                            HorarioFin,
                            selectedDays
                        });
                    }else{ //si se subio imagen
                        update(ref_db(db, 'Taller/'+ id), {
                            Descripcion,
                            Fechas,
                            Horarios,
                            ImpartidoPor,
                            Nombre,
                            Prerequisitos,
                            VirtualPresencial,
                            InformacionConfidencial,
                            imgUrl,
                            maxCap,
                            isCapped,
                            FechaCierre,
                            HorarioFin,
                            selectedDays
                        });
                    }
                    
                }).then(()=>{
                    navigate('/catalogo-talleres'); //regresa a catalogo-talleres
                })
                .catch((error) => {
                    // Handle any errors
                });
                
            })
        }else{
            setAlertActive(true);
        }
    };

    //Esta funcion maneja la diferencia entre las variables prop y las variables mandadas con navigate
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

    //esta funcion baja la informacion de un taller si el taller es isUpdate
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
                    setIsCapped(data.isCapped)
                    setMaxCap(data.maxCap)
                    setFechaCierre(data.FechaCierre)
                    setHorarioFin(data.HorarioFin)
                    setSelectedDays(data.selectedDays)
                    setImgUrl(data.imgUrl)
                }
              });
        }
      }, [id,isUpdate])

    return(
        <div id='mainContainer'>
        <Container>
        {alertActive && <Alert variant='warning'>Por favor verifique sus datos.</Alert>}
        {EsAdmin && 
            <Form className="registroTaller">
            <Form.Label>
                Escriba el nombre del taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Nombre" id="Nombre" value={Nombre} onChange={handleChangeNombre} required={true}/>
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
                Seleccione la fecha de finalización del taller.
            </Form.Label>
            <br/>
            <Form.Control type="date" id="FechaCierre" value={FechaCierre} onChange={handleChangeFechaCierre} required={true}/>
            <br/>
            <Form.Label>
                Seleccione la hora de inicio del taller.
            </Form.Label>
            <br/>
            <Form.Control type="time" id="Horarios" value={Horarios} onChange={handleChangeHorarios} required={true}/>
            <br/>
            <Form.Label>
                Seleccione la hora de finalización del taller.
            </Form.Label>
            <br/>
            <Form.Control type="time" id="HorarioFin" value={HorarioFin} onChange={handleChangeHorarioFin} required={true}/>
            <br/>
            <Form.Label>
                Seleccione los días en los que se imparte el taller.
            </Form.Label>
            <br/>
            <Multiselect options={daysOfWeek} selectedValues={checkDays()} onSelect={selectDay} onRemove={unselectDay} displayValue="name" required={true}/>
            <br/>
            <Form.Label>
                Escriba el nombre de quien imparte el taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Nombre" id="ImpartidoPor" value={ImpartidoPor} onChange={handleChangeImpartidoPor} required={true}/>
            <br/>
            <Form.Label>
                Escriba los prerrequisitos del taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Prerrequisitos" id="Prerrequisitos" value={Prerequisitos} onChange={handleChangePrerequisitos} required={true}/>
            <br/>
            <Form.Label>
                Escriba la liga o el lugar donde se impartirá el taller.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Liga o lugar" id="InformacionConfidencial" value={InformacionConfidencial} onChange={handleChangeInformacionConfidencial} required={true}/>
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
            <input type="file" onChange={handleChangeImg}></input>
            <br/>
            <Form.Label>
                Cupo máximo
            </Form.Label>
            <br/>
            <Form.Control type="number" placeholder="Cupo máximo" id="maxCap" value={maxCap} onChange={handleChangeMaxCap} required={true}/>
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
                {isUpdate ? 'Actualizar taller' : 'Registrar taller'}
            </Button>
            }
        </Form>
        }
        </Container>
        </div>
    )
}

export default RegistroTalleres
