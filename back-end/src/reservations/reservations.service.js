const knex = require("../db/connection");
const table = "reservations";

const list = (date) => {
  return knex(table)
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_time")
};

const create = (reservation) => {
  return knex(table)
    .insert(reservation)
    .returning("*")
    .then((reservations) => reservations[0]);
};

const read = (reservation_id) => {
  return knex(table).select("*").where({ reservation_id }).first();
};

//edit the reservation itself
function update(updatedReservation) {
  return knex(table)
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedReservations) => updatedReservations[0]);
}

//update the status only of the reservation
const statusUpdate = (reservation) => {
  return knex(table)
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update({ status: reservation.status }, "*")
    .then((reservations) => reservations[0]);
};

function searchByNumber(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  read,
  create,
  list,
  statusUpdate,
  searchByNumber,
  update,
};
