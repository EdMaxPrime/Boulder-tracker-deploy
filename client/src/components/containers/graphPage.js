import React, { Component, Fragment } from "react";
import Navbar from "./navbar";
import Session from "../views/sessionDetails.js";
import ClimbCard from "../views/climbCard.js";
import AddClimbCard from "../views/addClimbCard.js";
import BarChart from "./BarChart.js";
import Status from "../views/Status.jsx";

import { fetchGraphThunk } from "../../thunks";
import { connect } from "react-redux";

class GraphPage extends Component {
  constructor(props) {
    super(props);
    this.props.getGraph();
    this.state = {
      data: [
        {
          model_name: "V0",
          field1: 19,
          field2: 83
        },
        {
          model_name: "V1",
          field1: 67,
          field2: 93
        },
        {
          model_name: "V2",
          field1: 10,
          field2: 56
        },
        {
          model_name: "V3",
          field1: 98,
          field2: 43
        }
      ],
      width: 700,
      height: 500
    };
  }

  render() {
    let chart = console.log("graph_data:", this.props.data);
    return (
      <div>
        <Navbar />
        <h1 className="centered"> All-time Stats</h1>
        <h3 className="subtitle">
          This is a bar chart of attempts and sends for every difficult you've
          attempted. Orange bars represent sends while pink bars represent
          attempts.
        </h3>
        <Status
          type={this.props.statusClass}
          hideStatus="success"
          text={this.props.statusMessage}
        >
          <div className="centered">
            <h2> </h2>
            <BarChart
              data={this.props.data}
              width={this.state.width}
              height={this.state.height}
            />
          </div>
        </Status>
      </div>
    );
  }
}

function mapState(state) {
  return {
    statusClass: state.graph.status,
    statusMessage: state.graph.message,
    data: state.graph.data
  };
}

function mapDispatch(dispatch) {
  return {
    getGraph: id => dispatch(fetchGraphThunk(id))
  };
}

export default connect(mapState, mapDispatch)(GraphPage);
