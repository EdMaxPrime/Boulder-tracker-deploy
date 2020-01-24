import React, { Component } from "react";
import { connect } from "react-redux";

import { logoutThunk } from "../../thunks";
import Status from "../views/Status.jsx";

class Logout extends Component {
  constructor(props) {
    super(props);
    props.logout(props.history);
  }
  render() {
    return (
      <Status type={this.props.status} text={this.props.message} />
    );
  }
}

function mapUserToProps(state) {
  return {
    status: state.user.status,
    message: state.user.message
  };
}

function mapDispatch(dispatch) {
  return {
    logout: (history) => dispatch(logoutThunk(history))
  };
}

export default connect(mapUserToProps, mapDispatch)(Logout);