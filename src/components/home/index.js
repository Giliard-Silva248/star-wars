import React from "react";

import './style.css'

import Card from "../cards";
import Navbar from "../navbar";
import Footer from "../footer";


export default function Home(){
    return(
        <div className="container">
            <Navbar/>
            <Card />
            <Footer />
        </div>
    )
}