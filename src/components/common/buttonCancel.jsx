import React from "react";
import PropTypes from "prop-types";

const ButtonCancel = ({ back }) => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => {
        back();
      }}
    >
      Cancel
    </button>
  );
};

export default ButtonCancel;

ButtonCancel.propTypes = {
  back: PropTypes.func.isRequired
};
