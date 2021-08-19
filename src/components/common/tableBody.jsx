import React from "react";
import _ from "lodash";

const renderCell = (column, item) => {
  if (column.content) return column.content(item);
  return _.get(item, column.path);
};

const createKey = (item, column) => {
  return item._id + (column.path || column.key);
};

const TableBody = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}> {renderCell(column, item)} </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
