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
      <div className="table-responsive" >
       <table className="table no-wrap" >
        <thead>
            <tr>
                <th>#</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>PEOPLE</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{reservation_id}</td>
                <td>{first_name} {last_name}</td>
                <td>{mobile_number}</td>
                <td>{reservation_date}</td>
                <td>{reservation_time}</td>
                <td>{people}</td>
            </tr>
        </tbody>
       </table>
      </div>
    );
  };
  
  export default ReservationCard;