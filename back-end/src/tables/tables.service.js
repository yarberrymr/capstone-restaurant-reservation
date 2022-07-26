const knex = require("../db/connection.js");

function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

//update table and reservation with transaction to keep in sync
async function update(updatedTable) {
  return knex.transaction(async (transaction) => {
    await transaction("reservations")
      .where({ reservation_id: updatedTable.reservation_id })
      .update({ status: "seated" });

    return await knex("tables")
      .select("*")
      .where({ table_id: updatedTable.table_id })
      .update(updatedTable, "*")
      .then((updatedRecords) => updatedRecords[0]);
  });
}

//finish table by updating table and reservation with transaction to keep in sync
async function finish(table_id, reservation_id){
  return knex.transaction(async (transaction) => {
    await transaction("reservations")
      .where({ reservation_id })
      .update({ status: "finished" });

    return transaction("tables")
      .select("*")
      .where({ table_id: table_id })
      .update({ reservation_id: null }, "*")
      .then((updatedRecords) => updatedRecords[0]);
  });
}

module.exports = {
  list,
  read,
  update,
  create,
  finish,
};
