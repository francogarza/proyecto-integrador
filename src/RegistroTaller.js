import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref} from 'firebase/database';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert} from 'react-bootstrap'

const RegistroTaller = () => {

    const [CelularTutorPadre, setCelularTutorPadre] = useState("");
    const [ClaseProgra, setClaseProgra] = useState("");
    const [ComoEntero, setComoEntero] = useState("");
    const [Correo, setCorreo] = useState("");
    const [Edad, setEdad] = useState("");
    const [Estado, setEstado] = useState("");
    const [FuturoTrabajo, setFuturoTrabajo] = useState("");
    const [Genero, setGenero] = useState("");
    const [Municipio, setMunicipio] = useState("");
    const [Nacimiento, setNacimiento] = useState("");
    const [Nombre, setNombre] = useState("");
    const [NombreEscuela, setNombreEscuela] = useState("");
    const [NombreTutorPadre, setNombreTutorPadre] = useState("");
    const [ParticipadoAxta, setParticipadoAxta] = useState("");
    const [TipoEscuela, setTipoEscuela] = useState("");
    const [UltimoGrado, setUltimoGrado] = useState("");
    const [VivieEnMexico, setVivieEnMexico] = useState("");
    const [alertActive, setAlertActive] = useState(false);

    const handleChangeCelularTutorPadre=(e)=>{
        setCelularTutorPadre(e.target.value)
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
            const uuid = uid()
            set(ref(db, 'Participante/patotest/'+ uuid), {
                CelularTutorPadre,
                ClaseProgra,
                ComoEntero,
                Correo,
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
        
    };

    return(
        <Container>
        {alertActive && <Alert variant='warning'>porfavor verifique sus datos</Alert>}
        <Form classname="registroTaller">
            <Form.Label>
                Escriba el nombre completo del participante.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Nombre" id="Nombre" value={Nombre} onChange={handleChangeNombre} required="true"/>
            <br/>
            <Form.Label>
                Escriba su edad.
            </Form.Label>
            <br/>
            <Form.Control type="number" placeholder="telefono" id="Mail" value={Edad} onChange={handleChangeEdad} required="true"/>
            <br/>
            <Form.Label>
                Seleccione su fecha de nacimiento.
            </Form.Label>
            <br/>
            <Form.Control type="date" placeholder="31/12/2001" id="Nacimiento" value={Nacimiento} onChange={handleChangeNacimiento} required="true"/>
            <br/>
            <Form.Label>
                Seleccione su genero.
            </Form.Label>
            <br/>
            <input type="radio" id="Masculino" name="Genero" value={Genero} onChange={handleChangeGenero} checked="true"/>
            <Form.Label for="Masculino">Masculino</Form.Label>
            <input type="radio" id="Femenino" name="Genero" value={Genero} onChange={handleChangeGenero}/>
            <Form.Label htmlFor="Femenino">Femenino</Form.Label>
            <input type="radio" id="Otro" name="Genero" value={Genero} onChange={handleChangeGenero}/>
            <Form.Label htmlFor="Otro">Otro</Form.Label>
            <br/>
            <Form.Label>
                Escriba su direccion de correo electronico.
            </Form.Label>
            <br/>
            <Form.Control type="email" placeholder="algo@correo.com" id="Correo" value={Correo} onChange={handleChangeCorreo} required="true"/>
            <br/>
            <Form.Label>
                Escriba el nombre del padre o tutor del participante.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="NombreTutorPadre" id="NombreTutorPadre" value={NombreTutorPadre} onChange={handleChangeNombreTutorPadre} required="true"/>
            <br/>
            <Form.Label>
                Escriba el numero celular del padre o tutor del participante.
            </Form.Label>
            <br/>
            <Form.Control type="number" placeholder="CelularTutorPadre" id="CelularTutorPadre" value={CelularTutorPadre} onChange={handleChangeCelularTutorPadre} minLength="10" maxLength="10" required="true"/>
            <br/>
            <Form.Label>
                ¿Vive en Mexico?
            </Form.Label>
            <br/>
            <input type="radio" id="Verdadero" name="VivieEnMexico" value={VivieEnMexico} onChange={handleChangeVivieEnMexico}
                   checked="true"/>
            <Form.Label htmlFor="Verdadero">Verdadero</Form.Label>
            <input type="radio" id="Falso" name="VivieEnMexico" value={VivieEnMexico} onChange={handleChangeVivieEnMexico}/>
            <Form.Label htmlFor="Falso">Falso</Form.Label>
            <br/>
            <Form.Label>
                Seleccione el estado de residencia.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="NuevoLeon" id="Estado" value={Estado} onChange={handleChangeEstado} required="true"/>
            <br/>
            <Form.Label>
                Seleccione el municipio de residencia.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Monterrey" id="Municipio" value={Municipio} onChange={handleChangeMunicipio} required="true"/>
            <br/>
            <Form.Label>
                Escriba el nombre de la escuela del participante.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="NombreEscuela" id="NombreEscuela" value={NombreEscuela} onChange={handleChangeNombreEscuela} required="true"/>
            <br/>
            <Form.Label>
                Selecciona el tipo de escuela del participante.
            </Form.Label>
            <br/>
            <input type="radio" id="Privada" name="TipoEscuela" value={TipoEscuela} onChange={handleChangeTipoEscuela}
                   checked="true"/>
            <Form.Label htmlFor="Privada">Privada</Form.Label>
            <input type="radio" id="Publica" name="TipoEscuela" value={TipoEscuela} onChange={handleChangeTipoEscuela}/>
            <Form.Label htmlFor="Publica">Publica</Form.Label>
            <br/>
            <Form.Label>
                Escriba el ultimo grado de escolaridad del participante:
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="8vo grado" id="UltimoGrado" value={UltimoGrado} onChange={handleChangeUlitmoGrado} required="true"/>
            <br/>
            <Form.Label>
                ¿Ha llevado clases de programacion antes el participante?
            </Form.Label>
            <br/>
            <input type="radio" id="Verdadero" name="ClaseProgra" value={ClaseProgra} onChange={handleChangeClaseProgra}
                   checked="true"/>
            <Form.Label htmlFor="Verdadero">Verdadero</Form.Label>
            <input type="radio" id="Falso" name="ClaseProgra" value={ClaseProgra} onChange={handleChangeClaseProgra}/>
            <Form.Label htmlFor="Falso">Falso</Form.Label>
            <br/>
            <Form.Label>
                ¿Ha participado antes en un taller de Axta?
            </Form.Label>
            <br/>
            <input type="radio" id="Verdadero" name="ParticipadoAxta" value={ParticipadoAxta} onChange={handleChangeParticipadoAxta}
                   checked="true"/>
            <Form.Label htmlFor="Verdadero">Verdadero</Form.Label>
            <input type="radio" id="Falso" name="ParticipadoAxta" value={ParticipadoAxta} onChange={handleChangeParticipadoAxta}/>
            <Form.Label htmlFor="Falso">Falso</Form.Label>
            <br/>
            <Form.Label>
                Cual es el trabajo futuro que desea el participante.
            </Form.Label>
            <br/>
            <Form.Control type="text" placeholder="Desarrollador de Software" id="FuturoTrabajo" value={FuturoTrabajo} onChange={handleChangeFuturoTrabajo} required="true"/>
            <br/>
            <Form.Label>
                ¿Como se entero de estos talleres?
            </Form.Label>
            <br/>
            <input type="radio" id="Maestro" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}
                   checked="true"/>
            <Form.Label htmlFor="Maestro">Maestro</Form.Label>
            <input type="radio" id="Amigo" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}/>
            <Form.Label htmlFor="Amigo">Amigo</Form.Label>
            <input type="radio" id="Publicidad" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}/>
            <Form.Label htmlFor="Publicidad">Publicidad</Form.Label>
            <input type="radio" id="Otro" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}/>
            <Form.Label htmlFor="Otro">Otro</Form.Label>
            <br/>
            <Button onClick={writeToDatabase} class="registro" type="submit" style={{backgroundColor:"#864FBA"}}>
                Registrarse
            </Button>
        </Form>
        </Container>
    )
}

export default RegistroTaller