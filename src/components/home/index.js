import React from "react";

import './style.css'


import Navbar from "../navbar";
import Footer from "../footer";
import PokemonInfo from "../cards";


export default function Home(){
    return(
        <div className="container">
            <Navbar/>
            <PokemonInfo/>
            <Footer />
        </div>
    )
}