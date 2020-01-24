import React from "react";
import { FormBase, FormField, FormRow } from "./Form.jsx";

const AuthFormView = props => {
  return (
    <div>
      <FormBase
        button={props.formTitle}
        title={props.formTitle}
        onSubmit={props.handleSubmit}
      >
        <FormField
          type="text"
          name="username"
          handler={props.handleChange}
          label="Username"
        />
        <FormField
          type="password"
          name="password"
          handler={props.handleChange}
          label="Password"
        />
      </FormBase>
    </div>
  );
};

export default AuthFormView;
