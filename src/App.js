import './App.css';
import FilmeLista from './componentes/FilmeLista';
import { useState, useEffect } from 'react';
import FilmeTitulo from './componentes/FilmeTitulo';
import CaixaProcura from './componentes/CaixaProcura';

const App = () => {
    //criamos um objeto useState chamada movies que contém um array
    const[movies, setMovies] = useState([]);
   

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

    //passamos os movies para o FilmeLista
  return (
    <div > 
      <div class="movieTitl">
        <FilmeTitulo heading ='Filmes' />
        <CaixaProcura searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>
      </div>
      <div class="row">
        <FilmeLista movies ={movies}/>
      </div>     
    </div>
    );
}

export default App;
