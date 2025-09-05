import { API_KEY, BASE_URL } from "../dataFetch/tmdb";
import { createDataContext } from "./createDataContext";

function fetchPopular() {
    return fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=1`);
}

export const [PopularPeopleProvider, usePopularPerson] = createDataContext(fetchPopular);
function fetchTrending() {
    return fetch(`${BASE_URL}/trending/person/week?api_key=${API_KEY}&language=en-US&page=1`);
}

export const [TrendingPeopleProvider, useTrendingPerson] = createDataContext(fetchTrending);