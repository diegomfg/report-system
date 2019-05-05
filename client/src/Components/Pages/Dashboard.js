import React, { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import Context from "../../Context/Context";

const Dashboard = props => {
  useEffect(() => {
    setTimeout(() => {
      $(".not-authorized-alert").fadeIn(500);
    }, 500);
  });

  let postReport = () => {
    let data = {
      title: document.getElementById("title").value,
      body: document.getElementById("body").value
    };

    console.log(data);

    axios
      .post("/log/new", data)
      .then(res => {
        console.log(res);
        alert("ok");
      })
      .catch(error => {
        console.log(error);
        alert("error");
      });
  };

  return (
    <Context.Consumer>
      {context => (
        <div className="content">
          {context.isAuth ? (
            <React.Fragment>
              <form className="Form" onSubmit={postReport}>
                <h3 className="Form-title">Create New Report</h3>
                <label htmlFor="title">Report Title</label>
                <input type="text" name="title" id="title" required />
                <label htmlFor="body">Body</label>
                <input type="text" name="body" id="body" required />

                <button type="submit">Submit</button>
              </form>
            </React.Fragment>
          ) : (
            <Alert variant="danger" className="not-authorized-alert">
              <h1>Not authorized to see {document.location.pathname}</h1>
              <Link to="/">
                <Button variant="warning">Login or Register</Button>
              </Link>
            </Alert>
          )}
        </div>
      )}
    </Context.Consumer>
  );
};

export default Dashboard;
