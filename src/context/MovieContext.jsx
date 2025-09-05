import { API_KEY, BASE_URL } from "../dataFetch/tmdb";
import { createDataContext } from "./createDataContext";

function fetchTrending() {
    return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
}

export const [TrendingProvider, useTrending] = createDataContext(fetchTrending);


function fetchUpcoming() {
    return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
}

export const [UpcomingProvider, useUpcoming] = createDataContext(fetchUpcoming);



function fetchTopRated() {
    return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
}

export const [TopRatedProvider, useTopRated] = createDataContext(fetchTopRated);


function fetchIndianMovies() {
    return fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=IN`);
}

export const [IndianMoviesProvider, useIndianMovies] = createDataContext(fetchIndianMovies);

function fetchPopular() {
    return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
}

export const [PopularProvider, usePopular] = createDataContext(fetchPopular);