import React from 'react'
import TrendingMovies from "../component/TrendingMovies";

import PopularMovies from "../component/PopularMovies";
import UpcomingMovies from "../component/UpcomingMovies";
import TopRated from "../component/TopRated";
import IndianMovies from "../component/IndianMovies";
import Navbar from "../component/Navbar";
import PopularPeople from "../Component2/PopularPeople";
import TrendingPeople from "../Component2/TrendingPeople";
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