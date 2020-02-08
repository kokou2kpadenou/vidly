import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import auth from "../../services/authService";

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
    { key: "movie", path: "movie.title", label: "Movie" },
    {
      key: "dateOut",
      path: "dateOut",
      label: "Out",
      content: rental => (
        <span>
          {rental.dateOut
            ? new Date(rental.dateOut).toDateString().slice(4)
            : null}
        </span>
      )
    },
    {
      key: "dateReturned",
      path: "dateReturned",
      label: "Returned",
      content: rental => (
        <span>
          {rental.dateReturned
            ? new Date(rental.dateReturned).toDateString().slice(4)
            : null}
        </span>
      )
    }
  ];

  returnColumn = {
    key: "return",
    path: "",
    label: "",
    content: data => (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>
          this.props.onReturn({
            customerId: data.customer._id,
            movieId: data.movie._id
          })
        }
      >
        Return
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) {
      this.columns.push(this.returnColumn);
    }
  }

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
