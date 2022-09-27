import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RegistroPadres from './RegistroPadres.js';
import RegistroTaller from './RegistroTaller.js';
import RegistroTalleres from './RegistroTalleres.js';
import CatalogoTalleres from './CatalogoTalleres.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>crud demo</h1>
    <App />
    <h1>registro padres</h1>
    <RegistroPadres />
    <h1>registro taller (usuario)</h1>
    <RegistroTaller />
    <h1>registro talleres (admin)</h1>
    <RegistroTalleres  isUpdate={true} id="e9ab6a288b2"/>
    <h1>catalogo talleres </h1>
    <CatalogoTalleres />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
