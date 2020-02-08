import React from "react";
import Joi from "joi-browser";
import { getCustomer, saveCustomer } from "../../services/customerService";
import Form from "../common/form";
import ButtonCancel from "../common/buttonCancel";

class MovieForm extends Form {
  state = {
    data: { name: "", isGold: false, phone: "" },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name")
      .min(5)
      .max(50),
    isGold: Joi.boolean()
      .required()
      .label("Gold"),
    phone: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label("Phone")
  };

  async componentDidMount() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    };
  }

  doSubmit = async () => {
    await saveCustomer(this.state.data);

    this.props.history.push("/customers");
  };

  render() {
    return (
      <div>
        <h2>Customer Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", undefined, true)}
          {this.renderInput("phone", "Phone")}
          {this.renderCheckbox("isGold", "Gold")}
          {this.renderButton("Save")}
          <ButtonCancel back={() => this.props.history.push("/customers")} />
        </form>
      </div>
    );
  }
}

export default MovieForm;
