import React, { Component } from "react";

import Form from "../Form/Form";

class Home extends Component {
  state = {
    ActiveUser: null
  };

  handleForm = event => {
    console.log(event.target);
  };

  render() {
    return (
      <div className="content">
        <div className="home-text">
          <h1 className="home-title">Report System</h1>
          <p className="home-sub">Create logs and share with your team</p>
        </div>
        <div className="Forms">
          <Form title="Login" handleForm={this.handleForm} />
          <Form title="Register" handleForm={this.handleForm} />
        </div>
      </div>
    );
  }
}

export default Home;
