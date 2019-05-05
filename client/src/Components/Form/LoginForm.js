import React from "react";

const LoginForm = props => {
  return (
    <React.Fragment>
      <form className="Form">
        <h3 className="Form-title">{props.title}</h3>
        <label htmlFor="login_username">Username</label>
        <input type="text" name="username" id="login_username" required />
        <label htmlFor="login_password">Password</label>
        <input type="password" name="password" id="login_password" required />

        <button type="submit" onClick={props.handleLogin}>
          {props.title}
        </button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
