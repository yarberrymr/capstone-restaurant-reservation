import React from "react";
import NoReservation from "./NoReservation";
import ReservationsRows from "./ReservationsRows";

const ReservationTable = ({ reservations }) => {

  return(
  <div className="table-responsive">
            <table className="table no-wrap table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>PEOPLE</th>
                  <th>STATUS</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reservations?.length ? (
                  reservations.map((reservation) => (
                    <ReservationsRows
                      key={reservation.reservation_id}
                      reservation={reservation}
                    />
                  ))
                ) : (
                  <NoReservation />
                )}
              </tbody>
            </table>
          </div>
  )
};

export default ReservationTable;
