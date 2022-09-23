import React from 'react';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref} from 'firebase/database';
import {useState} from "react";

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

    const writeToDatabase = () => {
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
    };

    return(
        <form classname="registroTaller">
            <label>
                Escriba el nombre completo del participante.
            </label>
            <br/>
            <input type="text" placeholder="Nombre" id="Nombre" value={Nombre} onChange={handleChangeNombre} required="true"/>
            <br/>
            <br/>
            <label>
                Escriba su edad.
            </label>
            <br/>
            <input type="number" placeholder="Correo" id="Mail" value={Edad} onChange={handleChangeEdad} required="true"/>
            <br/>
            <br/>
            <label>
                Seleccione su fecha de nacimiento.
            </label>
            <br/>
            <input type="date" placeholder="31/12/2001" id="Nacimiento" value={Nacimiento} onChange={handleChangeNacimiento} required="true"/>
            <br/>
            <br/>
            <label>
                Seleccione su genero.
            </label>
            <br/>
            <input type="radio" id="Masculino" name="Genero" value={Genero} onChange={handleChangeGenero} checked="true"/>
            <label for="Masculino">Masculino</label>
            <input type="radio" id="Femenino" name="Genero" value={Genero} onChange={handleChangeGenero}/>
            <label htmlFor="Femenino">Femenino</label>
            <input type="radio" id="Otro" name="Genero" value={Genero} onChange={handleChangeGenero}/>
            <label htmlFor="Otro">Otro</label>
            <br/>
            <br/>
            <label>
                Escriba su direccion de correo electronico.
            </label>
            <br/>
            <input type="email" placeholder="algo@correo.com" id="Correo" value={Correo} onChange={handleChangeCorreo} required="true"/>
            <br/>
            <br/>
            <label>
                Escriba el nombre del padre o tutor del participante.
            </label>
            <br/>
            <input type="text" placeholder="NombreTutorPadre" id="NombreTutorPadre" value={NombreTutorPadre} onChange={handleChangeNombreTutorPadre} required="true"/>
            <br/>
            <br/>
            <label>
                Escriba el numero celular del padre o tutor del participante.
            </label>
            <br/>
            <input type="number" placeholder="CelularTutorPadre" id="CelularTutorPadre" value={CelularTutorPadre} onChange={handleChangeCelularTutorPadre} minLength="10" maxLength="10" required="true"/>
            <br/>
            <br/>
            <label>
                ¿Vive en Mexico?
            </label>
            <br/>
            <br/>
            <input type="radio" id="Verdadero" name="VivieEnMexico" value={VivieEnMexico} onChange={handleChangeVivieEnMexico}
                   checked="true"/>
            <label htmlFor="Verdadero">Verdadero</label>
            <input type="radio" id="Falso" name="VivieEnMexico" value={VivieEnMexico} onChange={handleChangeVivieEnMexico}/>
            <label htmlFor="Falso">Falso</label>
            <br/>
            <br/>
            <label>
                Seleccione el estado de residencia.
            </label>
            <br/>
            <input type="text" placeholder="NuevoLeon" id="Estado" value={Estado} onChange={handleChangeEstado} required="true"/>
            <br/>
            <br/>
            <label>
                Seleccione el municipio de residencia.
            </label>
            <br/>
            <input type="text" placeholder="Monterrey" id="Municipio" value={Municipio} onChange={handleChangeMunicipio} required="true"/>
            <br/>
            <br/>
            <label>
                Escriba el nombre de la escuela del participante.
            </label>
            <br/>
            <input type="text" placeholder="NombreEscuela" id="NombreEscuela" value={NombreEscuela} onChange={handleChangeNombreEscuela} required="true"/>
            <br/>
            <br/>
            <label>
                Selecciona el tipo de escuela del participante.
            </label>
            <br/>
            <input type="radio" id="Privada" name="TipoEscuela" value={TipoEscuela} onChange={handleChangeTipoEscuela}
                   checked="true"/>
            <label htmlFor="Privada">Privada</label>
            <input type="radio" id="Publica" name="TipoEscuela" value={TipoEscuela} onChange={handleChangeTipoEscuela}/>
            <label htmlFor="Publica">Publica</label>
            <br/>
            <br/>
            <label>
                Escriba el ultimo grado de escolaridad del participante:
            </label>
            <br/>
            <input type="text" placeholder="8vo grado" id="UltimoGrado" value={UltimoGrado} onChange={handleChangeUlitmoGrado} required="true"/>
            <br/>
            <br/>
            <label>
                ¿Ha llevado clases de programacion antes el participante?
            </label>
            <br/>
            <input type="radio" id="Verdadero" name="ClaseProgra" value={ClaseProgra} onChange={handleChangeClaseProgra}
                   checked="true"/>
            <label htmlFor="Verdadero">Verdadero</label>
            <input type="radio" id="Falso" name="ClaseProgra" value={ClaseProgra} onChange={handleChangeClaseProgra}/>
            <label htmlFor="Falso">Falso</label>
            <br/>
            <br/>
            <label>
                ¿Ha participado antes en un taller de Axta?
            </label>
            <br/>
            <input type="radio" id="Verdadero" name="ParticipadoAxta" value={ParticipadoAxta} onChange={handleChangeParticipadoAxta}
                   checked="true"/>
            <label htmlFor="Verdadero">Verdadero</label>
            <input type="radio" id="Falso" name="ParticipadoAxta" value={ParticipadoAxta} onChange={handleChangeParticipadoAxta}/>
            <label htmlFor="Falso">Falso</label>
            <br/>
            <br/>
            <label>
                Cual es el trabajo futuro que desea el participante.
            </label>
            <br/>
            <input type="text" placeholder="Desarrollador de Software" id="FuturoTrabajo" value={FuturoTrabajo} onChange={handleChangeFuturoTrabajo} required="true"/>
            <br/>
            <br/>
            <label>
                ¿Como se entero de estos talleres?
            </label>
            <br/>
            <input type="radio" id="Maestro" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}
                   checked="true"/>
            <label htmlFor="Maestro">Maestro</label>
            <input type="radio" id="Amigo" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}/>
            <label htmlFor="Amigo">Amigo</label>
            <input type="radio" id="Publicidad" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}/>
            <label htmlFor="Publicidad">Publicidad</label>
            <input type="radio" id="Otro" name="ComoEntero" value={ComoEntero} onChange={handleChangeComoEntero}/>
            <label htmlFor="Otro">Otro</label>
            <br/>
            <br/>

            <button onClick={writeToDatabase} class="registro" type="submit">
                Registrarse
            </button>
        </form>
    )
}

export default RegistroTaller