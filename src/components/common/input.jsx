import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        placeholder={label}
        {...rest}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  autoFocus: false
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
