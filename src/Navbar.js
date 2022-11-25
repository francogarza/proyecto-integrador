import React, {useContext} from 'react';
import { styled} from '@mui/material/styles';
import PropTypes from 'prop-types';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppsIcon from '@mui/icons-material/Apps';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Face3Icon from '@mui/icons-material/Face3';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const drawerWidth = 240;

//funcion de estilizado del navbar
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function Navbar() {
    //variables globales
    const {isLoggedIn,setIsLoggedIn} = useContext(UserContext);
    const {EsAdmin,setEsAdmin} = useContext(UserContext)
    const {parentId,setParentId} = useContext(UserContext);

    //variables locales
    const [open, setOpen] = React.useState(true);
    let navigate = useNavigate();

    //funcion para abrir y cerrar el navbar
    const toggleDrawer = () => {
        setOpen(!open);
    };

    //funcion para cerrar la sesion
    function handleLogOut() {
        if(EsAdmin){
            setEsAdmin(false);
        }else{
            setIsLoggedIn(false);
            setParentId(null);
        }
        navigate("/catalogo-talleres"); // whichever component you want it to route to
    }
    
    return (
        <Drawer variant="permanent" open={true}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft: '10px',
                marginTop: '10px',
                px: [1],
                }}
            >
                <img src={require('./Assets/LogoAxtateen.png')} width="120" height="50"/>
            </Toolbar>
            <List component="nav">
                <Link onClick={() => navigate("/catalogo-talleres")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Catálogo de talleres" />
                    </ListItemButton>
                </Link>
                {isLoggedIn ? <Link onClick={() => navigate("/talleres-inscritos")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText primary="Talleres inscritos" />
                    </ListItemButton>
                </Link> : null}
                {isLoggedIn ?<Link onClick={() => navigate("/manage-children")} >
                    <ListItemButton>
                        <ListItemIcon>
                            <Face3Icon />
                        </ListItemIcon>
                        <ListItemText primary="Manejo de hijos" />
                    </ListItemButton>
                </Link> : null}
                {!EsAdmin && !isLoggedIn ? <Link onClick={() => navigate("/registro-padres")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Crear cuenta nueva" />
                    </ListItemButton>
                </Link> : null}
                {EsAdmin ? <Link onClick={() => navigate("/registro-taller-admin")} >
                    <ListItemButton>
                        <ListItemIcon>
                            <OpenInBrowserIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nuevo taller" />
                    </ListItemButton>
                </Link> : null}
                {EsAdmin ? <Link onClick={() => navigate("/borrar-cuenta")} >
                    <ListItemButton>
                        <ListItemIcon>
                            <OpenInBrowserIcon />
                        </ListItemIcon>
                        <ListItemText primary="Borrar cuenta" />
                    </ListItemButton>
                </Link> : null}
                {isLoggedIn || EsAdmin ? <Link onClick={handleLogOut} >
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton> 
                </Link> : null }
                {!isLoggedIn && !EsAdmin ? <Link onClick={() => navigate("/login")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Iniciar sesión" />
                    </ListItemButton>
                </Link> : null }
                <Divider sx={{ my: 1 }} />
            </List>
            <Toolbar
                sx={{
                position: 'absolute',
                bottom: '0',
                marginLeft: 'auto',
                marginRight: 'auto',
                left: '0',
                right: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: [1],
                }}
            >
                <img src={require('./Assets/LogoCSOFTMty.png')} width="150" height="50"/>
            </Toolbar>
        </Drawer>
        );
}

Navbar.propTypes = {
    children: PropTypes.node,
};

export default Navbar;