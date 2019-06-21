import React from "react";

const Label = ({ name, label, error, children }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {children}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Label;
