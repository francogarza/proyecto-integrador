import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {db} from '../firebase';
import { useNavigate } from 'react-router-dom'
import {ref,onValue,remove} from 'firebase/database';
import { Button, CardMedia, CardActionArea, CardActions } from '@mui/material';
import emailjs from 'emailjs-com';

//el ejemplo de taller, el url de la foto es la imagen que se muestra cuando no se sube una foto para el taller
const mockTaller = {
    Descripcion:"Durante cada sesión, se darán problemas atractivos a resolver para que el alumno enfrente el problema y emita ideas para empezar a resolver un problema. El profesor guiará esas ideas para estructurarlas y así establecer una heurística de solución.",
    Nombre:"Pensamiento matemático",
    Foto:"https://static.wixstatic.com/media/11062b_95f33af43bcb43098b2b61bf13a443f3~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_640,h_976,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_95f33af43bcb43098b2b61bf13a443f3~mv2_d_5472_3648_s_4_2.jpg"
}


export default function TallerCard(props){
    let navigate = useNavigate();

    //funcion que lleva a /detalle-taller
    const irTaller = () =>{
        let path = '/detalle-taller';
        navigate(path, {state:{id:props.id,EstaInscrito:props.EstaInscrito,EsAdmin:props.EsAdmin}});
    }

    // funcion que lleva a /registro-taller-admin con flag de update
    const editarTaller = () =>{
        let path = '/registro-taller-admin';
        navigate(path, {state:{isUpdate:true,id:props.id}});
    }

    // funcion para mandar correo a todos los participantes una vez que se borra un taller
    const enviarCorreoATodosLosParticipantes = (props) => {
        onValue(ref(db,'Taller/'+props.id),(snapshot) => {
            const data = snapshot.val();
            if(data !== null){
                for (const [key, value] of Object.entries(data.participantes)) {
                    enviarCorreoCancelacionTaller(value)
                  }
            }
        });
    };

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

    //funcion que manda el correo individal a los participantes
    const enviarCorreoCancelacionTaller = (value) => {
        console.log("enviarCorreoCancelacion")
        const values = {
          subject: `Axtateen: Cancelacion de taller ${props.Nombre}`,
          email: value.Mail,
          message: `<b>Axtateen</b> le informamos:
          <br>
          <ul>
              <li>El taller <b>${props.Nombre}</b> en el cual su hijo <b>${value.NombreU}</b> esta inscrito, ha sido <b>CANCELADO</b>.
              <li>Le invitamos visitar el catalogo de talleres disponibles para encontrar un taller de su agrado.
          </ul>
          <br>
          <b>Atentamente</b>,
          <br>
          <b>Axtateen</b>`
        };
        handleSubmit(values);
    }

    //funcion para borrar el taller
    const handleDelete = (e) => {
        enviarCorreoATodosLosParticipantes(props);
        remove(ref(db,'Taller/' + e));
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
                            Ver más
                        </Button>
                    </div>
                ) 
                : (
                <Button size="small" color="primary" onClick={irTaller}>
                    Ver más
                </Button>)}
                
                {props.EsAdmin && <Button size="small" color="error" onClick={() => handleDelete(props.id)}>Borrar taller</Button>}
            </CardActions>
        </Card>
    )
}