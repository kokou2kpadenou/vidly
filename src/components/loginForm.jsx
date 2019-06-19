import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    console.log("submited");
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", undefined, true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
