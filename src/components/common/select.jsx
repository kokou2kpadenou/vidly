import React from "react";
import PropTypes from "prop-types";
import Label from "./label";

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <Label name={name} label={label} error={error}>
      <select
        id={name}
        name={name}
        placeholder={label}
        {...rest}
        className="form-control"
      >
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </Label>
  );
};

Select.defaultProps = {
  autoFocus: false
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Select;
