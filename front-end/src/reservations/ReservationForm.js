import React from "react";

export default function ReservationForm({
  changeHandler,
  cancelHandler,
  submitHandler,
  formData,
}) {
  return (
    <div className="reservationForm">
    <form onSubmit={submitHandler}>
    <div className="form-group">
      <label className="ml-3" htmlFor="first_name">
        First Name
        </label>
        <div className="col-sm-6">
          <input
          type="text"
          id="first_name"
          name="first_name"
          className="form-control"
          onChange={changeHandler}
          value={formData.first_name}
          required
        />
      </div>
      </div>
      <div className="form-group">
      <label className="ml-3" htmlFor="last_name">
      Last Name
        </label>
        <div className="col-sm-6">
        <input
          type="text"
          id="last_name"
          name="last_name"
          className="form-control"
          onChange={changeHandler}
          value={formData.last_name}
          required
        />
      </div>
      </div>
      <div className="form-group">
      <label className="ml-3" htmlFor="mobile_number">
      Mobile Number
        </label>
        <div className="col-sm-6">
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          className="form-control"
          onChange={changeHandler}
          value={formData.mobile_number}
          required
        />
      </div>
      </div>
      <div className="form-group">
      <label className="ml-3" htmlFor="reservation_date">
      Reservation Date
        </label>
        <div className="col-sm-6">
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          className="form-control"
          onChange={changeHandler}
          value={formData.reservation_date}
          required
        />
      </div>
      </div>
      <div className="form-group">
      <label className="ml-3" htmlFor="reservation_date">
      Reservation Time
        </label>
        <div className="col-sm-6">
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          className="form-control"
          onChange={changeHandler}
          value={formData.reservation_time}
          required
        />
      </div>
      </div>
      <div className="form-group">
      <label className="ml-3" htmlFor="people">
      Number of Guests
        </label>
        <div className="col-sm-6">
        <input
          type="number"
          id="people"
          name="people"
          className="form-control"
          min={1}
          onChange={changeHandler}
          value={formData.people}
          required
        />
      </div>
      </div>
      <button className="btn btn-primary ml-3 mr-2" type="submit">Submit</button>
      <button className="btn btn-secondary" type="button" onClick={cancelHandler}>
        Cancel
      </button>
    </form>
    </div>
  );
}
