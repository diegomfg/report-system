import React, { Component } from "react";
import axios from "axios";
import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";

class Home extends Component {
  state = {
    ActiveUser: null
  };

  handleLogin = () => {
    axios
      .post("/user/login", {
        username: document.querySelector("#login_username").value,
        password: document.querySelector("#login_password").value
      })
      .then(res => {
        console.log(res);
        let response = JSON.parse(res);
        let user = response.data.AuthUser.username;
        let token = response.data.token;

        this.props.session({ user, token });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleRegister = () => {
    axios
      .post("/user/register", {
        username: document.querySelector("#register_username").value,
        password: document.querySelector("#register_password").value,
        role: document.querySelector("#option").value
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="content">
        <div className="home-text">
          <h1 className="home-title">Report System</h1>
          <p className="home-sub">Create logs and share with your team</p>
        </div>
        <div className="Forms">
          <LoginForm handleLogin={this.handleLogin} title="Login" />
          <RegisterForm handleRegister={this.handleRegister} title="Register" />
        </div>
      </div>
    );
  }
}

export default Home;
