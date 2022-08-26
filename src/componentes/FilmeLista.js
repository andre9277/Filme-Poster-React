import React from 'react'
import "./FilmeLista.css"

//Função componente (arrow function)
const FilmeLista = props =>{
    //return uma lista de filmes
    return(
        //Para cada filme queremos que esteja num div
        //Função map para apresentar cada filme
        <>
            {props.movies.map((movie, index)=> 
                                <div>
                                    <img src={movie.Poster} alt= "movies" ></img>
                                </div>
                             )}
        </>
    )
}

export default FilmeLista;