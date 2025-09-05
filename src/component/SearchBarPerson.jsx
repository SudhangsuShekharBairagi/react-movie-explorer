import React, { useEffect, useState } from 'react'
import Style from "./MovieCard.module.css"
import { API_KEY, BASE_URL } from '../dataFetch/tmdb';

import { useSearch } from '../context/SearchContext';
import PeopleCard from '../Component2/PeopleCard';
import { LoadingPerson } from '../Component2/LoadingCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
const SearchBarPerson = () => {
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const { results, loading, error, search } = useSearch();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        search("person", query);

    }

    return (
        <div className={Style.searchBarHeading}>
            <button onClick={() => navigate('/')} className={Style.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={Style.formBgP}>
                <h1 className={Style.gradientText}>Welcome </h1>
                <h4>Find Your Favourite Actor </h4>
                <form className={Style.searchBar} onSubmit={handleSearch}>
                    <input
                        className={Style.Searchinput}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search a actor name...'
                    />
                    <button className={Style.Searchbutton} type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /> </button>
                </form>
            </div>

            <div className={Style.searchBarBody}>
                {loading ? <LoadingPerson /> : (<PeopleCard persons={results} key={results.id} />)}
                {error && <p>Error: {error}</p>}
            </div>

        </div>
    )
}

export default SearchBarPerson