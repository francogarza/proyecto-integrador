import React, {useEffect, useState, useCallback} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppsIcon from '@mui/icons-material/Apps';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LoginIcon from '@mui/icons-material/Login';
import Face3Icon from '@mui/icons-material/Face3';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

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
    const [open, setOpen] = React.useState(true);

    let navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    return (
        <Drawer variant="permanent" open={!open}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    { open ? <ChevronRightIcon /> : <ChevronLeftIcon /> }
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <Link href="/catalogo-talleres">
                    <ListItemButton>
                        <ListItemIcon>
                            <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Catalogo Talleres" />
                    </ListItemButton>
                </Link>
                <Link href="/talleres-inscritos">
                    <ListItemButton>
                        <ListItemIcon>
                            <AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText primary="Talleres Inscritos" />
                    </ListItemButton>
                </Link>
                <Link href="/horario-taller" >
                    <ListItemButton>
                        <ListItemIcon>
                            <ScheduleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Horario" />
                    </ListItemButton>
                </Link>
                <Link href="/login" >
                    <ListItemButton>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log In" />
                    </ListItemButton>
                </Link>
                <Link href="/manage-children" >
                    <ListItemButton>
                        <ListItemIcon>
                            <Face3Icon />
                        </ListItemIcon>
                        <ListItemText primary="Manejo de Hijos" />
                    </ListItemButton>
                </Link>
                <Link href="/registro-padres" >
                    <ListItemButton>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nueva cuenta" />
                    </ListItemButton>
                </Link>
                <Link href="/catalogo-talleres-admin" >
                    <ListItemButton>
                        <ListItemIcon>
                            <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Talleres ADMIN" />
                    </ListItemButton>
                </Link>
                <Link href="/registro-taller-admin" >
                    <ListItemButton>
                        <ListItemIcon>
                            <OpenInBrowserIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nuevo Taller" />
                    </ListItemButton>
                </Link>
                <Divider sx={{ my: 1 }} />
            </List>
        </Drawer>
        );
}

Navbar.propTypes = {
    children: PropTypes.node,
};

export default Navbar;