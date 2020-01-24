import React from "react";
import { FormBase, FormField, FormRow } from "./Form.jsx";
import Collapsible from "../containers/Collapsible.js";

import "../../styles/common.css";

export default function AddClimbCard(props) {
  let grades = [];
  for(let i = 0; i <= 15; i++) grades.push("V" + i);
  return (
    <div>
      <FormBase button="Add" title="Add Problem" onSubmit={props.submitHandler}>
        <FormField type="text" name="name" handler={props.nameHandler} label="Nickname for this problem" />
        <FormField type="select" name="grade" handler={props.gradeHandler} label="Difficulty of the problem (0 is easiest and 15 is the hardest)" options={grades} />
        <FormRow>
          <FormField type="number" name="attempts" handler={props.attemptsHandler} label="# Attempts" />
          <FormField type="number" name="sends" handler={props.sendsHandler} label="# Sends (succesful ascents)" />
        </FormRow>
        <FormField type="textarea" name="comments" handler={props.commentHandler} label="Notes" />
      </FormBase>
    </div>
  );
}
