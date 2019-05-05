import React from "react";
import { Alert } from "react-bootstrap";

const RegisterForm = props => {
  return (
    <React.Fragment>
      <form className="Form">
        <h3 className="Form-title">{props.title}</h3>
        <label htmlFor="register_username">Username</label>
        <input type="text" name="username" id="register_username" required />
        <label htmlFor="register_password">Password</label>
        <input
          type="password"
          name="password"
          id="register_password"
          required
        />
        <select name="option" id="option">
          <option value="admin">Admin</option>
          <option value="support">Support</option>
        </select>
        <button type="submit" onClick={props.handleRegister}>
          {props.title}
        </button>
      </form>
    </React.Fragment>
  );
};

export default RegisterForm;
