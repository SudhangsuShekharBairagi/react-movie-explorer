
import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, BASE_URL, getMovieDetails, IMAGE_BASE_URL } from "../dataFetch/tmdb";
import Style from "./MovieDetails.module.css";
import { LoadingDetails, LoadingPerson } from "../Component2/LoadingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Lazy load PeopleCard (reduces initial paint time)
const PeopleCard = lazy(() => import("../Component2/PeopleCard"));

export default function MovieDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;

    // Fetch cast members
    useEffect(() => {
        if (!url) return;

        const FetchPerson = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setPersons(data.cast || []);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        FetchPerson();
    }, [url]);

    // Fetch movie details
    useEffect(() => {
        getMovieDetails(id).then(setMovie);
    }, [id]);

    // Format numbers into Indian short form
    function formatIndianNumber(num) {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(1).replace(/\.0$/, "") + " Cr";
        } else if (num >= 100000) {
            return (num / 100000).toFixed(1).replace(/\.0$/, "") + " L";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, "") + " K";
        }
        return num.toString();
    }

    // ✅ Memoize expensive values so they don’t recalc every render
    const formattedVoteCount = useMemo(
        () => (movie ? formatIndianNumber(movie.vote_count) : ""),
        [movie]
    );

    const formattedBudget = useMemo(
        () => (movie ? formatIndianNumber(movie.budget * 83) : ""),
        [movie]
    );

    const formattedRevenue = useMemo(
        () => (movie ? formatIndianNumber(movie.revenue * 83) : ""),
        [movie]
    );

    if (!movie) return (<LoadingDetails />);
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className={Style.movieDetails}>
            {/* Title Section */}
            <button onClick={() => navigate(-1)} className={Style.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={Style.title}>
                <h1>
                    {movie.title} ({movie.original_title})
                </h1>
                <p>
                    {movie.tagline} - {movie.genres.map((g) => g.name).join(", ")} -{" "}
                    {(movie.runtime / 60).toFixed(2)}h
                </p>
            </div>

            {/* Details Section */}
            <div className={Style.details}>
                <div className={Style.imageBox}>
                    {movie.adult && (
                        <img
                            className={Style.imageMovie18}
                            src="/public/Image18+.jpeg"
                            alt="18+"
                        />
                    )}
                    <img
                        className={Style.movieImg}
                        src={IMAGE_BASE_URL + movie.poster_path}
                        alt={movie.title}
                        loading="lazy"
                    />
                </div>

                <div className={Style.infoMovie}>
                    <p>{movie.overview}</p>
                    <p>
                        ⭐{movie.vote_average.toFixed(1)}
                        <span style={{ color: "grey" }}>/10</span> {formattedVoteCount}
                    </p>
                    <p>
                        <b>Release:</b> {movie.release_date}
                    </p>
                    <p>
                        <b>Budget:</b> {formattedBudget}
                    </p>
                    <p>
                        <b>Revenue:</b> {formattedRevenue}
                    </p>
                    <p>
                        <b>Country:</b>{" "}
                        {movie.production_countries.map((c) => c.name).join(", ")}
                    </p>
                    <p>
                        <b>Spoken Languages:</b>{" "}
                        {movie.spoken_languages
                            .map((lan) => `${lan.english_name} (${lan.name})`)
                            .join(", ")}
                    </p>
                    <p>
                        <b>Production Houses:</b>
                    </p>

                    <div className={Style.productionCompanies}>
                        {movie.production_companies.map((company) => (
                            <div key={company.id}>
                                {company.logo_path && (
                                    <img
                                        loading="lazy"
                                        src={IMAGE_BASE_URL + company.logo_path}
                                        alt={company.name}
                                    />
                                )}
                                <p>{company.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cast Section */}
            <div>
                <h1 className={Style.castH1}>Cast</h1>
                {loading ? (
                    <LoadingPerson />
                ) : (
                    <Suspense fallback={<LoadingPerson />}>
                        <PeopleCard persons={persons} />
                    </Suspense>
                )}
            </div>
        </div>
    );
}
