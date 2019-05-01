import React from 'react';
import {Link} from 'react-router-dom';


const Nav = (props)=>{

    return (
        <nav className="Navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/profile">My Profile</Link> </li>
                <li onClick={props.logout}>{props.isAuth ? "Logout" : "Login"}</li>
            </ul>
        </nav>
    )

}

export default Nav;