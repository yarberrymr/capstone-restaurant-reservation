const knex = require("../db/connection");
const table = "reservations";

const list = (date) => {
  return knex(table)
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .then((data) =>
      data.sort((previous, current) =>
        previous.reservation_time < current.reservation_time ? -1 : 1
      )
    );
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

const statusUpdate = (reservation) => {
  return knex(table)
  .select("*")
  .where({ reservation_id: reservation.reservation_id })
  .update({status: reservation.status}, "*")
  .then((reservations) => reservations[0])
}

module.exports = {
  read,
  create,
  list,
  statusUpdate,
};
