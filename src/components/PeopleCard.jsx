import { IMAGE_BASE_URL } from "../services/tmdb";
import { Link, useNavigate } from "react-router-dom";
import Style from "./PeopleCard.module.css"
import { ScrollProvider } from "../contexts/ScrollContext";
import { useScrollCard } from "../contexts/useScrollContext";
function PeopleCardScroll({ persons }) {
    const { scroll, containerRef } = useScrollCard();


    return (
        <div className={Style.scrollerWrapper}>
            {persons.length > 0 && <button className={`${Style.scroll_btn} ${Style.left}`} onClick={() => scroll(-1)}>
                &#10094;
            </button>}
            <div className={Style.persons} ref={containerRef}>
                {persons.map((person) => (
                    <Link to={`/person/${person.id}`} key={person.id}>
                        <div className={Style.person}>


                            <img className={Style.cardImg}
                                src={person.profile_path ? IMAGE_BASE_URL + person.profile_path
                                    : "https://via.placeholder.com/200"}
                                alt={person.name}
                            />
                            <div className={Style.personName}>
                                <h1>{person.name}</h1>
                                <p style={{ color: "grey" }}>{person.character !== undefined ? person.character : person.known_for_department}</p>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
            {persons.length > 0 && <button className={`${Style.scroll_btn} ${Style.right}`} onClick={() => scroll(1)}>
                &#10095;
            </button>}
        </div >
    );
}

export default function PeopleCard({ persons }) {
    return (
        <ScrollProvider>
            <PeopleCardScroll persons={persons} />
        </ScrollProvider>
    )
}



