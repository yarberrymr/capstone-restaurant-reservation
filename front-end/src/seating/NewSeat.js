import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function SeatReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [reservation, setReservation] = useState({});
  const [reservationErrors, setReservationErrors] = useState({});
  const [openTables, setOpenTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [seatErrors, setSeatErrors] = useState({});

  useEffect(loadSeating, [reservation_id]);

  function loadSeating() {
    const ac = new AbortController();
    setReservationErrors({});
    readReservation(reservation_id, ac.signal)
      .then(setReservation)
      .catch(setReservationErrors);
    listTables(ac.signal).then(setOpenTables).catch(setReservationErrors);
    return () => ac.abort();
  }

  const changeHandler = (event) => {
    event.preventDefault();
    setTableId(event.target.value);
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    setSeatErrors({});
    try {
      await seatReservation(reservation_id, tableId, ac.signal);
      history.push(`/dashboard`);
    } catch (error) {
      if (!seatErrors[error.message]) {
        setSeatErrors({ ...seatErrors, [error.message]: 1 });
      }
    }
    return () => ac.abort();
  };

  const tableOptions = openTables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  const { first_name, last_name, reservation_date, reservation_time, people } =
    reservation;

  if (Object.keys(reservation).length && openTables.length) {
    return (
      <div>
        <div className="seat-title row">
          <h1>Seat Reservation</h1>
        </div>
        {reservationErrors.length && <ErrorAlert error={reservationErrors} />}
        {seatErrors.length && <ErrorAlert error={seatErrors} />}
        <div className="seat-information row">
          <h3>
            #{reservation_id} - {first_name} {last_name} on{" "}
            {reservation_date.split("T")[0]} at {reservation_time} for {people}
          </h3>
        </div>
        <div className="seat-form row">
          <label htmlFor="table_id">Seat at:</label>
          <select
            name="table_id"
            id="table_id"
            onChange={changeHandler}
            value={tableId}
          >
            <option value="">Select a table</option>
            {tableOptions}
          </select>
        </div>
        <div className="seat-options row">
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
