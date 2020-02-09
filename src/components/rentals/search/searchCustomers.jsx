import React from "react";
import { trackPromise } from "react-promise-tracker";
import { getCustomers } from "../../../services/customerService";
import CustmersTable from "./searchCustomersTable";
import Layout from "../../layout";
import Shape from "../../shape";

class Customers extends Shape {
  async componentDidMount() {
    this.setState({
      sortColumn: { path: "name", order: "asc" },
      searchFieldName: "name",
      pageSize: 4
    });
    const { data: elements } = await trackPromise(
      getCustomers(),
      "search-customer"
    );

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
      groups: null
    };

    return (
      <Layout data={data} area="search-customer">
        <CustmersTable
          customers={this.getSettings().elements}
          sortColumn={this.state.sortColumn}
          onSort={this.HandleSort}
          selectCustomer={this.props.selectCustomer}
        />
      </Layout>
    );
  }
}

export default Customers;
