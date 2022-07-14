import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function CreateReservation() {
  const history = useHistory();
  const [errors, setErrors] = useState({})

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const errorMapping = Object.keys(errors).map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

   const cancelHandler = (event) => {
    event.preventDefault();
    history.go(-1);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setErrors({})
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
 
  const submitHandler = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    formData.people = parseInt(formData.people);
    try {
      await createReservation(formData, ac.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
      setErrors({});
    } catch (error) {
      if (!errors[error.message]) {
        setErrors({ ...errors, [error.message]: 1 });
      }
    }
    return () => ac.abort();
  };

  return (
    <>
      <div className="createErrors">{errorMapping ? errorMapping : null}</div>
      <h1 className="my-3">Create Reservation</h1>
      <ReservationForm
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
        formData={formData}
      />
    </>
  );
} 