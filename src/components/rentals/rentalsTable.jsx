import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

class rentalTable extends Component {
  columns = [
    {
      key: "_id",
      path: "_id",
      label: "Ref",
      content: rental => (
        <Link to={`/rentals/${rental._id}`}>{rental._id.slice(0, 8)}</Link>
      )
    },
    { key: "customer", path: "customer.name", label: "Customer" },
    { key: "movie", path: "movie.title", label: "Movie" }
  ];

  render() {
    const { rentals, sortColumn, onSort } = this.props;
    return (
      <Table
        data={rentals}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default rentalTable;
