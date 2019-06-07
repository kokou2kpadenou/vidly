import React from "react";
import TableLine from "./tableLine";

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map(item => (
        <TableLine key={item._id} data={item} columns={columns} />
      ))}
    </tbody>
  );
};

export default TableBody;
