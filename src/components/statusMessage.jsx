import React from "react";
import _ from "lodash";
import { usePromiseTracker } from "react-promise-tracker";
import SearchField from "./common/searchField";

const StatusMessage = ({ item, count, group, searchField, children }) => {
  let message;
  // Message when the number of movies returned egal 0
  if (count === 0) {
    if (group.genreId === "")
      message = `Search return no ${item} from the database.`;
    if (group.genreId === "0")
      message = `There are no ${item}s in the database.`;
    if (group.genreId !== "" && group.genreId !== "0")
      message = `There are no ${item}s of this genre in the database.`;
    return (
      <React.Fragment>
        {!usePromiseTracker && (
          <p>
            <span className="badge badge-warning">
              {/* There are no movies in the database. */}
              {message}
            </span>
          </p>
        )}
        <SearchField
          value={searchField.value}
          onChange={searchField.onChange}
        />
      </React.Fragment>
    );
  }

  // Message when the number of movies returned is more than 0.
  if (group.genreId === "")
    message = `Search showing ${count} ${item}s in the database.`;
  if (group.genreId === "0")
    message = `Showing ${count} ${item}s in the database.`;
  if (group.genreId !== "" && group.genreId !== "0") {
    const genre = _.find(group.genres, { _id: group.genreId }).name;

    message = `Showing ${count} ${genre} ${item}s in the database.`;
  }
  return (
    <React.Fragment>
      <p>
        <span className="badge badge-light">{message}</span>
      </p>
      <SearchField value={searchField.value} onChange={searchField.onChange} />
      {children}
    </React.Fragment>
  );
};

export default StatusMessage;
