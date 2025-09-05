import React from "react";


import { Outlet, useNavigate } from "react-router-dom";
// import Style from "../component/MovieCard.module.css"
import Style from "./Home.module.css"



export default function Home() {
    const navigate = useNavigate();

    return (

        <div className={Style.homeCon}>
            <h1 className={Style.gradientText}>Welcome </h1>
            <div className={Style.buttonCon}>
                <button className={Style.searchButton} onClick={() => navigate("/movie")}>Search Movie</button>
                <button className={Style.searchButton} onClick={() => navigate("/series")}>Search Series</button>
                <button className={Style.searchButton} onClick={() => navigate("/person")}>Search Actor</button>
            </div>
        </div>
    );
}
