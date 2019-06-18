import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, type, value, onChange, focus }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus={focus}
        id={name}
        name={name}
        type={type}
        value={value}
        className="form-control"
        placeholder={label}
        onChange={onChange}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  focus: false
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
