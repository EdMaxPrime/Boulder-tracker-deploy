import React, { Component, Fragment } from "react";
import Navbar from "./navbar";
import Session from "../views/sessionDetails.js";
import ClimbCard from "../views/climbCard.js";
import AddClimbCard from "../views/addClimbCard.js";
import BarChart from "./BarChart.js";
import Status from "../views/Status.jsx";

import { getSessionThunk, getProblemsThunk, addClimbThunk } from "../../thunks";
import { connect } from "react-redux";

class SingleSessionPage extends Component {
  constructor(props) {
    super(props);
    console.log("id", this.props.match.params.id);
    this.props.getSession(this.props.match.params.id);
    this.props.getProblems(this.props.match.params.id);
    this.state = {
      name: "",
      grade: "",
      comment: "",
      sends: 0,
      attempts: 0,
      data: [],
      width: 700,
      height: 500
    };
  }

  handleChangeName = ele => {
    this.setState({
      name: ele.target.value
    });
  };

  handleChangeGrade = ele => {
    this.setState({
      grade: ele.target.value
    });
  };

  handleChangeComment = ele => {
    this.setState({
      comment: ele.target.value
    });
  };

  handleChangeNumSends = ele => {
    this.setState({
      sends: ele.target.value
    });
  };

  handleChangeNumAttempts = ele => {
    this.setState({
      attempts: ele.target.value
    });
  };

  handleSubmit = ele => {
    let newClimb = {
      index: this.props.problems.length,
      name: this.state.name,
      grade: this.state.grade,
      attempts: this.state.attempts,
      sends: this.state.sends,
      comments: this.state.comment,
      sessionId: this.props.session.id
    };
    this.props.addClimb(newClimb);
  };

  render() {
    //before the data is fetched, use an empty list
    let problems = this.props.problems || [];
    console.log(this.props.statusClass + " " + this.props.statusMessage);
    let chart = console.log("data:", this.props.data);
    let barChartId = Math.random();
    return (
      <div>
        <Navbar />
        <Status
          type={this.props.statusClass}
          hideStatus="success"
          text={this.props.statusMessage}
        >
          <Session {...this.props.session} />
          {problems.length > 0 && (
          <Status
            type={this.props.graphStatusClass}
            hideStatus="success"
            text={this.props.graphStatusMessage}
          >
            <div className="centered">
              <h2> </h2>
              <BarChart
                data={this.props.data}
                width={this.state.width}
                height={this.state.height}
                key={barChartId}
              />
            </div>
          </Status>
          )}
          <AddClimbCard
            nameHandler={this.handleChangeName}
            gradeHandler={this.handleChangeGrade}
            commentHandler={this.handleChangeComment}
            submitHandler={this.handleSubmit}
            attemptsHandler={this.handleChangeNumAttempts}
            sendsHandler={this.handleChangeNumSends}
            visible={problems.length == 0}
          />
          <h2 className="centered">Problems</h2>
          {problems.length === 0 && (
            <p className="centered">
              Looks like you have not recorded any problem attempts yet. Add one
              by filling out the fields above.
            </p>
          )}
          {problems.map(climb => (
            <ClimbCard {...climb} key={climb.id} />
          ))}
        </Status>
      </div>
    );
  }
}

function mapState(state) {
  return {
    statusClass: state.singleSession.status,
    statusMessage: state.singleSession.message,
    graphStatusClass: state.singleSession.graph_status,
    graphStatusMessage: state.singleSession.graph_message,
    session: state.singleSession,
    problems: state.singleSession.problems,
    data: state.singleSession.data
  };
}

function mapDispatch(dispatch) {
  return {
    getSession: id => dispatch(getSessionThunk(id)),
    addClimb: id => dispatch(addClimbThunk(id)),
    getProblems: id => dispatch(getProblemsThunk(id))
  };
}

export default connect(mapState, mapDispatch)(SingleSessionPage);
