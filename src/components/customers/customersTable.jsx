import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import auth from "../../services/authService";
import IsGold from "../common/isGold";

class CustomersTable extends Component {
  columns = [
    {
      key: "name",
      path: "name",
      label: "Name",
      content: customer => (
        <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
      )
    },
    {
      key: "isGold",
      path: "isGold",
      label: "Gold",
      content: data => <IsGold gold={data.isGold} />
    },
    { key: "phone", path: "phone", label: "phone" }
  ];

  deleteColumn = {
    key: "delete",
    path: "",
    label: "",
    content: data => (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => this.props.onDelete(data._id)}
      >
        Detele
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { customers, sortColumn, onSort } = this.props;
    return (
      <Table
        data={customers}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
