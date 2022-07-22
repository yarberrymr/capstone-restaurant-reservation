import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { finishSeatedReservation } from "../utils/api";

export default function TableList({ table }) {
  const [errors, setErrors] = useState({});

  const { table_id, table_name, capacity, reservation_id } = table;

  const finishHandler = async (event) => {
    event.preventDefault();
    try {
      if (
        window.confirm(
          "Is this table ready to seat new guests? This cannot be undone."
        )
      ) {
        await finishSeatedReservation(table.table_id);
        window.location.reload();
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const errorMapping = Object.keys(errors).map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  return (
    <tbody>
      <tr>{errorMapping ? errorMapping : null}</tr>
    <tr>
      <th scope="row">{table_id}</th>
      <td>{table_name}</td>
      <td>{capacity}</td>
      <td>{reservation_id}</td>
      <td data-table-id-status={table_id}><p >{reservation_id? 'occupied': 'free'}</p>
      {reservation_id?
        <button data-table-id-finish={table_id} className='btn btn-primary' onClick={finishHandler}>Finish</button>
         : ''}
      </td>
    </tr>
    </tbody>
  );
}
