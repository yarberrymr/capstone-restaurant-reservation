import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import { next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "./ReservationTable";
import NoReservation from "./NoReservation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();
  const dateQuery = query.get("date")
  const [pageDate, setPageDate] = useState(dateQuery ? dateQuery : date);

  const history = useHistory();

  useEffect(loadDashboard, [date, pageDate]);

  const nextDateHandler = () => {
    setPageDate(next(pageDate));
    history.push(`/dashboard?date=${next(pageDate)}`);
  };

  const previousDateHandler = () => {
    setPageDate(previous(pageDate));
    history.push(`/dashboard?date=${previous(pageDate)}`);
  };

  const todayHandler = () => {
    setPageDate(date);
    history.push(`/dashboard?date=${date}`);
  };

  function loadDashboard() {
    const date = pageDate
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {pageDate}</h4>
      </div>
      <div>
        <button className="btn btn-secondary" onClick={previousDateHandler}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={todayHandler}>
          Today
        </button>
        <button className="btn btn-secondary" onClick={nextDateHandler}>
          Next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />

      {reservations?.length ? (
        reservations.map((reservation) => (
          <ReservationCard key={reservation.mobile_number} reservation={reservation} />
        ))
      ) : (
        <NoReservation />
      )}

    </main>
  );
}

export default Dashboard; 