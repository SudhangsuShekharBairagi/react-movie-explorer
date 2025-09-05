import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard';
import style from "./ListOfContext.module.css"
import { useIndianMovies, usePopular, useTopRated, useTrending, useUpcoming } from '../context/MovieContext';
import { LoadingMovieDetails } from '../Component2/LoadingCard';

const hookMap = {
    Trending: useTrending,
    TopRated: useTopRated,
    Popular: usePopular,
    Upcoming: useUpcoming,
    IndianMovies: useIndianMovies,
};


const ListOfContent = () => {
    const { name } = useParams();
    const { id } = useParams();
    console.log(id);
    const hook = hookMap[name] || (() => ({ data: [], loading: false, error: null }));

    const { data: movies, loading, error } = hook();
    if (loading) return (<LoadingMovieDetails />);
    if (error) return <p>Error: {error}</p>;
    // console.log(name);
    // console.log(movies);
    return (
        <div className={style.listBody} >
            <h1 className={style.listHiding}>{name} Movies</h1>
            <div className={style.list}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

        </div>
    )
}

export default ListOfContent