import React from "react";
import { Link } from "react-router-dom";

import "../../styles/card.css";
import "../../styles/common.css";

export default function SessionCard(props) {
  return (
    <div>
      <Link to={"/session/" + props.id} className="no-underline">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"> {(new Date(props.date)).toLocaleDateString()} </h5>
            <h6 className="card-subtitle"> {props.location} </h6>
            <p className="card-text"> Session #{props.index}: {props.comments} </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
