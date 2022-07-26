import React from "react";

export default function EmptySearch() {
  return (
    <div className="table-responsive">
    <table className="table no-wrap">
      <thead className="thead-dark">
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
    </div>
  );
}
