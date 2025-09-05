
import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import {
    API_KEY,
    BASE_URL,
    getTvDetails,
    IMAGE_BASE_URL,
} from "../dataFetch/tmdb";
import Style from "./MovieDetails.module.css";

// Lazy load cast list for better INP
const PeopleCard = lazy(() => import("../Component2/PeopleCard"));

export default function TVDetails() {
    const { id } = useParams();
    const [tv, setTv] = useState(null);
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const url = `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`;

    // Fetch cast
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

    // Fetch TV details
    useEffect(() => {
        getTvDetails(id).then(setTv);
    }, [id]);

    // Format numbers into Indian system
    function formatIndianNumber(num) {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(1).replace(/\.0$/, "") + " Cr";
        } else if (num >= 100000) {
            return (num / 100000).toFixed(1).replace(/\.0$/, "") + " L";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, "") + " K";
        }
        return num?.toString();
    }

    // Memoize formatted vote count
    const formattedVoteCount = useMemo(
        () => (tv ? formatIndianNumber(tv.vote_count) : ""),
        [tv]
    );

    if (!tv) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div className={Style.movieDetails}>
            {/* Title Section */}
            <div className={Style.title}>
                <h1>
                    {tv.name} {tv.original_name && `(${tv.original_name})`}
                </h1>
                <p>
                    {tv.tagline} – {tv.genres.map((g) => g.name).join(", ")} –{" "}
                    {tv.episode_run_time?.length > 0
                        ? (tv.episode_run_time[0] / 60).toFixed(2) + "h"
                        : "N/A"}
                </p>
            </div>

            {/* Details Section */}
            <div className={Style.details}>
                <div className={Style.imageBox}>
                    <img
                        src={IMAGE_BASE_URL + tv.poster_path}
                        alt={tv.name}
                        loading="lazy"
                        className={Style.movieImg}
                    />
                </div>

                <div className={Style.infoMovie}>
                    <p>{tv.overview}</p>
                    <p>
                        ⭐{tv.vote_average.toFixed(1)}
                        <span style={{ color: "grey" }}>/10</span> {formattedVoteCount}
                    </p>
                    <p>
                        <b>First Air Date:</b> {tv.first_air_date}
                    </p>
                    <p>
                        <b>Last Air Date:</b> {tv.last_air_date}
                    </p>
                    <p>
                        <b>Seasons:</b> {tv.number_of_seasons}, <b>Episodes:</b>{" "}
                        {tv.number_of_episodes}
                    </p>

                    <p>
                        <b>Production Houses:</b>
                    </p>
                    <div className={Style.productionCompanies}>
                        {tv.production_companies.map((company) => (
                            <div key={company.id}>
                                {company.logo_path && (
                                    <img
                                        src={IMAGE_BASE_URL + company.logo_path}
                                        alt={company.name}
                                        loading="lazy"
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
                    <p>Loading cast...</p>
                ) : (
                    <Suspense fallback={<p>Loading cast...</p>}>
                        <PeopleCard persons={persons} />
                    </Suspense>
                )}
            </div>
        </div>
    );
}
