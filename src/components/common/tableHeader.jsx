import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = path => {
    if (path === "") return null;
    const copySortColumn = { ...sortColumn };
    if (copySortColumn.path === path) {
      copySortColumn.order = copySortColumn.order === "asc" ? "desc" : "asc";
    } else {
      copySortColumn.path = path;
      copySortColumn.order = "asc";
    }
    onSort(copySortColumn);
  };

  const renderSortIcon = path => {
    if (path === "") return null;
    if (sortColumn.path !== path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column.key}>
            <span
              className={column.path === "" ? "" : "clickable"}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column.path)}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
