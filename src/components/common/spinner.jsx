import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const Spinner = ({ area }) => {
  const { promiseInProgress } = usePromiseTracker({
    area: area,
    delay: 500
  });

  const spinnerStyle = {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    Zindex: "1050"
  };

  return (
    <>
      {promiseInProgress && (
        <div style={spinnerStyle}>
          <Loader type="ThreeDots" color="#ff0000" height={100} width={100} />
        </div>
      )}
    </>
  );
};

export default Spinner;
