import { API_KEY, BASE_URL } from '../dataFetch/tmdb';

import Style from "./PeopleCard.module.css"
import usePersons from '../hook/FetchPerson';
import PeopleCard from './PeopleCard';
import { useTrendingPerson } from '../context/PersonContext';
import { LoadingPerson } from './LoadingCard';

const TrendingPeople = () => {
    const { data: persons, loading, error } = useTrendingPerson();
    // if (loading) return <p>Loading Movies....</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className={Style.categoryName}>
            <div style={{ display: "flex", justifyContent: "space-between" }} >
                <h1 className={Style.categoryH1}>Trending People</h1>

            </div>
            {loading ? <LoadingPerson /> : <PeopleCard persons={persons} />}

        </div>
    )
}

export default TrendingPeople