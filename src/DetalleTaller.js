import React, {useContext} from 'react';
import emailjs from 'emailjs-com';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref,onValue,update, remove} from 'firebase/database';
import {useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button,Container,Form,Alert, FormLabel} from 'react-bootstrap'
import { UserContext } from './UserContext';
import TallerCard from "./components/TallerCard";
import { useNavigate } from 'react-router-dom';

const DetalleTaller = (props) => {

    //global
    const {userId, setUserId} = useContext(UserContext);
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    //local
    const location = useLocation();
    const [Descripcion, setDescripcion] = useState("");
    const [Fechas, setFechas] = useState("");
    const [Horarios, setHorarios] = useState("");
    const [ImpartidoPor, setImpartidoPor] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Prerequisitos, setPrerequisitos] = useState("");
    const [VirtualPresencial, setVirtualPresencial] = useState("");
    const [InformacionConfidencial, setInformacionConfidencial] = useState("");
    const [EstaInscrito,setEstaInscrito] = useState(false);
    const [imgUrl,setImgUrl] = useState("");
    const [participantes,setParticipantes] = useState([]);
    const [NombreU,setNombreU] = useState("");

    const [maxCap,setMaxCap] = useState("");
    const [isCapped,setIsCapped] = useState("");
    const [Correo,setCorreo] = useState("");

    const navigate = useNavigate();

    const correoBajaTaller = () => {

        var templateParams = {
            nombre_hijo: '',
            nombre_taller: 'taller test',
            link_catalogo_talleres: 'http://localhost:3000/catalogo-talleres',
            link_detalle_taller: '',
            to_email: 'francogarza98@gmail.com'
        };

        emailjs.send('service_l68b4ed', 'template_jrfyyws', templateParams, '7VB8KWioxv21zM4iQ')
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
        });
    };

    

    const handleEstaInscrito=(e)=>{
        setEstaInscrito(e.target.value)
    }

    useEffect(() => {

        onValue(ref(db,'Taller/'+location.state.id),(snapshot) => {
            setParticipantes([]);
            const data = snapshot.val();
            if(data !== null){
                
                if(typeof data.participantes!=='undefined'){
                    Object.values(data.participantes).map((e) => {
                        setParticipantes((oldArray) => [...oldArray,e])
                    });
                }
                
                setDescripcion(data.Descripcion)
                setFechas(data.Fechas)
                setHorarios(data.Horarios)
                setImpartidoPor(data.ImpartidoPor)
                setNombre(data.Nombre)
                setPrerequisitos(data.Prerequisitos)
                setVirtualPresencial(data.VirtualPresencial)
                setInformacionConfidencial(data.InformacionConfidencial)
                setMaxCap(data.maxCap);
                setIsCapped(data.isCapped)
                if(data.imgUrl != null){
                    setImgUrl(data.imgUrl)
                }else{
                    setImgUrl(null);
                }
            }
            });

      }, [isLoggedIn])

    useEffect(() => {
        // quitar el siguiente comentario para probar con un taller en especifico
        // onValue(ref(db,'Participante/03409e71a2a'),(snapshot) => {
        onValue(ref(db,'Participante/'+userId),(snapshot) => {
            const data = snapshot.val();
            if(data !== null){
                setNombreU(data.Nombre)

                setCorreo(data.Correo)

            }
        });
    }, [])

    const correoBajaTaller = () => {
        var templateParams = {
            nombre_hijo: NombreU,
            nombre_taller: Nombre,
            link_catalogo_talleres: 'http://localhost:3000/catalogo-talleres',
            // quitar este comment para mandar al correo del usuario
            // to_email: Correo,
            // quitar este comment para usar mi direccion de correo y hacer pruebas 
            to_email: 'francogarza98@gmail.com'
        };
        emailjs.send('service_l68b4ed', 'template_jrfyyws', templateParams, '7VB8KWioxv21zM4iQ')
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
        });
    };
    const darDeBaja=()=>{
        const id = location.state.id
        remove(ref(db, 'Participante/'+ userId + '/talleres/' + id));
        remove(ref(db, 'Taller/'+ id + '/participantes/' + userId));
        navigate('/talleres-inscritos');
        // correoBajaTaller()
    }

    const enviarCorreoInscripcionTaller = () => {
        var templateParams = {
            nombre_taller: Nombre,
            nombre_hijo: NombreU,
            link_talleres_inscritos: 'http://localhost:3000/talleres-inscritos',
            // quitar este comment para mandar al correo del usuario
            // to_email: Correo,
            // quitar este comment para usar mi direccion de correo y hacer pruebas 
            to_email: 'francogarza98@gmail.com'
        };
        emailjs.send('service_l68b4ed', 'template_jrfyyws', templateParams, '7VB8KWioxv21zM4iQ')
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
        });
    };
    const inscribirTaller=()=>{
        if(location.state.EsAdmin){
            console.log("para que quiere un admin meter una clase?")
        }else{
        if(participantes.length<maxCap && isCapped=='false'){
            const id = location.state.id
            set(ref(db, 'Participante/'+ userId + '/talleres/' + id), {
                id,
                Nombre,
                Descripcion,
                imgUrl
            });

            set(ref(db, 'Taller/'+ id + '/participantes/' + userId), {
                userId,
                NombreU
            });
            navigate('/catalogo-talleres');
            // correoInscripcionTaller()
            }else{
                alert("No se puede inscribir porque el taller esta lleno o esta bloqueado");
            }
        }

        navigate('/catalogo-talleres');
        // enviarCorreoInscripcionTaller()
    };


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

    const handleChangeImageUrl=(e)=>{
        setImgUrl(e.target.value);
    }

    const handleChangeInformacionConfidencial=(e)=>{
        setInformacionConfidencial(e.target.value)
    }

    const goBack=()=>{
        navigate(-1);
    }

  return(
    <div>
        <Button onClick={goBack}>regresar</Button>
        <div style={{padding: "50px", textAlign: "center", background: "#864fba", color: "#fdfffc", fontSize: "30px"}}>
        </div>
        <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            <h1>{Nombre}</h1>
            <h5>Impartido por:</h5>
            <h4>{ImpartidoPor}</h4>
            {isCapped=='true'? <h5>cupo lleno</h5>: 
                <div>
                <h5>Cupo: {participantes.length+" de "+maxCap}</h5>
                </div>
            }
            
        </div>
        <div className='container'>
            <h3>Descripción:</h3>
            <p>{Descripcion}</p>
        </div>

        <div className='container'>
            <h3>Prerrequisitos:</h3>
            <p>{Prerequisitos}</p>
        </div>

        <div className='container'>
            <h3>¿Virtual o presencial?</h3>
            <p>{VirtualPresencial}</p>
        </div>
        {location.state.EsAdmin &&
        <div className='container'>
        {participantes.map(participante => (
            <div style={{display: "inline-block"}} key={participante.id}>
                {location.state.EsAdmin &&
                (<div>
                    <h3>Lista Participantes</h3>
                    <p>{NombreU}</p>
                    <p>{userId}</p>
                    <br></br>
                </div>)}
            </div>
        ))}
        </div>
        }
        
        {(location.state.EstaInscrito || location.state.EsAdmin) &&
        <div className='container'>
        {/*
        aqui va la parte de la informacion secreta, primero hay que hacer la variable InfoSecreta en registro talleres (el del admin) para que se guarde en firebase, luega se hace aqui un condicional para mostrar la informacion secreta si el usuario esta inscrito (por ahora pasa eso como un prop tipo <DetalleTaller EstaInscrito={true}/>)

        asi se ponen los ifs aqui
        <p>{props.EstaInscrito ? {InformacionSecreta} : "para ver esta informacion primero inscriba el taller"}</p>
        */}
        <h3>Información secreta:</h3>
        {(location.state.EstaInscrito || location.state.EsAdmin) ? <p>{InformacionConfidencial}</p> : <p></p>}
        
        </div>
        }
            {isLoggedIn &&
                <div>
                    { 
                        (location.state.EstaInscrito )? <Button onClick={darDeBaja}>Dar de baja</Button> : <Button onClick={inscribirTaller}>Inscribir</Button>
                    }
                </div>
            }
    </div>
  )
}

export default DetalleTaller