import { Link } from "react-router-dom";

const ReservationTable = ({ reservation }) => {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
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
      <td>
        <Link
          to={`/reservations/${reservation_id}/seat`}
          href={`/reservations/${reservation_id}/seat`}
          className="btn btn-primary"
        >
          Seat
        </Link>
      </td>
    </tr>
  );
};

export default ReservationTable;