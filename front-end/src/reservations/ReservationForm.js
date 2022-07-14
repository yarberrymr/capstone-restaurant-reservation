import React from "react";

export default function ReservationForm({
  changeHandler,
  cancelHandler,
  submitHandler,
  formData
}) {
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="first_name">
        First Name
        <input
          id="first_name"
          name="first_name"
          type="text"
          required
          onChange={changeHandler}
          value={formData.first_name}
        />
      </label>
      <label htmlFor="first_name">
        Last Name
        <input
          id="last_name"
          name="last_name"
          type="text"
          required
          onChange={changeHandler}
          value={formData.last_name}
        />
      </label>
      <label htmlFor="mobile_number">
        Mobile Number
        <input
          id="mobile_number"
          name="mobile_number"
          type="text"
          required
          onChange={changeHandler}
          value={formData.mobile_number}
        />
      </label>
      <label htmlFor="reservation_date">
        Reservation Date
        <input
          id="reservation_date"
          name="reservation_date"
          type="date"
          required
          onChange={changeHandler}
          value={formData.reservation_date}
        />
      </label>
      <label htmlFor="reservation_date">
        Reservation Time
        <input
          id="reservation_time"
          name="reservation_time"
          type="time"
          required
          onChange={changeHandler}
          value={formData.reservation_time}
        />
      </label>
      <label htmlFor="reservation_date">
        Number of Guests
        <input
          id="people"
          name="people"
          type="number"
          required
          min={1}
          onChange={changeHandler}
          value={formData.people}
        />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={cancelHandler}>Cancel</button>
    </form>
  );
} 