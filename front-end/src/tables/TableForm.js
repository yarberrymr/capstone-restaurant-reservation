import React from "react";
import "./Tables.css"

export default function TableForm({
  submitHandler,
  tableData,
  changeHandler,
  cancelHandler,
}) {
  return (
    <div>
      <h1 className="my-3 tables">Create a New Table</h1>
      <form onSubmit={submitHandler}>
      <div className="form-group">
      <label className="ml-3" htmlFor="table_name">
      Table Name
        </label>
        <div className="col-sm-6">
        <input
            type="text"
            id="table_name"
            name="table_name"
            className="form-control"
            onChange={changeHandler}
            value={tableData.table_name}
            required
          />
      </div>
      </div>
      <div className="form-group">
      <label className="ml-3" htmlFor="capacity">
      Capacity
        </label>
        <div className="col-sm-6">
        <input
            type="number"
            id="capacity"
            name="capacity"
            className="form-control"
            min={1}
            onChange={changeHandler}
            value={tableData.capacity}
            required
          />
      </div>
      </div>
        <div>
          <button className="btn btn-primary ml-3 mr-2" type="submit">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
