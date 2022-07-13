const knex = require('../db/connection')
const table = "reservations"

const read = (date) => {
  return knex(table).select("*").where({"reservation_date": date}).then((data) => data.sort((prev,curr) => prev.reservation_time < curr.reservation_time? -1:1))
}

const create = (res) => {
return knex(table).insert(res).returning("*").then(res => res[0])
}

module.exports = {
  read, 
  create
}