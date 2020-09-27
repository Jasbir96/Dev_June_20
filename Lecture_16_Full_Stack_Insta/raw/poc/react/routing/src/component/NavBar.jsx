import React from 'react';
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/about">about</Link>

            </li>
        </ul>
    );
}

export default NavBar;