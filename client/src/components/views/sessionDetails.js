import React from "react";
import "../../styles/common.css";

/**
 * This will simply render a heading and some paragraphs in a div.
 * Props:
 * date  an ISO date/time string
 * location  any string
 * comments  any string; newlines will be rendered as <br> tags
 * numClimbs  an integer
 * Example: On [day of week], [date], I went bouldering at [location]. I attempted [numClimbs] problem(s). [comments]
 */
function SessionPage(props) {
  //this array is used to convert the number from Date.getDay() into a string
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //date object to help format the timestamp
  let d = new Date(props.date);
  //render newlines with <br> tags by looping through an array of lines
  let lines = [];
  if(props.hasOwnProperty("comments"))
    lines = props.comments.split("\n");
  return (
    <div className="body">
      <h1 className="centered">Workout Details</h1>
      <p> On {daysOfWeek[d.getDay()]}, {d.toLocaleDateString()}, I went bouldering at {props.location}. I attempted {props.numClimbs} {props.numClimbs === 1 ? " problem" : " problems"}.</p>
      <p>
        {lines.map((element, index, array) => (
          <span key={index}>{element} {(index < array.length - 1) && <br />}</span>
        ))}
      </p>
    </div>
  );
}

export default SessionPage;
