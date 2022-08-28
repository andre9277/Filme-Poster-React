import React from "react"

const CaixaProcura = (props) =>{
    return(
        <div>
            <label for="movie">
                <input 
                    class="cxProcura" 
                    placeholder="Escreva aqui o filme..."
                    value = {props.value}
                    onChange = {(event)=> props.setSearchMovie(event.target.value)}>
                </input>
            </label>
        </div>
    )
}


export default CaixaProcura