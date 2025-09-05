import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [moviesByActor, setMoviesByActor] = useState({});

    return (
        <MovieContext.Provider value={{ moviesByActor, setMoviesByActor }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => useContext(MovieContext);


const SeriesContext = createContext();

export const SeriesProvider = ({ children }) => {
    const [seriesByActor, setSeriesByActor] = useState({});

    return (
        <SeriesContext.Provider value={{ seriesByActor, setSeriesByActor }}>
            {children}
        </SeriesContext.Provider>
    );
};

export const useSeriesContext = () => useContext(SeriesContext);


