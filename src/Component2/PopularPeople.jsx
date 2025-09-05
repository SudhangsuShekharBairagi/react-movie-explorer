import { API_KEY, BASE_URL } from '../dataFetch/tmdb';

import Style from "./PeopleCard.module.css"
import usePersons from '../hook/FetchPerson';
import PeopleCard from './PeopleCard';
import { usePopularPerson } from '../context/PersonContext';
import { LoadingPerson } from './LoadingCard';

const PopularPeople = () => {
    const { data: persons, loading, error } = usePopularPerson();
    // if (loading) return <p>Loading Movies....</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className={Style.categoryName}>
            <h1 className={Style.categoryH1}>Popular People</h1>

            {loading ? <LoadingPerson /> : <PeopleCard persons={persons} />}

        </div>
    )
}

export default PopularPeople