import React from "react"
import "./CaixaProcura.css"

const CaixaProcura = (props) =>{
    return(
        <div>
            <label for="movie">
                <input 
                    className="form" 
                    placeholder="Escreva aqui o filme..."
                    value = {props.value}
                    onChange = {(event)=> props.setSearchMovie(event.target.value)}>
                </input>
            </label>
        </div>
    )
}


export default CaixaProcura