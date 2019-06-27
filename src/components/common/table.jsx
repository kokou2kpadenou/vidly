import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, sortColumn, columns, onSort }) => {
  return (
    <div className="table-responsive-xl">
      <table className="table table-hover">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
};

export default Table;
