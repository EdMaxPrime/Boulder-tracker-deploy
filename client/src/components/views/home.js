import React, { Component } from "react";
import Button from "./Button";

import "../../styles/common.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = e => {
    this.props.test();
  };

  render() {
    return (
      <div className="homepage">
        <h1 className="title"> Boulder Tracker </h1>

        <h3 className="subtitle">
          A health app tailored for a popular new activity: bouldering
        </h3>
        <div className="centered">
          <Button shape="long" to="/login">
            Login
          </Button>
          <Button shape="long" to="/signup">
            Signup
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
