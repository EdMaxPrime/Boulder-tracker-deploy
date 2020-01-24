import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/button.css";

/*
  Usage: <Button shape="" to="location" onClick={function}>text</Button>
  Where shape is one of: none, long, circle
  And one of "to" or "onClick" must be present. Providing the *to* prop makes
  this button render a NavLink that can redirect the user when clicked.
  Providing the *onClick* prop makes this button execute a function when it is
  clicked rather than redirecting to some other page. Only one of these should
  be present.
 */
function Button(props) {
  var extraClasses = "";
  if(props.shape !== undefined)
    extraClasses += ("button-" + props.shape); 
  if(props.to !== undefined) {
    return (
      <NavLink className={"button " + extraClasses} to={props.to}>{props.children}</NavLink>
    );
  }
  else {
    return (
      <button className={"button " + extraClasses} onClick={props.onClick}>{props.children}</button>
    );
  }
}

export default Button;