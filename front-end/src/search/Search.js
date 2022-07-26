import React, { useState } from "react";
import ReservationTable from "../reservations/ReservationTable";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import EmptySearch from "./EmptySearch";
import "./Search.css"

export default function Search() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    event.preventDefault();
    setMobileNumber(event.target.value);
  };

  const findHandler = (event) => {
    event.preventDefault();
    const ac = new AbortController();
    console.log(errors.length)
    function findReservations() {
      const mobile_number = mobileNumber;
      listReservations({ mobile_number }, ac.signal)
        .then(setReservations)
        .catch(setErrors);
    }
    findReservations();
    return () => ac.abort();
  };

  return (
    <>
      <div className="my-3 search">
        <h1>Search Reservations</h1>
      </div>
      <div>
      {errors.length && <ErrorAlert error={errors} />}
      </div>

      <div className="row ml-1 search">
        <label htmlFor="mobile_number">
          Mobile Number:
          <input
            type="text"
            id="mobile_number"
            className="form-control"
            name="mobile_number"
            onChange={changeHandler}
            value={mobileNumber}
            required
          />
        </label>
        <div className="mt-4 ml-2">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={findHandler}
          >
            Find
          </button>
        </div>
      </div>
      {reservations ? (
        <div className="search table">
          {reservations.length ? (
            <ReservationTable reservations={reservations} />
          ) : (
            <EmptySearch />
          )}
        </div>
      ) : null}
    </>
  );
}
