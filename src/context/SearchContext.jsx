import { createContext, useContext, useState } from "react";
import { API_KEY, BASE_URL } from "../dataFetch/tmdb";

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [query, setQuery] = useState("");       // search input
    const [results, setResults] = useState([]);   // search results
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function search(type, q) {
        setQuery(q);
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${q}`);
            if (!res.ok) throw new Error("Failed to fetch search results");

            const data = await res.json();
            if (!data.results || data.results.length === 0) {
                setResults([]);
                setError(`No ${type} found for "${q}"`);   // ✅ set custom error
            } else {
                setResults(data.results);
            }
            // setResults(data.results || []);
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SearchContext.Provider value={{ query, results, loading, error, search }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}
