import React from "react";
import PropTypes from "prop-types";

const Like = ({ liked, onClick }) => {
  return (
    <i
      className={"fa fa-heart" + (!liked ? "-o" : "")}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={() => onClick()}
    />
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Like;
