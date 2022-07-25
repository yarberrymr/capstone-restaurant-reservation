import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "../reservations/ReservationTable";
import TableList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const query = useQuery();
  const dateQuery = query.get("date");
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState({});
  const [pageDate, setPageDate] = useState(dateQuery ? dateQuery : date);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [date, pageDate]);

  const nextDateHandler = () => {
    setPageDate(next(pageDate));
    history.push(`/dashboard?date=${next(pageDate)}`);
  };

  const todayHandler = () => {
    setPageDate(date);
    history.push(`/dashboard?date=${date}`);
  };

  const previousDateHandler = () => {
    setPageDate(previous(pageDate));
    history.push(`/dashboard?date=${previous(pageDate)}`);
  };

  function loadDashboard() {
    const date = pageDate;
    const ac = new AbortController();
    setErrors({});
    listReservations({ date }, ac.signal)
      .then(setReservations)
      .catch(setErrors);
    listTables(ac.signal).then(setTables).catch(setErrors);
    return () => ac.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <div className="col">
        <h4 className="mb-0">Reservations for {pageDate}</h4>
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
      {errors.length && <ErrorAlert error={errors} />}
      <div className="row">
        <div className="col">
          <ReservationTable reservations={reservations} />
        </div>

        <div className="col">
          <div className="table-responsive">
            <table className="table no-wrap">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Reservation #</th>
                  <th>Table Status</th>
                </tr>
              </thead>
              {tables.map((table) => (
                <TableList key={table.table_id} table={table} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
