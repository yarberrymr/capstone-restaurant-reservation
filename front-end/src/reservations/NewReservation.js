import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "./../../utils/api";
import ReservationForm from "./ReservationForms";

export default function CreateReservation() {
  const history = useHistory();

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

   const cancelHandler = (event) => {
    event.preventDefault();
    history.go(-1);
  };
  
  const changeHandler = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
 
  const submitHandler = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    formData.people = parseInt(formData.people);
    await createReservation(formData, ac.signal);
    history.push(`/dashboard?date=${formData.reservation_date}`)
    return () => ac.abort();
  };

  return (
    <>
      <ReservationForm
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
        submitHandler={submitHandler}
        formData={formData}
      />
    </>
  );
} 