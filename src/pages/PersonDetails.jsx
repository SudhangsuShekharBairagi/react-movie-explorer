

import React, { useEffect, lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "../dataFetch/tmdb";
import Style from "./MovieDetails.module.css";
import { useMovieContext, useSeriesContext } from "../context/PersonCreditesContext";
import { usePersonDetails } from "../context/PersonDetailsContext";
import { LoadingDetails, LoadingMovieCard } from "../Component2/LoadingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// ✅ Lazy load heavy scroll components to improve INP
const MoviesScroll = lazy(() => import("../component/MoviesScroll"));
const SeriesScroll = lazy(() => import("../component/SeriesScroll"));

const PersonDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { moviesByActor, setMoviesByActor } = useMovieContext();
    const { seriesByActor, setSeriesByActor } = useSeriesContext();
    const { person, fetchPersonDetails, loading, error } = usePersonDetails();

    // Fetch movies by actor
    useEffect(() => {
        if (!moviesByActor[id]) {
            fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch movies");
                    return res.json();
                })
                .then((data) => {
                    setMoviesByActor((prev) => ({
                        ...prev,
                        [id]: data.cast,
                    }));
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    // Fetch series by actor
    useEffect(() => {
        if (!seriesByActor[id]) {
            fetch(`${BASE_URL}/person/${id}/tv_credits?api_key=${API_KEY}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch series");
                    return res.json();
                })
                .then((data) => {
                    setSeriesByActor((prev) => ({
                        ...prev,
                        [id]: data.cast,
                    }));
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    // Fetch person details
    useEffect(() => {
        if (id) fetchPersonDetails(id);
    }, [id]);

    if (loading) return (<LoadingDetails />);
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!person) return <p>No person found</p>;

    return (
        <div className={Style.movieDetails}>
            {/* Title Section */}
            <button onClick={() => navigate(-1)} className={Style.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={Style.title}>
                <h1>{person.name}</h1>
                {person.also_known_as?.length > 0 && (
                    <p>{person.also_known_as.join(", ")}</p>
                )}
            </div>

            {/* Details Section */}
            <div className={Style.details}>
                <div className={Style.imageBox}>
                    <img
                        className={Style.movieImg}
                        src={IMAGE_BASE_URL + person.profile_path}
                        alt={person.name}
                        loading="lazy"
                    />
                </div>

                <div className={Style.infoMovie}>
                    <p>{person.biography || "No biography available."}</p>
                    <p>
                        <b>Known For:</b> {person.known_for_department}
                    </p>
                    <p>
                        <b>Birthday:</b> {person.birthday || "Unknown"}
                    </p>
                    <p>
                        <b>Place of Birth:</b> {person.place_of_birth || "Unknown"}
                    </p>
                    {person.deathday && (
                        <p>
                            <b>Death:</b> {person.deathday}
                        </p>
                    )}
                </div>
            </div>

            {/* Movies Section */}
            <h1 className={Style.castH1}>Movies</h1>
            <Suspense fallback={<LoadingMovieCard />}>
                <MoviesScroll movies={moviesByActor[id] || []} />
            </Suspense>

            {/* Series Section */}
            <h1 className={Style.castH1}>Series</h1>
            <Suspense fallback={<LoadingMovieCard />}>
                <SeriesScroll series={seriesByActor[id] || []} />
            </Suspense>
        </div>
    );
};

export default PersonDetails;
