import React, {Component} from "react";
import api from "../../services/api";
import { render } from "@testing-library/react";

class Card extends Component{

    state={
        peaple: []
    }

    async componentDidMount(){
        const response = await api.get('')


        this.setState({peaple: response.data})
    }

    render(){

        const {peaple} = this.state
        return(
            <div>
                <p>olá</p>
                {console.log(peaple)}
                
            </div>
        )
    }
}


export default Card