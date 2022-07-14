const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

/** Validates Reservation before POST */
const validateReservation = (req, res, next) => {
  const data = req.body.data;

  if (!data) return next({ status: 400, message: `Invalid body.` });

  [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ].forEach((field) => {
    if (!data[field])
      return next({ status: 400, message: `Missing field ${field}.` });
  });

  if (!timeFormat.test(data.reservation_time))
    return next({ status: 400, message: "reservation_time field is invalid." });
  if (!dateFormat.test(data.reservation_date))
    return next({ status: 400, message: "reservation_date field is invalid." });
  if (!parseInt(data.people) || typeof data.people !== "number")
    return next({ status: 400, message: "people field must be a number." });

  return next();
};

/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  if (!req.query.date)
    return next({ status: 400, message: `Date is not found.` });
  const data = await service.read(req.query.date);
  return res.json({ data });
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  return res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservation, asyncErrorBoundary(create)],
};