import React, { Component, Fragment } from "react";

import Button from "../views/Button.jsx";
import "../../styles/notifications.css";

/** 
 * This component can be used to "click to hide" something.
 * Props:
 * visible  (boolean) whether this is visible by default or not
 * onAction (function) any extra function to perform before toggling visibility
 * floating (boolean) whether this is floating or not
 * once     (boolean) if true, then there is no way to recover this component
 *          once it is hidden. If false, then a show/hide button will be shown
 *          above
 * Children:
 *          will be shown inside and controlled by this component
*/
class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }
  toggle = () => {
    if(typeof this.props.onAction === "function") {
      this.props.onAction(!this.state.visible);
    }
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    let style = "collapsible";
    if(this.props.floating) {
      style += " floating-bottom";
    }
    return (
      <div className={style} onClick={this.toggle}>
        {!this.props.once && 
          <Button onClick={this.toggle}>
            {this.state.visible ? "Hide" : "Show"}
          </Button> 
        }
        <div
          style={{display: this.state.visible ? "block" : "none"}}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Collapsible;