import React from "react";
import StatusMessage from "./statusMessage";
import Pagination from "./common/pagination";
import Spinner from "./common/spinner";

const Layout = ({ data, area, children }) => {
  return (
    <div className="row" style={{ position: "relative" }}>
      <Spinner area={area} />
      {data.groups && <div className="col col-md-3 mb-3">{data.groups}</div>}
      <div className="col">
        {data.buttons}
        <StatusMessage
          item={data.item}
          count={data.count}
          group={data.group}
          searchField={data.searchField}
          area={area}
        >
          {children}

          <Pagination
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            onPageChange={data.onPageChange}
          />
        </StatusMessage>
      </div>
    </div>
  );
};

export default Layout;
