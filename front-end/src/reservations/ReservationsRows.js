import { Link } from "react-router-dom";

const ReservationsRows = ({ reservation }) => {
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
        {reservation.status === "booked" ? (
          <Link
            to={`/reservations/${reservation.reservation_id}/seat`}
            href={`/reservations/${reservation_id}/seat`}
            className="btn btn-primary"
          >
            <p>Seat</p>
          </Link>
        ) : null}
      </td>
    </tr>
  );
};

export default ReservationsRows;
