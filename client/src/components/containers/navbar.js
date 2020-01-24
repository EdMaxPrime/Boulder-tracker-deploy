import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "../../styles/navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <ul>
          <li>{this.props.username}</li>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/graphs">Stats</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

function mapUserToProps(state) {
  return {
    username: state.user.username,
    status: state.user.status,
    isLoggedIn: state.user.isLoggedIn
  };
}

export default connect(mapUserToProps)(Navbar);
