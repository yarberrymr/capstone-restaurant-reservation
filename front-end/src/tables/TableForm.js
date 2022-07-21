import React from "react";

export default function TableForm({
  submitHandler,
  tableData,
  changeHandler,
  cancelHandler,
}) {
  return (
    <div>
      <h1>Create a New Table</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="table_name">
          Table Name
          <input
            type="text"
            id="table_name"
            name="table_name"
            onChange={changeHandler}
            value={tableData.table_name}
            required
          />
        </label>
        <label htmlFor="capacity">
          Capacity
          <input
            type="number"
            id="capacity"
            name="capacity"
            min={1}
            onChange={changeHandler}
            value={tableData.capacity}
            required
          />
        </label>
        <div>
          <button className="btn btn-primary" type="submit">
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
