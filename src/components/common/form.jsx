import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Checkbox from "./checkbox";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value, checked, type }) => {
    const obj = { [name]: type === "checkbox" ? checked : value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.type === "checkbox" ? input.checked : input.value;
    this.setState({
      data,
      errors
    });
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text", focus = false) {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        onChange={this.handleChange}
        autoFocus={focus}
      />
    );
  }

  renderSelect(name, label, options, focus = false) {
    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        onChange={this.handleChange}
        autoFocus={focus}
      />
    );
  }

  renderCheckbox(name, label) {
    return (
      <Checkbox
        name={name}
        label={label}
        checked={this.state.data[name]}
        error={this.state.errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
