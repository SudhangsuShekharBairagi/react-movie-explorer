import { API_KEY, BASE_URL } from '../services/tmdb';
import Style from "./MovieCard.module.css"
import MoviesScroll from './MoviesScroll';
import { useTopRated } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import { LoadingMovieCard } from './LoadingCard';
const TopRated = () => {
    const { data: movies, loading, error } = useTopRated();
    const navigate = useNavigate();

    if (error) return <p>Error: {error}</p>;
    return (
        <div className={Style.categoryName}>

            <div style={{ display: "flex", justifyContent: "space-between" }} >
                <h1 className={Style.categoryH1}>Top Rated</h1>
                <button className={Style.allDetailsButton} onClick={() => navigate(`/list/TopRated`)}>&#10095;</button>
            </div>
            {loading ? <LoadingMovieCard /> : <MoviesScroll movies={movies} />}
        </div>
    )
}

export default TopRated
