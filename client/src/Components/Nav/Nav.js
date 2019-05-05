import React from "react";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

class Nav extends React.Component {
  static contextType = Context;

  render() {
    return (
      <nav className="Navbar">
        {Context.isAuth ? (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>{" "}
            </li>
            <li onClick={this.props.logout}>
              {this.context.isAuth ? "Logout" : "Login"}
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default Nav;
