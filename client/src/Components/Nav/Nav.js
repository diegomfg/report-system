import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

class Nav extends React.Component {
  static contextType = Context;

  componentDidMount() {
    console.log(this.context.isAuth);
  }

  render() {
    return (
      <nav className="Navbar">
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
          <li onClick={() => console.log("logged out / logged in")}>
            {this.context.isAuth ? "Logout" : "Login"}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
