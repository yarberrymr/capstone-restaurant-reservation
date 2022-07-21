const knex = require("../db/connection");
const table = "reservations";

const list = (date) => {
  return knex(table)
    .select("*")
    .where({ reservation_date: date })
    .then((data) =>
      data.sort((previous, current) =>
        previous.reservation_time < current.reservation_time ? -1 : 1
      )
    );
};

const create = (res) => {
  return knex(table)
    .insert(res)
    .returning("*")
    .then((res) => res[0]);
};

const read = (reservation_id) => {
  return knex(table).select("*").where({ reservation_id }).first();
};

module.exports = {
  read,
  create,
  list,
};
