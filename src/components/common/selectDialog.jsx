import React from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "./errorBoundary";

const SelectDialog = ({ title, id, value, label, children }) => {
  return (
    <>
      <div className="modal" id={`${id}-dlg`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ minHeight: "150px" }}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>{label}</div>
      <div className="custom-file my-3">
        <input
          type="text"
          className="custom-file-input"
          id={id}
          data-toggle="modal"
          data-target={`#${id}-dlg`}
        ></input>
        <label className="custom-file-label" htmlFor={id}>
          {value}
        </label>
      </div>
    </>
  );
};

SelectDialog.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  children: PropTypes.element.isRequired
};

export default SelectDialog;
