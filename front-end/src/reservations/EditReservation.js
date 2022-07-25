import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, editReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const errorMapping = Object.keys(errors).map((error, index) => (
    <ErrorAlert key={index} error={errors} />
  ));

  useEffect(loadReservation, [errors, reservation_id]);

  function loadReservation() {
    const ac = new AbortController();
    readReservation(reservation_id, ac.signal)
      .then((data) =>
        setFormData({
          ...data,
          reservation_date: data.reservation_date.split("T")[0],
        })
      )
      .catch((error) => setErrors({ ...errors, [error.message]: 1 }));
    return () => ac.abort();
  }

  const changeHandler = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const ac = new AbortController();
    formData.people = parseInt(formData.people);
    try {
      await editReservation(formData, ac.signal);
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
      <h1 className="my-3">Edit Reservation</h1>
      {Object.keys(formData).length ? (
        <>
          <div>{errorMapping ? errorMapping : null}</div>
          <ReservationForm
            changeHandler={changeHandler}
            cancelHandler={cancelHandler}
            submitHandler={submitHandler}
            formData={formData}
          />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
