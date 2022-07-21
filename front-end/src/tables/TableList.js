import React from "react";

export default function Table({ table }) {
  const { table_id, table_name, capacity, reservation_id } = table;
  return (
    <tr>
      <th scope="row">{table_id}</th>
      <td>{table_name}</td>
      <td>{capacity}</td>
      <td>{reservation_id}</td>
      <td>{reservation_id ? "Occupied" : "Open"}</td>
    </tr>
  );
}