import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {db} from '../firebase';
import { withRouter } from 'react-router-dom'
import {set,ref,onValue,remove,update} from 'firebase/database';
import { Button, CardMedia, CardActionArea, CardActions } from '@mui/material';

const mockTaller = {
    Descripcion:"Durante cada sesión se darán problemas atractivos a resolver para que el alumno enfrente el problema y emita ideas para empezar a resolver un problema. El profesor guiará esas ideas para estructurarlas y así establecer una heurística de solución.",
    Nombre:"Pensamiento Matemático",
    Foto:"https://static.wixstatic.com/media/11062b_95f33af43bcb43098b2b61bf13a443f3~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_640,h_976,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_95f33af43bcb43098b2b61bf13a443f3~mv2_d_5472_3648_s_4_2.jpg"
}

export default function TallerCard(props){

    function handleUpdate(){
        //aqui no se como se llama la pantalla de <RegistroTalleres /> asi
        //<RegistroTalleres isUpdate={true} id={props.id}/>
    }

    //delete
    const handleDelete = (e) => {
        remove(ref(db,'Taller/' + e));
    }

    return (
        <Card sx={{ minWidth: 300, maxWidth: 300}} style={{margin: 30}}>
            <CardActionArea>
                <CardMedia
                component = "img"
                height = "150"
                image = {mockTaller.Foto}
                alt = "Taller"
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom justifyContent="center" textAlign="center">
                        {props.Nombre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" justifyContent="center" textAlign="center">
                        {props.Descripcion}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                {props.EsAdmin ? (
                    <Button size="small" color="primary" onClick={handleUpdate}>
                        Actualizar
                    </Button> 
                ) 
                : (
                <Button size="small" color="primary">
                    Inscribirse
                </Button>)}
                
                {props.EsAdmin && <Button size="small" color="error" onClick={() => handleDelete(props.id)}>borrar taller</Button>}
            </CardActions>
        </Card>
    )
}