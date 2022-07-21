import React from "react";

export default function ReservationForm({
  changeHandler,
  cancelHandler,
  submitHandler,
  formData,
}) {
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="first_name">
        First Name
        <input
          type="text"
          id="first_name"
          name="first_name"
          onChange={changeHandler}
          value={formData.first_name}
          required
        />
      </label>
      <label htmlFor="first_name">
        Last Name
        <input
          type="text"
          id="last_name"
          name="last_name"
          onChange={changeHandler}
          value={formData.last_name}
          required
        />
      </label>
      <label htmlFor="mobile_number">
        Mobile Number
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          onChange={changeHandler}
          value={formData.mobile_number}
          required
        />
      </label>
      <label htmlFor="reservation_date">
        Reservation Date
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          onChange={changeHandler}
          value={formData.reservation_date}
          required
        />
      </label>
      <label htmlFor="reservation_date">
        Reservation Time
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          onChange={changeHandler}
          value={formData.reservation_time}
          required
        />
      </label>
      <label htmlFor="reservation_date">
        Number of Guests
        <input
          type="number"
          id="people"
          name="people"
          min={1}
          onChange={changeHandler}
          value={formData.people}
          required
        />
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={cancelHandler}>
        Cancel
      </button>
    </form>
  );
}
