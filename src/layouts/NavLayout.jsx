import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from '../pages/Footer'

const NavLayout = () => {
    return (
        <>
            <Navbar />
            <ScrollRestoration />
            <Outlet />
            <Footer />

        </>
    )
}

export default NavLayout