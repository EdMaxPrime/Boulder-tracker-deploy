import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginThunk } from "../../thunks";
import AuthFormView from "../views/authFormView";
import Status from "../views/Status.jsx";

import "../../styles/common.css";

// Smart container;
class AuthFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.loginOrSignup(
      this.state.username,
      this.state.password,
      this.props.action,
      this.props.history
    );
    this.props.location.state = {};
  };

  render() {
    let message = this.props.location.state || {};
    return (
      <div>
        <h1 className="centered">Bouldering Tracker App</h1>
        <Status
          type={message.loginStatus || this.props.statusCode}
          text={message.loginMessage || this.props.errorMessage}
        ></Status>
        <AuthFormView
          formTitle={this.props.formTitle}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

// Map state to props;
const mapLogin = state => {
  return {
    action: "login",
    formTitle: "Login",
    statusCode: state.user.status,
    errorMessage: state.user.message,
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username
  };
};

// Map state to props;
const mapSignup = state => {
  return {
    action: "signup",
    formTitle: "Sign Up",
    statusCode: state.user.status,
    errorMessage: state.user.message,
    isLoggedIn: state.user.isLoggedIn,
    username: state.user.username
  };
};

// Map dispatch to props;
const mapDispatch = dispatch => {
  return {
    loginOrSignup: (email, password, action, history) =>
      dispatch(loginThunk(email, password, action, history))
  };
};

export const Login = withRouter(
  connect(mapLogin, mapDispatch)(AuthFormContainer)
);
export const Signup = withRouter(
  connect(mapSignup, mapDispatch)(AuthFormContainer)
);
