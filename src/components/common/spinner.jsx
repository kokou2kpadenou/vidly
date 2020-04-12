import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const Spinner = ({ area }) => {
  const { promiseInProgress } = usePromiseTracker({
    area: area,
    delay: 500,
  });

  return (
    <>
      {promiseInProgress && (
        <div className="spinner position-absolute d-flex justify-content-center align-items-center bg-white w-100 h-100">
          <Loader type="ThreeDots" color="#ff0000" height={100} width={100} />
        </div>
      )}
    </>
  );
};

export default Spinner;
