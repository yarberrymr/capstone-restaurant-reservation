const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;

//Validate the reservation for dates and times that the restaurant is open
function validateReservationDateTime(req, res, next) {
  const { data = {} } = req.body;
  let temp_reservation_time =
    data["reservation_time"] && data["reservation_time"].replace(":", "");
  if (new Date(data["reservation_date"]).getDay() + 1 === 2) {
    next({
      status: 400,
      message: `The restaurant is closed on Tuesdays, please pick a day when we are open!`,
    });
  } else if (Date.parse(data["reservation_date"]) < Date.now()) {
    next({
      status: 400,
      message: `Reservation must be for a date in the future.`,
    });
  } else if (temp_reservation_time < 1030) {
    next({
      status: 400,
      message: "reservation_time cannot be before business hours!",
    });
  } else if (temp_reservation_time > 2130) {
    next({
      status: 400,
      message:
        "Reservation cannot be less than one hour before business closing!",
    });
  }
  next();
}

//validate the reservation properties for creation
const validateReservation = (req, res, next) => {
  const data = req.body.data;

  if (!data) return next({ status: 400, message: `Invalid body` });

  [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ].forEach((field) => {
    if (!data[field])
      return next({ status: 400, message: `Missing field ${field}` });
  });

  if (!timeFormat.test(data.reservation_time))
    return next({ status: 400, message: "reservation_time field is invalid" });
  if (!dateFormat.test(data.reservation_date))
    return next({ status: 400, message: "reservation_date field is invalid" });
  if (!parseInt(data.people) || typeof data.people !== "number")
    return next({ status: 400, message: "people field must be a number" });

  return next();
};

//check if reservation exists in database
async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation ID ${reservation_id} does not exist`,
    });
  }
}

//check status of reservation before updating the reservation to new status
function validateStatuses(req, res, next) {
  const reservation = res.locals.reservation;
  const { data = {} } = req.body;
  const status = data["status"];

  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: "Reservation is already finished.",
    });
  }

  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    return next();
  }

  return next({
    status: 400,
    message: `Invalid or unknown status: ${status}`,
  });
}

//check status of reservation prior to creation or editing of reservation
function checkBookedStatus(req, res, next) {
  const { data = {} } = req.body;
  const status = data["status"];

  if (status === "booked" || status === undefined) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid or unknown status: ${status}`,
  });
}

async function list(req, res, next) {
  if (req.query.date) {
    const data = await service.list(req.query.date);
    res.json({ data });
  } else {
    const data = await service.searchByNumber(req.query.mobile_number);
    res.json({ data });
  }
}

async function create(req, res, next) {
  const data = await service.create(req.body.data);
  return res.status(201).json({ data });
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

//Edit the reservation itself
async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.json({ data });
}

//update the status only of the reservation
async function statusUpdate(req, res) {
  const reservation = res.locals.reservation;
  const { status } = req.body.data;
  const updatedReservation = {
    ...reservation,
    status,
  };
  const data = await service.statusUpdate(updatedReservation);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateReservationDateTime,
    validateReservation,
    checkBookedStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    asyncErrorBoundary(reservationExists),
    validateReservationDateTime,
    validateReservation,
    checkBookedStatus,
    asyncErrorBoundary(update),
  ],
  statusUpdate: [
    asyncErrorBoundary(reservationExists),
    validateStatuses,
    asyncErrorBoundary(statusUpdate),
  ],
};
