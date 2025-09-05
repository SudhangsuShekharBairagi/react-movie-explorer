import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Style from "./MovieCard.module.css"
import { useEffect, useRef } from "react";
import { IMAGE_BASE_URL } from '../dataFetch/tmdb'
import { ScrollProvider, useScrollCard } from '../context/ScrollContext';

const MoviesScrollCard = ({ movies }) => {

    const { scroll, containerRef } = useScrollCard();
    return (
        <div className={Style.scrollerWrapper}>
            <button className={`${Style.scroll_btn} ${Style.left}`} onClick={() => scroll(-1)}>
                &#10094;
            </button>
            <div className={Style.trendingMovies} ref={containerRef}>
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className={Style.moiveCard} key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    className={Style.cardImg}
                                    src={
                                        movie.poster_path
                                            ? IMAGE_BASE_URL + movie.poster_path
                                            : "https://via.placeholder.com/200"
                                    }
                                    alt={movie.title}
                                />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </div>

            <button className={`${Style.scroll_btn} ${Style.right}`} onClick={() => scroll(1)}>
                &#10095;
            </button>
        </div >
    )
}

const MoviesScroll = ({ movies }) => {
    return (
        <ScrollProvider >
            <MoviesScrollCard movies={movies} />
        </ScrollProvider>
    )
}

export default MoviesScroll