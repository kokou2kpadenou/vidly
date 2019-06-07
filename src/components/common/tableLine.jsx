import React from "react";
import _ from "lodash";

const TableLine = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  return (
    <tr>
      {columns.map(column => (
        <td key={column.key}>{renderCell(data, column)}</td>
      ))}
    </tr>
  );
};

export default TableLine;
