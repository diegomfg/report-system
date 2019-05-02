import React from "react";
import { Alert } from "react-bootstrap";
import Context from "../../Context/Context";

const Dashboard = props => {
  return (
    <Context.Consumer>
      {context => (
        <div className="content">
          {context.isAuth ? (
            <h1>Dashboard</h1>
          ) : (
            <Alert variant="danger">
              <h1>Not authorized</h1>
            </Alert>
          )}
        </div>
      )}
    </Context.Consumer>
  );
};

export default Dashboard;
