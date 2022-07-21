import React, { useState } from "react";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";
import { useHistory } from "react-router-dom";

export default function CreateTable() {
  const [tableErrors, setTableErrors] = useState({});
  const history = useHistory();

  const initialFormData = {
    table_name: "",
    capacity: "",
  };

  const [tableData, setTableData] = useState({ ...initialFormData });

  const errorMapping = Object.keys(tableErrors).map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  const submitHandler = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    tableData.capacity = parseInt(tableData.capacity);
    try {
      await createTable(tableData, ac.signal);
      setTableErrors({});
      history.push(`/dashboard`);
    } catch (error) {
      if (!tableErrors[error.message]) {
        setTableErrors({ ...tableErrors, [error.message]: 1 });
      }
    }
    return () => ac.abort();
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setTableErrors({})
    setTableData({ ...tableData, [event.target.name]: event.target.value });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.go(-1);
  };

  return (
    <>
      <div className="errors">{errorMapping ? errorMapping : null}</div>
      <TableForm
        title={"Create Table"}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
        tableData={tableData}
      />
    </>
  );
} 