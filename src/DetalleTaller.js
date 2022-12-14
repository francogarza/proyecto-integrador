import React, {useContext} from 'react';
import emailjs from 'emailjs-com';
import {db} from './firebase';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {set, ref,onValue,get, remove, child} from 'firebase/database';
import {useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './basic.css'
import {Button} from 'react-bootstrap'
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const DetalleTaller = (props) => {
    //variables globales
    const {parentId, setParentId} = useContext(UserContext);
    const {userId, setUserId} = useContext(UserContext);
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    //variables locales
    const location = useLocation();
    const [Descripcion, setDescripcion] = useState("");
    const [Fechas, setFechas] = useState("");
    const [Horarios, setHorarios] = useState("");
    const [ImpartidoPor, setImpartidoPor] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Prerequisitos, setPrerequisitos] = useState("");
    const [VirtualPresencial, setVirtualPresencial] = useState("");
    const [InformacionConfidencial, setInformacionConfidencial] = useState("");
    const [imgUrl,setImgUrl] = useState("");
    const [participantes,setParticipantes] = useState([]);
    const [NombreU,setNombreU] = useState("");
    const [maxCap,setMaxCap] = useState("");
    const [isCapped,setIsCapped] = useState("");
    const [Correo,setCorreo] = useState("");
    const [FechaCierre, setFechaCierre] = useState("");
    const [HorarioFin, setHorarioFin] = useState("");
    const [selectedDays, setSelectedDays] = useState("");
    const [Mail, setMail] = useState("");

    const navigate = useNavigate();

    //esta funcion consigue la informacion del taller
    useEffect(() => {
        onValue(ref(db,'Taller/'+location.state.id),(snapshot) => {
            setParticipantes([]);
            const data = snapshot.val();
            if(data !== null){
                if(typeof data.participantes!=='undefined'){ //verifica si hay usuarios inscritos en el taller
                    Object.values(data.participantes).map((e) => {
                        setParticipantes((oldArray) => [...oldArray,e])
                    });
                }
                getParticipantes()
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
                setFechaCierre(data.FechaCierre)
                setHorarioFin(data.HorarioFin)
                setSelectedDays(data.selectedDays)
            }
            });

      }, [isLoggedIn])

    //Esta funcion consigue el mail del padre en caso de necesitar mandar un mail
    useEffect(() => {
        const PadreId = parentId;
        onValue(ref(db,'Padre/'+PadreId),(snapshot)=>{
            const data = snapshot.val();
            if(data!==null){
                setMail(data.Mail)
            }
        });
        onValue(ref(db,'Participante/'+userId),(snapshot) => {
            const data = snapshot.val();
            if(data !== null){
                setNombreU(data.Nombre)
                setCorreo(data.Correo)
            }
        });
    }, [])

    // funcion que hace fetch a la funcion de mandar correo que esta ligada a la ruta /contact_form, con el uso de la extension firebase functions 
    const handleSubmit = async (values) => {
        const result = await fetch(
          '/contact_form',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values, secret: 'firebaseIsCool' }),
          }
        );
      }

    //Esta funcion quita a el objeto de participante del objeto taller y el taller del objeto del participante
    const darDeBaja=()=>{
        const id = location.state.id
        remove(ref(db, 'Participante/'+ userId + '/talleres/' + id));
        remove(ref(db, 'Taller/'+ id + '/participantes/' + userId));
        enviarCorreoBajaTaller()
        navigate('/talleres-inscritos');
    }

    //esta funcion manda el correo de dada de baja
    const enviarCorreoBajaTaller = () => {
        const values = {
          subject: `Axtateen: Baja de taller ${Nombre}`,
          email: [Mail],
          message: `<b>Axtateen</b> le informamos:
          <br>
          <ul>
              <li>Su hijo/a <b>${NombreU}</b> ha sido dado de baja del <b>${Nombre}</b>.
              <li>Le invitamos visitar el catalogo de talleres disponibles para encontrar un taller de su agrado.
          </ul>
          <br>
          <b>Atentamente</b>,
          <br>
          <b>Axtateen</b>`,
        };
        handleSubmit(values);
    };

    //esta funcion se usa para inscribir un participante a un taller
    const inscribirTaller=()=>{
        if(location.state.EsAdmin){
            console.log("para que quiere un admin meter una clase?")
        }else{
        if(participantes.length<maxCap && isCapped==='false'){//pregunta si hay espacio o si el taller no esta bloqueado para poder inscribirlo
            const id = location.state.id
            set(ref(db, 'Participante/'+ userId + '/talleres/' + id), { //se guarda el taller en el participante para encontrarlo facilmente
                id,
                Nombre,
                Descripcion,
                imgUrl
            });

            set(ref(db, 'Taller/'+ id + '/participantes/' + userId), { //se guarda el participante en el taller para encontrarlo facilmente
                userId,
                NombreU,
                Mail
            });
            enviarCorreoInscripcionTaller();//se llama la funcion para mandar el correo de confirmacion
            navigate('/catalogo-talleres'); //se regresa a el catalogo de talleres
            }else{
                alert("No se puede inscribir porque el taller est?? lleno o est?? bloqueado.");
            }
        }
        navigate('/catalogo-talleres');
    };

    //Esta funcion envia el correo para que los papas esten enterados del taller que su hijo inscribio
    const enviarCorreoInscripcionTaller = () => {
        const values = {
          subject: `Axtateen: Inscripcion al taller ${Nombre}`,
          email: [Mail],
          message: `<b>Axtateen</b> le informamos:
            <br>
            <ul>
                <li>Su hijo/a <b>${NombreU}</b> ha sido dado <b>inscrito</b> al taller <b>${Nombre}</b>.
                <li>Agradecemos su preferencia e interes en nuestros talleres.
            </ul>    
            <br>
            <b>Atentamente</b>,
            <br>
            <b>Axtateen</b>`
        };
        handleSubmit(values); 
    };

    //Esta funcion busca todos los participantes de un taller y los pone en un arreglo de objetos participante
    function getParticipantes(){
        //Aqui agarra las llaves de todos los participantes de un taller
        return new Promise((resolve, reject) => {
            get(child(ref(db) ,'Taller/'+ location.state.id + '/participantes/'))
            .then((snapshot) => {
                const ParticipantesT = [];
                if (snapshot.exists()) {
                    snapshot.forEach (function (data) {
                        ParticipantesT.push (data.key);
                    });
                    return ParticipantesT;
                } else {
                    console.log("No data available");
                }
            })
                //Aqui compara las llaves en el arreglo de ParticipantesT con todos los participantes para extraer la informacion
            .then((ParticipantesT) => {
                get(child(ref(db), 'Participante/')).then((snapshot) => {
                    const Participantes = [];
                    if (snapshot.exists()) {
                        console.log(ParticipantesT);
                        snapshot.forEach (function (data) {
                            if (ParticipantesT.includes(data.key)) {
                                var item = {
                                    Nombre: data.val().Nombre,
                                    Edad: data.val().Edad,
                                    Nacimiento: data.val().Nacimiento,
                                    Genero: data.val().Genero,
                                    FuturoTrabajo: data.val().FuturoTrabajo,

                                    NombreTutorPadre: data.val().NombreTutorPadre,
                                    CelularTutorPadre: data.val().CelularTutorPadre,
                                    Correo: data.val().Correo,

                                    UltimoGrado: data.val().UltimoGrado,
                                    ClaseProgra: data.val().ClaseProgra,
                                    ParticipadoAxta: data.val().ParticipadoAxta,

                                    NombreEscuela: data.val().NombreEscuela,
                                    TipoEscuela: data.val().TipoEscuela,

                                    VivieEnMexico: data.val().VivieEnMexico,
                                    Estado: data.val().Estado,
                                    Municipio: data.val().Municipio,
                                    ComoEntero: data.val().ComoEntero

                                }
                                Participantes.push(item);
                            }
                        });
                        console.log(Participantes);
                        resolve(Participantes);
                    }
                })
            })
        })
    }
    //Esta funcion genera el archivo XLSX con los objetos de Taller y Participantes
    function hacerArchivo(Taller, Participantes){
        //Se define el nombre del archivo
        const DEFAULT_FILENAME = "Informaci??n de participantes de " + Nombre;

        //Se define el tipo de archivo
        const fileType =  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        //Se crean las hojas de taller y participantes, luego se escribe la informacion en ellas
        const ws = XLSX.utils.json_to_sheet(Taller);
        const ws2 = XLSX.utils.json_to_sheet(Participantes);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Taller");
        XLSX.utils.book_append_sheet(wb, ws2, "Participantes");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        //Se descarga el archivo desde el navegador
        FileSaver.saveAs(data, DEFAULT_FILENAME + fileExtension);
    }
    //Funcion que junta todo lo necesario para la generacion y descarga de archivos
    function ArchivoXLSX(){
        const Taller = [];
        var item = {
            Nombre: Nombre,
            Descripci??n: Descripcion,
            Fechas: Fechas,
            Horarios: Horarios,
            ImpartidoPor: ImpartidoPor,
            Prerrequisitos: Prerequisitos,
            VirtualPresencial: VirtualPresencial,
            LigaLugar: InformacionConfidencial
        }
        Taller.push (item);

        //Solo despues de que se genera el arreglo de objetos Participantes, se genera el archivo
        getParticipantes().then((Participantes) => {
            hacerArchivo(Taller, Participantes);
        });
    }

    //esta funcion regresa los dias que se da la clase
    function checkDays () {
        let myUpdatedDates = "";
        for(var i=0; i < selectedDays.length; i++){
            switch(selectedDays.charAt(i)){
                case 'L':
                    i > 0 ? myUpdatedDates += ", Lunes" : myUpdatedDates += "Lunes"
                    break;
                case 'M':
                    i > 0 ? myUpdatedDates += ", Martes" : myUpdatedDates += "Martes"
                    break;
                case 'W':
                    i > 0 ? myUpdatedDates += ", Mi??rcoles" : myUpdatedDates += "Mi??rcoles"
                    break;
                case 'J':
                    i > 0 ? myUpdatedDates += ", Jueves" : myUpdatedDates += "Jueves"
                    break;
                case 'V':
                    i > 0 ? myUpdatedDates += ", Viernes" : myUpdatedDates += "Viernes"
                    break;
                case 'S':
                    i > 0 ? myUpdatedDates += ", S??bado" : myUpdatedDates += "S??bado"
                    break;
                default:
                    i > 0 ? myUpdatedDates += ", Domingo" : myUpdatedDates += "Domingo"
                    break;
            }
        }
        return myUpdatedDates;
    }

    //esta funcion regresa una fecha en formato ${day} de ${month} de ${year}
    function StyleFecha(fecha){
        const year = fecha.substring(0, 4);
        const monthNumber = fecha.substring(5, 7);
        const day = fecha.substring(8);
        let month = "";

        switch(monthNumber){
            case '01':
                month = "enero";
                break;
            case '02':
                month = "febrero";
                break;
            case '03':
                month = "marzo";
                break;
            case '04':
                month = "abril";
                break;
            case '05':
                month = "mayo";
                break;
            case '06':
                month = "junio";
                break;
            case '07':
                month = "julio";
                break;
            case '08':
                month = "agosto";
                break;
            case '09':
                month = "septiembre";
                break;
            case '10':
                month = "octubre";
                break;
            case '11':
                month = "noviembre";
                break;
            default:
                month = "diciembre";
                break;
        }

        return `${day} de ${month} de ${year}`;
    }


    return(
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}
        >
            <div>
                <div style={{padding: "50px", textAlign: "center", background: "#864fba", color: "#fdfffc", fontSize: "30px"}}>
                </div>
                <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
                    <h1>{Nombre}</h1>
                    <h5>Impartido por:</h5>
                    <h4>{ImpartidoPor}</h4>
                    {isCapped==='true'? <h5>Cupo lleno</h5>:
                      <div>
                        <h5>Cupo: {participantes.length+" de "+maxCap}</h5>
                      </div>
                    }
                </div>
                <div className='container'>
                    <h3>Descripci??n:</h3>
                    <p>{Descripcion}</p>
                </div>
                <div className='container'>
                    <h3>Fechas:</h3>
                    <p>Fecha de inicio: {StyleFecha(Fechas)}</p>
                    <p>Fecha de cierre: {StyleFecha(FechaCierre)}</p>
                </div>
                <div className='container'>
                    <h3>Horarios:</h3>
                    <p>De {Horarios} a {HorarioFin}</p>
                </div>
                <div className='container'>
                    <h3>D??as que se imparte el taller:</h3>
                    <p>{checkDays()}</p>
                </div>
                <div className='container'>
                    <h3>Prerrequisitos:</h3>
                    <p>{Prerequisitos}</p>
                </div>

          <div className='container'>
              <h3>??Virtual o presencial?</h3>
              <p>{VirtualPresencial}</p>
          </div>

          {location.state.EsAdmin &&
          <Button onClick={ArchivoXLSX}>Descargar informaci??n</Button>
          }

          {(location.state.EstaInscrito || location.state.EsAdmin) &&
          <div className='container'>
          {/*
          aqui va la parte de la informacion secreta, primero hay que hacer la variable InfoSecreta en registro talleres (el del admin) para que se guarde en firebase, luega se hace aqui un condicional para mostrar la informacion secreta si el usuario esta inscrito (por ahora pasa eso como un prop tipo <DetalleTaller EstaInscrito={true}/>)

          asi se ponen los ifs aqui
          <p>{props.EstaInscrito ? {InformacionSecreta} : "para ver esta informacion primero inscriba el taller"}</p>
          */}
          <h3>Liga o lugar del taller:</h3>
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
                <div style={{padding: "50px", textAlign: "center", color: "gray", fontSize: "18px"}}>
                    <p> Si tiene dudas, puede contactar al correo: <a href="mailto:axtateen@csoftmty.org">axtateen@csoftmty.org</a> o al correo: <a href="mailto:capitalhumano@csoftmty.org">capitalhumano@csoftmty.org</a></p>
                </div>
      </div>
    </Box>
  )
}

export default DetalleTaller