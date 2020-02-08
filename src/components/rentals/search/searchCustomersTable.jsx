import React, { Component } from "react";
import Table from "../../common/table";
import IsGold from "../../common/isGold";

class CustomersTable extends Component {
  columns = [
    {
      key: "name",
      path: "name",
      label: "Name"
    },
    {
      key: "isGold",
      path: "isGold",
      label: "Gold",
      content: data => <IsGold gold={data.isGold} />
    },
    { key: "phone", path: "phone", label: "phone" },
    {
      key: "select",
      path: "",
      label: "",
      content: customer => (
        <button
          type="button"
          className="btn btn-primary"
          data-dismiss="modal"
          onClick={() => {
            this.props.selectCustomer(customer);
          }}
        >
          select
        </button>
      )
    }
  ];

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
