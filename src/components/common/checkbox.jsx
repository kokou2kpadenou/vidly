import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-check my-3">
      <label htmlFor={name} className="form-check-label">
        <input
          id={name}
          name={name}
          type="checkbox"
          {...rest}
          className="form-check-input"
        />
        {label}
      </label>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
