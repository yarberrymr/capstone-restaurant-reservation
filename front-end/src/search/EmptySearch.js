import React from "react";

export default function EmptySearch() {
  return (
    <table className="table no-wrap">
      <thead>
        <tr>
          <th>#</th>
          <th>NAME</th>
          <th>PHONE</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>PEOPLE</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>No reservations found for that mobile number</td>
        </tr>
      </tbody>
    </table>
  );
}
