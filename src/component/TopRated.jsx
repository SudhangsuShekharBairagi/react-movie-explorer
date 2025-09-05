import { API_KEY, BASE_URL } from '../dataFetch/tmdb';
import Style from "./MovieCard.module.css"
import useMovies from '../hook/FetchMovies';
import MoviesScroll from './MoviesScroll';
import { useTopRated } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';
import { LoadingMovieCard } from '../Component2/LoadingCard';
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