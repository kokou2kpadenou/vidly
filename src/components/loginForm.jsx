import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = { account: { username: "", password: "" } };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = ({ target: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account
    });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={this.state.account.username}
            onChange={this.handleChange}
            focus={true}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            value={this.state.account.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
