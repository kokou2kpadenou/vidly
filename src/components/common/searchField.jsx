import React from "react";
import { PropTypes } from "prop-types";

const SearchField = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="searchField"
      value={value}
      className="form-control my-3"
      placeholder="Search..."
      aria-label="Search field"
      onChange={e => onChange(e.target.value)}
    />
  );
};

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchField;
