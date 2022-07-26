import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "./Seat.css"

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


  const { first_name, last_name, reservation_date, reservation_time, people } =
    reservation;

  if (Object.keys(reservation).length && openTables.length) {
    return (
      <div>
        <div className="row ml-1 my-3 seat">
          <h1>Seat Reservation</h1>
        </div>
        {reservationErrors.length && <ErrorAlert error={reservationErrors} />}
        {seatErrors.length && <ErrorAlert error={seatErrors} />}
        <div className="row ml-1 mb-2 ">
          <h3>
            #{reservation_id} - {first_name} {last_name} on{" "}
            {reservation_date.split("T")[0]} at {reservation_time} for {people}
          </h3>
        </div>
        <div className="form-group">
          <label className="ml-3 seat" htmlFor="table_id">Seat at:</label>
          <div className="col-sm-6 seat">
          <select
            name="table_id"
            id="table_id"
            className="form-control"
            onChange={changeHandler}
            value={tableId}
          >
            <option value="">Select a table</option>
            {openTables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ))}
          </select>
          </div>
        </div>
        <div className="row ml-3">
        <div>
            <button
              type="submit"
              className="btn btn-primary mr-2"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
