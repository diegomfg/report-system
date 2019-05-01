import React, { Component } from 'react';
import {Route} from "react-router-dom";
import Nav from "../Nav/Nav";
import Dashboard from "../Pages/Dashboard";
import Reports from "../Pages/Reports"
import Home from "../Pages/Home"
import Profile from "../Pages/Profile"
import { Container } from 'react-bootstrap';

class Main extends Component {
    state = { 
        isAuth: false,
        token: null
     }

     getAuthorizationToken = (token)=>{
        token ? this.setState({isAuth: true}) : this.setState({isAuth: false});
     }

     handleLogout = ()=>{
        this.setState({
            token: null,
            isAuth: false
        })

        alert("logged out")
     }

    render() { 
        return ( 
            <div className="Main">
                <Nav logout={this.handleLogout} isAuth={this.state.isAuth}/>
                
                <Container>
                <Route exact path="/" render={(props)=> <Home {...props} user="Diego"/>}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/reports" component={Reports}/>
                <Route path="/profile" render={(props)=> <Profile {...props} user={null}/>}/>
                </Container>
                
            </div>
         );
    }
}
 
export default Main;