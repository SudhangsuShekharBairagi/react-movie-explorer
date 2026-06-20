import { useContext } from "react";

// Import the contexts from their provider files
import { MovieContext, SeriesContext } from "./PersonCreditesContext";

export const useMovieContext = () => useContext(MovieContext);
export const useSeriesContext = () => useContext(SeriesContext);
