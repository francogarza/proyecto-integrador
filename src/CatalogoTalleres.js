import React from 'react';
import TallerCard from './components/TallerCard.js';

const CatalogoTalleres = () => {
    
  return(
    <div>
        <div style={{padding: "50px", textAlign: "center", background: "#864fba", color: "#fdfffc", fontSize: "30px"}}>
            <h1> Catalogo de talleres </h1>
            <p> Talleres disponibles </p>
        </div>
        <div style={{padding: "30px", textAlign: "center", overflow: "hidden", float: "center"}}>
            <div style={{display: "inline-block"}}>
                <TallerCard></TallerCard>
            </div>
            <div style={{display: "inline-block"}}>
                <TallerCard></TallerCard>
            </div>
            <div style={{display: "inline-block"}}>
                <TallerCard></TallerCard>
            </div>
            <div style={{display: "inline-block"}}>
                <TallerCard></TallerCard>
            </div>
            <div style={{display: "inline-block"}}>
                <TallerCard></TallerCard>
            </div>
        </div>
    </div>
  )
}

export default CatalogoTalleres