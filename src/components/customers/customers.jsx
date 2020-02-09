import React from "react";
import { Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { getCustomers, deleteCustomer } from "../../services/customerService";
import CustmersTable from "./customersTable";
import Layout from "../layout";
import Shape from "../shape";

class Customers extends Shape {
  async componentDidMount() {
    this.setState({
      sortColumn: { path: "name", order: "asc" },
      searchFieldName: "name",
      deleteData: { deleteFnc: deleteCustomer, deleteItem: "customer" }
    });
    const { data: elements } = await trackPromise(getCustomers(), "customers");

    const genres = [
      { name: "All Customers", _id: "0" },
      { name: "Gold", _id: "1" },
      { name: "Not Gold", _id: "2" }
    ];
    this.setState({ elements, genres });
  }

  render() {
    const data = {
      ...this.getSettings(),
      item: "customer",
      buttons: this.props.user && (
        <Link className="btn btn-primary mb-3" to="/customers/new">
          New Customer
        </Link>
      )
    };

    return (
      <Layout data={data} area="customers">
        <CustmersTable
          customers={this.getSettings().elements}
          sortColumn={this.state.sortColumn}
          onDelete={this.handleDelete}
          onSort={this.HandleSort}
        />
      </Layout>
    );
  }
}

export default Customers;
