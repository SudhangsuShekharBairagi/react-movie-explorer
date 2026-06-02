import React from 'react'
import TrendingMovies from "../components/TrendingMovies";

import PopularMovies from "../components/PopularMovies";
import UpcomingMovies from "../components/UpcomingMovies";
import TopRated from "../components/TopRated";
import IndianMovies from "../components/IndianMovies";
import Navbar from "../components/Navbar";
import PopularPeople from "../components/PopularPeople";
import TrendingPeople from "../components/TrendingPeople";
import { Outlet } from 'react-router-dom'

const MainContaner = () => {
    return (
        <div>
            <div style={{ margin: "10px" }}>

                <Outlet />


                <TrendingMovies />
                <TrendingPeople />
                <IndianMovies />
                <UpcomingMovies />
                <PopularMovies />
                <PopularPeople />
                <TopRated />



            </div>
        </div>
    )
}

export default MainContaner
