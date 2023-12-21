import React from "react";

import './style.css'


import Navbar from "../navbar";
import Footer from "../footer";
import PokeAPIExample from "../cards";


export default function Home(){
    return(
        <div className="container">
            <Navbar/>
            <PokeAPIExample/>
            <Footer />
        </div>
    )
}