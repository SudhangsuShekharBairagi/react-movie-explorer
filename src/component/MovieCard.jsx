import { IMAGE_BASE_URL } from "../dataFetch/tmdb";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Style from "./MovieCard.module.css"

export default function MovieCard({ movie }) {
    const navigate = useNavigate();

    // console.log(movie);

    return (
        <div className={Style.moiveCard} >

            <Link to={`/movie/${movie.id}`}>
                <img className={Style.cardImg}
                    src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : "https://via.placeholder.com/200"}
                    alt={movie.title}
                />
            </Link>
            <h3 className={Style.MovieName}>{movie.title}</h3>
            <div className={Style.buttonRating}>
                <p className={Style.movieRating}>⭐ {movie.vote_average}</p>
                <button onClick={() => navigate(`/movie/${movie.id}`)}>Details</button>
            </div>
        </div>
    );
}
