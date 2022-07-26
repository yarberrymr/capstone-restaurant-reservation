import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import "./Reservations.css"

export default function CreateReservation() {
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
    status: "booked",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const errorMapping = Object.keys(errors).map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setErrors({});
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    formData.people = parseInt(formData.people);
    try {
      await createReservation(formData, ac.signal);
      setErrors({});
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      if (!errors[error.message]) {
        setErrors({ ...errors, [error.message]: 1 });
      }
    }
    return () => ac.abort();
  };

  return (
    <>
      <h1 className="my-3 reservation">Create Reservation</h1>
      <div>{errorMapping ? errorMapping : null}</div>

      <ReservationForm
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
        formData={formData}
      />
    </>
  );
}
