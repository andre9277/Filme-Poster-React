import React from 'react'

//Função componente (arrow function)
const FilmeLista = props =>{

    const FavoriteComponent = props.favComponent;



    //return uma lista de filmes
    return(
        //Para cada filme queremos que esteja num div
        //Função map para apresentar cada filme
        <>
            {props.movies.map((movie, index)=> 
                                <div className='image-container'>
                                    <img src={movie.Poster} alt= "movies" ></img>
                                    <div onClick={()=>props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify content">
                                        <FavoriteComponent/>
                                    </div>
                                </div>
                             )}
        </>
    )
}

export default FilmeLista;