import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search...."
      name="query"
      className="form-control my-3"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
