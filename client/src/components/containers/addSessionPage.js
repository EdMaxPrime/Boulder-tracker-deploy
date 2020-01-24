import React, { Component } from "react";
import Navbar from "./navbar";
import Button from "../views/Button.jsx";
import { FormBase, FormField, FormRow } from "./../views/Form.jsx";

import { createSessionThunk } from "../../thunks";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AddSessionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      comment: "",
      redirect: false
    };
  }

  handleChangeLocation = ele => {
    this.setState({
      location: ele.target.value
    });
  };

  handleChangeComment = ele => {
    this.setState({
      comment: ele.target.value
    });
  };

  handleSubmit = ele => {
    this.setState({ redirect: true });
    let newSession = {
      location: this.state.location,
      comments: this.state.comment
    };
    console.log(newSession);
    this.props.createSession(newSession);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <Navbar />
        <div>
          <FormBase
            button="Save"
            title="New Session"
            onSubmit={this.handleSubmit}
          >
            <FormField
              type="text"
              name="location"
              handler={this.handleChangeLocation}
              label="Location"
            />
            <FormField
              type="textarea"
              name="comment"
              handler={this.handleChangeComment}
              label="Comment"
            />
          </FormBase>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    session: state.singleSession
  };
}

function mapDispatch(dispatch) {
  return {
    createSession: id => dispatch(createSessionThunk(id))
  };
}

export default connect(mapState, mapDispatch)(AddSessionPage);
