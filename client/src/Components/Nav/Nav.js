import React from 'react';
import {Link, Route} from 'react-router-dom';
import Home from "../Pages/Home";
import Dashboard from '../Pages/Dashboard';
import Reports from '../Pages/Reports';
import Profile from "../Pages/Profile";

const Nav = (props)=>{

    return (
        <nav className="Navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/profile">My Profile</Link> </li>
            </ul>
            <Route exact path="/" render={(props)=> <Home {...props} user="Diego"/>}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/reports" component={Reports}/>
            <Route path="/profile" render={(props)=> <Profile {...props} user={"Diego"}/>}/>
        </nav>
    )

}

export default Nav;