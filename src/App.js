import './App.css';
import FilmeLista from './componentes/FilmeLista';
import { useState, useEffect } from 'react';
import FilmeTitulo from './componentes/FilmeTitulo';
import CaixaProcura from './componentes/CaixaProcura';
import AdcFav from './componentes/AdcFav';
import RemvFav from './componentes/RemvFav';

const App = () => {
    //criamos um objeto useState chamada movies que contém um array
    const[movies, setMovies] = useState([]);

    //para ver os favoritos- sempre que clicarmos no favorito vamos adicionar a variavel favorites e mostrar noutro componente
    const [favorites, setFavorites] = useState([])

    //criamos outro state objetc para que o utilizador procure pelo filme que desejar. Vai receber uma string
    const[searchMovie, setSearchMovie] = useState('');


    const getMovieRequest = async(searchMovie) => {
      //fazemos request a API
      const url= `http://www.omdbapi.com/?s=${searchMovie}&apikey=248242f6`; //como parametro na função passamos o filme escolhido pelo utilziador

      const response = await fetch(url);
      //converte a respota http para json
      const responseJson = await response.json();
      //Aparece na consola 
      console.log(responseJson);
      //Chamar o state do objeto movies
      if(responseJson.Search){
        //if uma vez que no inicio temos uma string vazia que não corresponde a nenhum filme
        setMovies(responseJson.Search)
      }
      
    }

    //Chamar a função getMoviesRequest, usamos um hook---useEffect é sempre chamado no render() que passa o searchMovie, que é uma empty string
    //,o request recebe o filme que o envia para o request -> vai para a resposta e conver em JSON. Se tivermos um resultado mostra o filme
    useEffect(()=>{
      getMovieRequest(searchMovie)//função vai ser chamada quando a página dá load
    }, [searchMovie]);//sempre que existe uma procura de um filme, quero fazer um request

    //Para mostrar os favoritos sempre usamos outro hook: useEffect
    useEffect(()=>{
      //converter a string para um objeto 
      const movieFav = JSON.parse(localStorage.getItem('react-movie-app-favourites'));

      if(movieFav){
        setFavorites(movieFav);
      }
      //adicionar um dependency array
    }, [] );

    //Função para cada vez que atualizarmos a página guardar os favoritos
    const saveToLocalStorage = items => {
      //damos uma chave que da save no items
      localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
    }


    const addFavouritesMovie = movie => {
      //copia do state array(atual array) que adiciona o movie
      const newFavList = [...favorites,movie]
      setFavorites(newFavList);

      saveToLocalStorage(newFavList);
    }

    //Remove o favorito do array
    const removeFavMovie = movie => {
      //filter retorna um novo array na qual comparamos com o id do filme
      const newFavList = favorites.filter((favorite) =>favorite.imdbID !== movie.imdbID );

      setFavorites(newFavList);
      saveToLocalStorage(newFavList);
    }

    //passamos os movies para o FilmeLista
  return (
    <div > 
      <div class="movieTitl">
        <FilmeTitulo 
          heading ='Filmes' />
        <CaixaProcura 
          searchMovie={searchMovie} 
          setSearchMovie={setSearchMovie}/>
      </div>
      <div class="row">
        <FilmeLista 
          movies ={movies} 
          handleFavouritesClick ={addFavouritesMovie} 
          favComponent={AdcFav}/>
      </div> 
      <div class="movieTitl">
        <FilmeTitulo 
          heading ='Favoritos' />
      </div>
      <div class="row">
        <FilmeLista 
          movies ={favorites} 
          handleFavouritesClick ={removeFavMovie} 
          favComponent={RemvFav}/>
      </div> 
    </div>
    );
}

export default App;
