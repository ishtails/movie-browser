import "./Main.css"
import React from 'react'
import SearchIcon from "./search.svg"
import MovieCard from "./moviecard"
import { useState } from 'react'

import { useEffect } from 'react';

const API = "http://www.omdbapi.com/?i=tt3896198&apikey=3e57f0cd";

const App = ()=>{
    
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    const searchMovies = async (title) => {
        const response = await fetch(`${API}&s=${title}`)
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies("Home");
    }, []);

    return(
        <div className='app'>
            <h1> MovieLand </h1>

            <div className='search'>
                <input 
                    placeholder='Search for Movies'
                    value = {searchTerm} 
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                    onKeyUp={()=>{searchMovies(searchTerm)}}
                    />

                <img 
                    src={SearchIcon} 
                    alt='search' 
                    onClick={()=>{searchMovies(searchTerm)}}/>
            </div>

            {
                movies?.length > 0 ? (
                    <div className='container'>
                        {movies.map((movie)=>(
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                    
                ) : (
                    <div>
                        <h2>No Movies Found!</h2>
                    </div>
                )
            }
        </div>
    )
}

export default App