import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {db} from '../firebase';
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import {set,ref,onValue,remove,update} from 'firebase/database';
import { Button, CardMedia, CardActionArea, CardActions } from '@mui/material';

const mockTaller = {
    Descripcion:"Durante cada sesión, se darán problemas atractivos a resolver para que el alumno enfrente el problema y emita ideas para empezar a resolver un problema. El profesor guiará esas ideas para estructurarlas y así establecer una heurística de solución.",
    Nombre:"Pensamiento matemático",
    Foto:"https://static.wixstatic.com/media/11062b_95f33af43bcb43098b2b61bf13a443f3~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_640,h_976,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_95f33af43bcb43098b2b61bf13a443f3~mv2_d_5472_3648_s_4_2.jpg"
}

export default function TallerCard(props){
    let navigate = useNavigate();
    const irTaller = () =>{
        let path = '/detalle-taller';
        navigate(path, {state:{id:props.id,EstaInscrito:props.EstaInscrito,EsAdmin:props.EsAdmin}});
    }
    const editarTaller = () =>{
        let path = '/registro-taller-admin';
        navigate(path, {state:{isUpdate:true,id:props.id}});
    }

    const [participantes,setParticipantes] = useState([]);

    const enviarCorreoATodosLosParticipantes = (e) => {
        onValue(ref(db,'Taller/16a2b3ee056'),(snapshot) => {
        // onValue(ref(db,'Taller/16a2b3ee056'),(snapshot) => {
            const data = snapshot.val();
            if(data !== null){
                data.participantes.map(function (name) {
                    console.log(name)
                })
                console.log(participantes)
                console.log("test1")
                console.log(data.participantes)
            }
        });
        for (let i = 0; i < participantes.length; i++) { 
            console.log(participantes[i])
        }
        // var templateParams = {
        //     nombre_taller: Nombre,
        //     nombre_hijo: NombreU,
        //     link_talleres_inscritos: 'http://localhost:3000/talleres-inscritos',
        //     // quitar este comment para mandar al correo del usuario
        //     // to_email: Correo,
        //     // quitar este comment para usar mi direccion de correo y hacer pruebas 
        //     to_email: 'francogarza98@gmail.com'
        // };
        // emailjs.send('service_l68b4ed', 'template_jrfyyws', templateParams, '7VB8KWioxv21zM4iQ')
        //     .then(function(response) {
        //     console.log('SUCCESS!', response.status, response.text);
        //     }, function(error) {
        //     console.log('FAILED...', error);
        // });
    };
    //delete
    const handleDelete = (e) => {
        remove(ref(db,'Taller/' + e));
        // console.log("hello")
        // enviarCorreoATodosLosParticipantes(e);
    }

    return (
        <Card sx={{ minWidth: 300, maxWidth: 300,borderRadius:'15%'}} style={{margin: 30}}>
            <CardActionArea>
                <CardMedia
                component = "img"
                height = "150"
                image = {props.imgUrl == null? mockTaller.Foto:props.imgUrl}
                alt = "Taller"
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom justifyContent="center" textAlign="center">
                        {props.Nombre}
                    </Typography>
                    <Typography variant="body2" noWrap="true" color="text.secondary" justifyContent="center" textAlign="center">
                        {props.Descripcion}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                {props.EsAdmin ? (
                    <div>
                        <Button size="small" color="primary" onClick={editarTaller}>
                            Actualizar
                        </Button>

                        <Button size="small" color="primary" onClick={irTaller}>
                            Ver mas
                        </Button>
                    </div>
                ) 
                : (
                <Button size="small" color="primary" onClick={irTaller}>
                    Ver mas
                </Button>)}
                
                {props.EsAdmin && <Button size="small" color="error" onClick={() => handleDelete(props.id)}>Borrar taller</Button>}
            </CardActions>
        </Card>
    )
}