import { createContext, useState, useContext } from "react";
import { API_KEY, BASE_URL } from "../dataFetch/tmdb";

export const PersonContext = createContext();

export const PersonDetailsProvider = ({ children }) => {
    const [person, setPersonDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPersonDetails = async (personId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `${BASE_URL}/person/${personId}?api_key=${API_KEY}`
            );
            if (!res.ok) throw new Error("Failed to fetch person details");
            const data = await res.json();
            if (!data || data.length === 0) {
                setError("Not Found");
            } else {
                setPersonDetails(data);
            }
        } catch (err) {
            setError(err.message);
            setPersonDetails(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PersonContext.Provider value={{ person, fetchPersonDetails, loading, error }}>
            {children}
        </PersonContext.Provider>
    );
};

export const usePersonDetails = () => useContext(PersonContext);
