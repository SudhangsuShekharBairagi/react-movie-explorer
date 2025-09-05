import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Style from './Navbar.module.css';
const Navbar = () => {
  return (

    <div className={Style.nav}>
      <img className={Style.navLogo} src="/logo.jpeg" alt="" />

      <nav  >
        <NavLink to={"/movie"} className={Style.navLink}>Movies</NavLink>
        <NavLink to={"/series"} className={Style.navLink}>Series</NavLink>
        <NavLink to={"/person"} className={Style.navLink}>Actor</NavLink>
      </nav>
    </div>

  )
}

export default Navbar