const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//validate table prior to creation of the table
const validateTable = (req, res, next) => {
  const data = req.body.data;

  if (!data) return next({ status: 400, message: `Invalid body` });

  ["table_name", "capacity"].forEach((field) => {
    if (!data[field])
      return next({ status: 400, message: `Missing field ${field}` });
  });

  if (typeof data["capacity"] !== "number" || data["capacity"] < 1) {
    return next({
      status: 400,
      message: `capacity must be at least 1`,
    });
  }
  if (data["table_name"].length < 2) {
    next({
      status: 400,
      message: `table_name must be at least two letters`,
    });
  }

  return next();
};

//check if the table exists in the database
async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const foundTable = await service.read(table_id);
  if (foundTable) {
    res.locals.table = foundTable;
    next();
  } else {
    next({
      status: 404,
      message: `Table ${table_id} could not be found.`,
    });
  }
}

//check capacity of table prior to seating
function checkCapacity(req, res, next) {
  if (res.locals.table.capacity < res.locals.reservation.people) {
    next({
      status: 400,
      message: "Table does not have enough capacity",
    });
  }
  next();
}

//check occupancy of table prior to seating
function checkOccupied(req, res, next) {
  if (res.locals.table.reservation_id) {
    return next({
      status: 400,
      message: "Table is occupied",
    });
  }
  next();
}

//check if reservation exists in database priot to seating
async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const foundReservation = await reservationService.read(reservation_id);
  if (foundReservation) {
    res.locals.reservation = foundReservation;
    next();
  } else {
    next({
      status: 404,
      message: `Reservation ${reservation_id} could not be found`,
    });
  }
}

//validate table prior to seating reservation at table
function validateUpdatedTable(req, res, next) {
  const data = req.body.data;

  if (!data) {
    return next({
      status: 400,
      message: "Body data required",
    });
  }
  if (!req.body.data.reservation_id) {
    return next({
      status: 400,
      message: "reservation_id required",
    });
  }
  next();
}

//check occupancy prior to finishing table
function checkNotOccupied(req, res, next) {
  if (!res.locals.table.reservation_id) {
    return next({
      status: 400,
      message: "Table is not occupied",
    });
  }
  next();
}

//check reservation status prior to seating
function checkStatus(req, res, next) {
  const reservation = res.locals.reservation;
  if (reservation.status === "booked") {
    return next();
  }
  return next({
    status: 400,
    message: "Reservation is already seated or finished."
  })
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function update(req, res) {
  const tableUpdate = {
    ...res.locals.table,
    reservation_id: req.body.data.reservation_id,
  };
  await service.update(tableUpdate);
  const data = await service.read(tableUpdate.table_id);
  res.json({ data });
}

async function finish(req, res) {
  const table = res.locals.table;
  const data = await service.finish(table.table_id, table.reservation_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateTable, asyncErrorBoundary(create)],
  update: [
    validateUpdatedTable,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    checkOccupied,
    checkCapacity,
    checkStatus,
    asyncErrorBoundary(update),
  ],
  finish: [
    asyncErrorBoundary(tableExists),
    checkNotOccupied,
    asyncErrorBoundary(finish),
  ],
};
