import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref, onValue,update} from 'firebase/database';
import {useState,useEffect,useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert,Dropdown, DropdownButton} from 'react-bootstrap'
import { UserContext } from './UserContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';

const RegistroHijo = () => {
    const location = useLocation();
    //global
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    const {parentId,setParentId} = useContext(UserContext);
    //local
    const [CelularTutorPadre, setCelularTutorPadre] = useState("");
    const [ClaseProgra, setClaseProgra] = useState("true");
    const [ComoEntero, setComoEntero] = useState("maestro");
    const [Correo, setCorreo] = useState("");
    const [Mail, setMail] = useState("");
    const [Edad, setEdad] = useState("");
    const [Estado, setEstado] = useState("");
    const [FuturoTrabajo, setFuturoTrabajo] = useState("");
    const [Genero, setGenero] = useState("Masculino");
    const [Municipio, setMunicipio] = useState("");
    const [Nacimiento, setNacimiento] = useState("");
    const [Nombre, setNombre] = useState("");
    const [NombreEscuela, setNombreEscuela] = useState("");
    const [NombreTutorPadre, setNombreTutorPadre] = useState("");
    const [ParticipadoAxta, setParticipadoAxta] = useState("true");
    const [TipoEscuela, setTipoEscuela] = useState("privada");
    const [UltimoGrado, setUltimoGrado] = useState("Primero de primaria");
    const [VivieEnMexico, setVivieEnMexico] = useState("true");
    const [alertActive, setAlertActive] = useState(false);
    const [hijos, setHijos] = useState([]);
    const [isUpdate,setIsUpdate]=useState(false);
    const [idEditar,setIdEditar] = useState("");

    const navigate = useNavigate();

    const handleChangeCelularTutorPadre=(e)=>{
        setCelularTutorPadre(e.target.value);
    }
    const handleChangeClaseProgra=(e)=>{
        setClaseProgra(e.target.value)
    }
    const handleChangeComoEntero=(e)=>{
        setComoEntero(e.target.value)
    }
    const handleChangeCorreo=(e)=>{
        setCorreo(e.target.value)
    }
    const handleChangeEdad=(e)=>{
        setEdad(e.target.value)
    }
    const handleChangeEstado=(e)=>{
        setEstado(e.target.value)
    }
    const handleChangeFuturoTrabajo=(e)=>{
        setFuturoTrabajo(e.target.value)
    }
    const handleChangeGenero=(e)=>{
        setGenero(e.target.value)
    }
    const handleChangeMunicipio=(e)=>{
        setMunicipio(e.target.value)
    }
    const handleChangeNacimiento=(e)=>{
        setNacimiento(e.target.value)
    }
    const handleChangeNombre=(e)=>{
        setNombre(e.target.value)
    }
    const handleChangeNombreEscuela=(e)=>{
        setNombreEscuela(e.target.value)
    }
    const handleChangeNombreTutorPadre=(e)=>{
        setNombreTutorPadre(e.target.value)
    }
    const handleChangeParticipadoAxta=(e)=>{
        setParticipadoAxta(e.target.value)
    }
    const handleChangeTipoEscuela=(e)=>{
        setTipoEscuela(e.target.value)
    }
    const handleChangeUlitmoGrado=(e)=>{
        setUltimoGrado(e.target.value)
    }
    const handleChangeVivieEnMexico=(e)=>{
        setVivieEnMexico(e.target.value)
    }
    function verificarDatos(){
        if(verificarCelularPadre() && verificarEdad() && verificarCorreo() && verificarNombre() && verificarEscuela() && verificarNombrePadre() && verificarTrabajoFuturo()){
            return true
        }else{
            return false
        }
    }
    function verificarCelularPadre(){
        return !isNaN(parseInt(CelularTutorPadre))
    }
    function verificarEdad(){
        return  !isNaN(parseInt(Edad))
    }
    function verificarCorreo(){
        return /\S+@\S+\.\S+/.test(Correo);
    }
    function verificarNombre(){
        if(Nombre.length>0){
            return true
        }else{
            return false
        }
    }
    function verificarEscuela(){
        if(NombreEscuela.length>0){
            return true
        }else{
            return false
        }
    }
    function verificarNombrePadre(){
        if(NombreTutorPadre.length>0){
            return true
        }else{
            return false
        }
    }
    function verificarTrabajoFuturo(){
        if(FuturoTrabajo.length>0){
            return true
        }else{
            return false
        }
    }
    const writeToDatabase = () => {
        if(verificarDatos()){
            const PadreId = parentId;
            const uuid = uid()
            set(ref(db, 'Participante/'+ uuid), {
                CelularTutorPadre,
                ClaseProgra,
                ComoEntero,
                Correo,
                Mail,
                Edad,
                Estado,
                FuturoTrabajo,
                Genero,
                Municipio,
                Nacimiento,
                Nombre,
                NombreEscuela,
                NombreTutorPadre,
                ParticipadoAxta,
                TipoEscuela,
                UltimoGrado,
                VivieEnMexico,
            });   
            update(ref(db, 'Padre/'+ PadreId+ "/hijos/" + uuid), {
                Nombre,
                uuid
            });
            setCelularTutorPadre("");
            setClaseProgra("");
            setComoEntero("");
            setCorreo("");
            setEdad("");
            setEstado("");
            setFuturoTrabajo("");
            setGenero("");
            setMunicipio("");
            setNacimiento("");
            setNombre("");
            setNombreEscuela("");
            setNombreTutorPadre("");
            setParticipadoAxta("");
            setUltimoGrado("");
            setVivieEnMexico("");
        }else{
            setAlertActive(true);
        }
        navigate(-1);
    };

    useEffect(() =>{
        if(isUpdate){
            onValue(ref(db,'Participante/'+idEditar),(snapshot)=>{
                const data = snapshot.val();
                if(data!==null){
                    setCelularTutorPadre(data.CelularTutorPadre);
                    setClaseProgra(data.ClaseProgra);
                    setComoEntero(data.ComoEntero);
                    setCorreo(data.Correo);
                    setEdad(data.Edad);
                    setEstado(data.Estado);
                    setFuturoTrabajo(data.FuturoTrabajo);
                    setGenero(data.Genero);
                    setMunicipio(data.Municipio);
                    setNacimiento(data.Nacimiento);
                    setNombre(data.Nombre);
                    setNombreEscuela(data.NombreEscuela);
                    setNombreTutorPadre(data.NombreTutorPadre);
                    setParticipadoAxta(data.ParticipadoAxta);
                    setUltimoGrado(data.UltimoGrado);
                    setVivieEnMexico(data.VivieEnMexico);
                }
            });
        }
    },[isUpdate,idEditar])
    const updateToDatabase=()=>{
        if(verificarDatos()){
            const PadreId = parentId;
            update(ref(db, 'Participante/'+ idEditar), {
                CelularTutorPadre,
                ClaseProgra,
                ComoEntero,
                Correo,
                Mail,
                Edad,
                Estado,
                FuturoTrabajo,
                Genero,
                Municipio,
                Nacimiento,
                Nombre,
                NombreEscuela,
                NombreTutorPadre,
                ParticipadoAxta,
                TipoEscuela,
                UltimoGrado,
                VivieEnMexico,
            });
            const uuid = idEditar;
            update(ref(db, 'Padre/'+ PadreId+ "/hijos/" + idEditar), {
                Nombre,
                uuid
            });
            navigate(-1);
        }
    }
    useEffect(()=>{
        const PadreId = parentId;
        onValue(ref(db,'Padre/'+PadreId),(snapshot)=>{
            const data = snapshot.val();
            if(data!==null){
                setMail(data.Mail)
            }
        });
        if(location.state !== null){
            if(location.state.isUpdate !== null){
                setIsUpdate(location.state.isUpdate);
                setIdEditar(location.state.idEditar);
            }
        }
    },[])
    return(
        <div id="mainContainer">
            <Container>
            {alertActive && <Alert variant='warning'>porfavor verifique sus datos</Alert>}
            <div className="registroTaller">
                <Form.Label>
                    Escriba el nombre completo del participante.
                </Form.Label>
                <br/>
                <Form.Control type="text" placeholder="Nombre" id="Nombre" value={Nombre} onChange={handleChangeNombre} required={true}/>
                <br/>
                <Form.Label>
                    Escriba su edad.
                </Form.Label>
                <br/>
                <Form.Control type="number" placeholder="Edad" id="Edad" value={Edad} onChange={handleChangeEdad} required={true}/>
                <br/>
                <Form.Label>
                    Seleccione su fecha de nacimiento.
                </Form.Label>
                <br/>
                <Form.Control type="date" placeholder="31/12/2001" id="Nacimiento" value={Nacimiento} onChange={handleChangeNacimiento} required={true}/>
                <br/>
                <Form.Label>
                    Seleccione su género.
                </Form.Label>
                <br/>
                <input type="radio" id="Masculino" name="Genero" value={"Masculino"} onChange={handleChangeGenero} checked={Genero === "Masculino"?true:false}/>
                <Form.Label htmlFor="Masculino">Masculino</Form.Label>
                <input type="radio" id="Femenino" name="Genero" value={"Femenino"} onChange={handleChangeGenero} checked={Genero === "Femenino"?true:false}/>
                <Form.Label htmlFor="Femenino">Femenino</Form.Label>
                <input type="radio" id="Otro" name="Genero" value={"Otro"} onChange={handleChangeGenero} checked={Genero==="Otro"?true:false}/>
                <Form.Label htmlFor="Otro">Otro</Form.Label>
                <br/>
                <Form.Label>
                    Escriba su direccion de correo electrónico.
                </Form.Label>
                <br/>
                <Form.Control type="email" placeholder="algo@correo.com" id="Correo" value={Correo} onChange={handleChangeCorreo} required={true}/>
                <br/>
                <Form.Label>
                    Escriba el nombre del padre o tutor del participante.
                </Form.Label>
                <br/>
                <Form.Control type="text" placeholder="NombreTutorPadre" id="NombreTutorPadre" value={NombreTutorPadre} onChange={handleChangeNombreTutorPadre} required={true}/>
                <br/>
                <Form.Label>
                    Escriba el número celular del padre o tutor del participante.
                </Form.Label>
                <br/>
                <Form.Control type="number" placeholder="CelularTutorPadre" id="CelularTutorPadre" value={CelularTutorPadre} onChange={handleChangeCelularTutorPadre} minLength="10" maxLength="10" required={true}/>
                <br/>
                <Form.Label>
                    ¿Vive en México?
                </Form.Label>
                <br/>
                <input type="radio" id="Verdadero" name="VivieEnMexico" value={"true"} onChange={handleChangeVivieEnMexico} checked={VivieEnMexico==="true"?true:false}/>
                <Form.Label htmlFor="Verdadero">Verdadero</Form.Label>
                <input type="radio" id="Falso" name="VivieEnMexico" value={"false"} onChange={handleChangeVivieEnMexico} checked={VivieEnMexico==="false"?true:false}/>
                <Form.Label htmlFor="Falso">Falso</Form.Label>
                <br/>
                <Form.Label>
                    Seleccione el estado de residencia.
                </Form.Label>
                <br/>
                <Form.Control type="text" placeholder="Nuevo León" id="Estado" value={Estado} onChange={handleChangeEstado} required={true}/>
                <br/>
                <Form.Label>
                    Seleccione el municipio de residencia.
                </Form.Label>
                <br/>
                <Form.Control type="text" placeholder="Monterrey" id="Municipio" value={Municipio} onChange={handleChangeMunicipio} required={true}/>
                <br/>
                <Form.Label>
                    Escriba el nombre de la escuela del participante.
                </Form.Label>
                <br/>
                <Form.Control type="text" placeholder="NombreEscuela" id="NombreEscuela" value={NombreEscuela} onChange={handleChangeNombreEscuela} required={true}/>
                <br/>
                <Form.Label>
                    Seleccione el tipo de escuela del participante.
                </Form.Label>
                <br/>
                <input type="radio" id="Privada" name="TipoEscuela" value={"privada"} onChange={handleChangeTipoEscuela}
                    checked={TipoEscuela==="privada"?true:false}/>
                <Form.Label htmlFor="Privada">Privada</Form.Label>
                <input type="radio" id="Publica" name="TipoEscuela" value={"publica"} onChange={handleChangeTipoEscuela}
                checked={TipoEscuela==="publica"?true:false}/>
                <Form.Label htmlFor="Publica">Pública</Form.Label>
                <br/>
                <Form.Label>
                    Escriba el último grado de escolaridad del participante.
                </Form.Label>
                <br/>
                {/* <Form.Control type="text" placeholder="8vo grado" id="UltimoGrado" value={UltimoGrado} onChange={handleChangeUlitmoGrado} required={true}/> */}
                <select className='form-control' value={UltimoGrado} onChange={handleChangeUlitmoGrado}>
                <option value="Primero de primaria">Primero de primaria</option>
                <option value="Segundo de primaria">Segundo de primaria</option>
                <option value="Tercero de primaria">Tercero de primaria</option>
                <option value="Cuarto de primaria">Cuarto de primaria</option>
                <option value="Quinto de primaria">Quinto de primaria</option>
                <option value="Sexto de primaria">Sexto de primaria</option>
                <option value="Primero de secundaria">Primero de secundaria</option>
                <option value="Segundo de secundaria">Segundo de secundaria</option>
                <option value="Tercero de secundaria">Tercero de secundaria</option>
                <option value="Primero de preparatoria">Primero de preparatoria</option>
                <option value="Segundo de preparatoria">Segundo de preparatoria</option>
                <option value="Tercero de preparatoria">Tercero de preparatoria</option>
                </select>
                
                <br/>
                <Form.Label>
                    ¿Ha llevado clases de programación anteriormente el participante?
                </Form.Label>
                <br/>
                <input type="radio" id="Verdadero" name="ClaseProgra" value={"true"} onChange={handleChangeClaseProgra}
                    checked={ClaseProgra==="true"?true:false}/>
                <Form.Label htmlFor="Verdadero">Verdadero</Form.Label>
                <input type="radio" id="Falso" name="ClaseProgra" value={"false"} onChange={handleChangeClaseProgra}
                    checked={ClaseProgra==="false"?true:false}/>
                <Form.Label htmlFor="Falso">Falso</Form.Label>
                <br/>
                <Form.Label>
                    ¿Ha participado con anterioridad en un taller de Axt@Teen?
                </Form.Label>
                <br/>
                <input type="radio" id="Verdadero" name="ParticipadoAxta" value={"true"} onChange={handleChangeParticipadoAxta}
                    checked={ParticipadoAxta==="true"?true:false}/>
                <Form.Label htmlFor="Verdadero">Verdadero</Form.Label>
                <input type="radio" id="Falso" name="ParticipadoAxta" value={"false"} onChange={handleChangeParticipadoAxta}
                checked={ParticipadoAxta==="false"?true:false}/>
                <Form.Label htmlFor="Falso">Falso</Form.Label>
                <br/>
                <Form.Label>
                    ¿Cuál es el trabajo futuro que desea el participante?
                </Form.Label>
                <br/>
                <Form.Control type="text" placeholder="Desarrollador de Software" id="FuturoTrabajo" value={FuturoTrabajo} onChange={handleChangeFuturoTrabajo} required={true}/>
                <br/>
                <Form.Label>
                    ¿Cómo se enteró de estos talleres?
                </Form.Label>
                <br/>
                <input type="radio" id="Maestro" name="ComoEntero" value={"maestro"} onChange={handleChangeComoEntero}
                    checked={ComoEntero==="maestro"?true:false}/>
                <Form.Label htmlFor="Maestro">Maestro</Form.Label>
                <input type="radio" id="Amigo" name="ComoEntero" value={"amigo"} onChange={handleChangeComoEntero}
                    checked={ComoEntero==="amigo"?true:false}/>
                <Form.Label htmlFor="Amigo">Amigo</Form.Label>
                <input type="radio" id="Publicidad" name="ComoEntero" value={"publicidad"} onChange={handleChangeComoEntero}
                    checked={ComoEntero==="publicidad"?true:false}/>
                <Form.Label htmlFor="Publicidad">Publicidad</Form.Label>
                <input type="radio" id="Otro" name="ComoEntero" value={"otro"} onChange={handleChangeComoEntero}
                    checked={ComoEntero==="otro"?true:false}/>
                <Form.Label htmlFor="Otro">Otro</Form.Label>
                <br/>
                <Button onClick={isUpdate ? updateToDatabase : writeToDatabase} className="registro" type="submit">
                    {isUpdate ?  "Actualizar" : "Registrarse"}
                </Button>
            </div>
            </Container>
            <div id="bottomPadding"></div>
        </div>
        
    )
}

export default RegistroHijo