import React from "react";
import { Link } from "react-router-dom";

import "../../styles/card.css";
import "../../styles/common.css";

export default function ClimbCard(props) {
  return (
    <div>
      <div className="card card-light">
        <div className="card-body">
          <h5 className="card-title"> {props.name} </h5>
          <h6 className="card-subtitle">Comments</h6>
          <p className="card-text"> Comments: {props.comments} </p>
          <hr />
          <p className="card-text"> Grade: {props.grade}, Sends: {props.sends} / {props.attempts}</p>
        </div>
      </div>
    </div>
  );
}
