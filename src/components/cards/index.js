import React from "react";
import './style.css'
import minhaImg from '../../img/teste.jpg'

export default function Card(){
    return(

        <div className="container-card">
            <h3>NOME</h3>
            <div className="container-img">
                <img src={minhaImg} alt="Minha Imagem" />
            </div>
            <div className="info"><span>Nascimento</span> <span>Gênero</span></div>
        </div>
    )
}