import React from "react";

const raiseSort = (props, path) => {
  const sortColumn = { ...props.sortColumn };
  if (sortColumn.path === path) {
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  } else {
    sortColumn.path = path;
    sortColumn.order = "asc";
  }
  props.onSort(sortColumn);
};

const renderSortIcon = (column, sortColumn) => {
  if (column.path !== sortColumn.path) return null;
  if (sortColumn.order === "asc")
    return <i className="fa fa-sort-asc" aria-hidden="true" />;
  return <i className="fa fa-sort-desc" aria-hidden="true" />;
};
const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(props, column.path)}
            style={{
              cursor: "pointer",
            }}
          >
            {column.label}
            {renderSortIcon(column, props.sortColumn)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
