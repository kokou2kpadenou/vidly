import React from "react";
import PropTypes from "prop-types";
import Label from "./label";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <Label name={name} label={label} error={error}>
      <input
        id={name}
        name={name}
        placeholder={label}
        {...rest}
        className="form-control"
      />
    </Label>
  );
};

Input.defaultProps = {
  type: "text",
  autoFocus: false
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
