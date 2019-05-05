import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "../Nav/Nav";
import Dashboard from "../Pages/Dashboard";
import Reports from "../Pages/Reports";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Context from "../../Context/Context";
// import $ from "jquery";

class Main extends Component {
  state = {
    isAuth: false,
    token: null,
    user: null
  };

  getAuthorizationToken = token => {
    token ? this.setState({ isAuth: true }) : this.setState({ isAuth: false });
  };

  handleLogout = () => {
    this.setState({
      token: null,
      isAuth: false
    });
  };

  setSession = data => {
    console.log(data);
    this.setState({
      isAuth: true,
      token: data.token,
      user: data.user
    });
  };

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <Context.Provider
        value={{ isAuth: this.state.isAuth, token: this.state.token }}
      >
        <div className="Main">
          <Nav logout={this.handleLogout} />
          <Container>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  user="Diego"
                  session={data => this.setSession(data)}
                />
              )}
            />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/reports" component={Reports} />
            <Route
              path="/profile"
              render={props => <Profile {...props} user={null} />}
            />
          </Container>
        </div>
      </Context.Provider>
    );
  }
}

export default Main;
