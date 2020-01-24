import React from "react";
import Button from "./Button.jsx";

import "../../styles/common.css";
import "../../styles/form.css";

/**
 * This component should surround all FormFields
 * Props:
 * title     (string) displayed at the top of the form in a centered h2
 * button    (string) what text to display in the submit button
 * onSubmit  (function) what to do when the submit button is pressed
 * InnerHTML should just be FormFields
 */
export function FormBase(props) {
  return (
    <div className="form-container">
      <h2 className="form-title">{props.title}</h2>
      {props.children}
      {/* Show a button if a name for it was specified */}
      {props.button && 
        <div className="centered">
          <Button shape="long" onClick={props.onSubmit}>
            {props.button}
          </Button>
        </div>
      }
    </div>
  );
}

/**
 * Used to display a fancy form input when used inside a FormBase
 * Props:
 * type     (string) one of: text (default), number, password, select, textarea
 * name     (string) has no bearing on functionality, but should be unique
 * value    (string) the default value before the user types anything
 * handler  (function) the handler to call when the input changes
 * label    (string) the form field's description shown to the user
 * required (boolean) used to make sure this isn't left empty
 * options  (array) if the type is select, then this will be choices presented
 *          to the user
 */
export function FormField(props) {
  let formElement;
  switch (props.type) {
    case "number":
    case "password":
      formElement = (
        <input
          className="form-control"
          type={props.type}
          id={props.name}
          onChange={props.handler}
          value={props.value}
        />
      );
      break;
    case "select":
      formElement = (
        <select
          className="form-control"
          id={props.name}
          onChange={props.handler}
          value={props.value}
        >
          {props.options.map(option => (
            <option value={option}>{option}</option>
          ))}
        </select>
      );
      break;
    case "textarea":
      formElement = (
        <textarea
          className="form-control"
          id={props.name}
          onChange={props.handler}
          rows="3"
        >
          {props.value}
        </textarea>
      );
      break;
    default:
      formElement = (
        <input
          className="form-control"
          type="text"
          id={props.name}
          name={props.name}
          onChange={props.handler}
          value={props.value}
        />
      );
  }
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      {formElement}
    </div>
  );
}

/**
 * Used to put two or more FormFields next to each other.
 * Inner HTML: form fields, from left to right
 */
export function FormRow(props) {
  return (
    <div className="gridContainer">
      <div className="row">
        {props.children.map(field => (
          <div className="col">{field}</div>
        ))}
      </div>
    </div>
  );
}
