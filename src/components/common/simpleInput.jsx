import React from "react";

const SimpleInput = ({
  value,
  label,
  visibleLabel = false,
  contrast = false
}) => {
  return (
    <div className={`form-group ${contrast ? "text-danger" : ""}`}>
      {visibleLabel && <label>{label}</label>}
      <span
        type="text"
        className={`form-control bg-light ${contrast ? "text-danger" : ""}`}
        aria-label={label}
      >
        {value}
      </span>
    </div>
  );
};

export default SimpleInput;
