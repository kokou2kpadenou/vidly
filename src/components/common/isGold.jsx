import React from "react";
import PropTypes from "prop-types";

const IsGold = ({ gold }) => {
  return (
    <i
      className="fa fa-certificate"
      style={{ color: gold ? "gold" : "silver" }}
      aria-hidden="true"
    />
  );
};

IsGold.propTypes = {
  gold: PropTypes.bool
};

export default IsGold;
