const ReservationCard = ({ reservation }) => {
    const {
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = reservation;
    console.log(reservation)
    return (
            <tr>
                <td>{reservation_id}</td>
                <td>{first_name} {last_name}</td>
                <td>{mobile_number}</td>
                <td>{reservation_date}</td>
                <td>{reservation_time}</td>
                <td>{people}</td>
            </tr>
        
    );
  };
  
  export default ReservationCard;