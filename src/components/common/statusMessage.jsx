import React from "react";

const StatusMessage = ({ count, group, children }) => {
  if (count === 0 && group === "0") {
    return (
      <p>
        <span className="badge badge-warning">
          There are no movies in the database.
        </span>
      </p>
    );
  }

  if (count === 0) {
    return (
      <p>
        <span className="badge badge-warning">
          There are no movies of this genre.
        </span>
      </p>
    );
  }

  return (
    <React.Fragment>
      <p>
        <span className="badge badge-light">{`Showing ${count} movies in the database.`}</span>
      </p>
      {children}
    </React.Fragment>
  );
};

export default StatusMessage;
