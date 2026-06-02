import { API_KEY, BASE_URL } from '../services/tmdb';
import Style from "./MovieCard.module.css"
import MoviesScroll from './MoviesScroll';
import { useUpcoming } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import { LoadingMovieCard } from './LoadingCard';
const UpcomingMovies = () => {
    const { data: movies, loading, error } = useUpcoming();
    const navigate = useNavigate();

    if (error) return <p>Error: {error}</p>;
    return (
        <div className={Style.categoryName}>
            <div style={{ display: "flex", justifyContent: "space-between" }} >
                <h1 className={Style.categoryH1}>Upcoming Movies</h1>
                <button className={Style.allDetailsButton} onClick={() => navigate(`/list/Upcoming`)}>&#10095;</button>
            </div>
            {loading ? <LoadingMovieCard /> : <MoviesScroll movies={movies} />}
        </div>
    )
}

export default UpcomingMovies
