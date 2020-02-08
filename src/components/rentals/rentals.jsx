import React from "react";
import { Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { getRentals } from "../../services/rentalService";
import RentalsTable from "./rentalsTable";
import Layout from "../layout";
import Shape from "../shape";
import { saveReturn } from "../../services/returnService";

class Customers extends Shape {
  async componentDidMount() {
    this.setState({
      sortColumn: { path: "_id", order: "asc" },
      searchFieldName: "customer.name",
      deleteData: { deleteFnc: saveReturn, deleteItem: "" }
    });
    const { data: elements } = await trackPromise(getRentals());

    const genres = [
      { name: "All Rentals", _id: "0" },
      { name: "Out", _id: "3" },
      { name: "Returned", _id: "4" }
    ];
    this.setState({ elements, genres });
  }

  render() {
    const data = {
      ...this.getSettings(),
      item: "rental",
      buttons: this.props.user && (
        <Link className="btn btn-primary mb-3" to="/rentals/new">
          New Rental
        </Link>
      )
    };

    return (
      <Layout data={data}>
        <RentalsTable
          rentals={this.getSettings().elements}
          sortColumn={this.state.sortColumn}
          onReturn={this.handleReturn}
          onSort={this.HandleSort}
        />
      </Layout>
    );
  }
}

export default Customers;
