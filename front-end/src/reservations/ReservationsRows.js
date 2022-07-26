import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const ReservationsRows = ({ reservation }) => {
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const errorMapping = Object.keys(errors).map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  const cancelReservationHandler = async (event) => {
    event.preventDefault();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ) {
        const status = "cancelled";
        await cancelReservation(reservation, status);
        history.go(0);
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;

  if (!errors.length) {
    return (
      <tr>
        <td>{reservation_id}</td>
        <td>
          {first_name} {last_name}
        </td>
        <td>{mobile_number}</td>
        <td>{reservation_date}</td>
        <td>{reservation_time}</td>
        <td>{people}</td>
        <td data-reservation-id-status={reservation_id}>{status}</td>
        <td>
          {status === "booked" ? (
            <Link
              to={`/reservations/${reservation_id}/seat`}
              href={`/reservations/${reservation_id}/seat`}
              className="btn btn-primary"
            >
              Seat
            </Link>
          ) : null}
        </td>
        <td>
          {status === "booked" ? (
            <Link
              className="btn btn-danger"
              to={`/reservations/${reservation_id}/edit`}
            >
              Edit
            </Link>
          ) : null}
        </td>
        <td>
        {status === "seated" ? (
          null
        ) : (<button
          className="btn btn-secondary"
          type="button"
          name="cancel"
          data-reservation-id-cancel={reservation_id}
          onClick={cancelReservationHandler}
        >
          Cancel
        </button>)}
        </td>
      </tr>
    );
  } else {
    <tr>{errorMapping ? errorMapping : null}</tr>;
  }
};

export default ReservationsRows;
