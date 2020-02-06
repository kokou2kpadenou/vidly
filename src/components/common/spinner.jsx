import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const Spinner = () => {
  const { promiseInProgress } = usePromiseTracker({ delay: 500 });
  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#ff0000" height="100" width="100" />
      </div>
    )
  );
};

export default Spinner;
