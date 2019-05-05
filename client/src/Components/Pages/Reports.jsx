import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";
import $ from "jquery";
class Reports extends Component {
  state = {};
  static contextType = Context;

  componentDidMount() {
    setTimeout(() => {
      $(".not-authorized-alert").fadeIn(500);
    }, 500);
  }

  render() {
    return (
      <div className="content">
        {Context.isAuth ? (
          <h1>Dashboard</h1>
        ) : (
          <React.Fragment>
            <Alert variant="danger" className="not-authorized-alert">
              <h1>Oops! Not authorized to see {document.location.pathname}</h1>
              <Link to="/">
                <Button variant="warning">Login or Register</Button>
              </Link>
            </Alert>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Reports;
