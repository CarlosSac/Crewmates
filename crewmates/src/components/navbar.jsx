// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className='sidebar'>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/create-crewmate'>Create a Crewmate</Link>
                </li>
                <li>
                    <Link to='/crewmate-gallery'>Crewmate Gallery</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
