import React, { useEffect, useState } from 'react'
import Style from "./MovieCard.module.css"
import MovieCard from './MovieCard';
import { useSearch } from '../context/SearchContext';
import { LoadingMovieDetails } from "../Component2/LoadingCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
const SearchBarMovies = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const { results, loading, error, search } = useSearch();
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        search("movie", query);
    }
    return (
        <div className={Style.searchBarHeading}>
            <button onClick={() => navigate('/')} className={Style.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={Style.formBgP}>
                <h1 className={Style.gradientText}>Welcome </h1>
                <h4>Find Your Favourite Movies</h4>
                <form className={Style.searchBar} onSubmit={handleSearch}>
                    <input
                        className={Style.Searchinput}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search a person movie...'
                    />
                    <button className={Style.Searchbutton} type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
            </div>

            <div className={Style.searchBarBody}>
                {loading && <LoadingMovieDetails />}
                {error && <p>Error: {error}</p>}

                {results.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}

            </div>

        </div>
    )
}

export default SearchBarMovies