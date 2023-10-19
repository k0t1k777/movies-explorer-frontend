import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import CurrentUserContext from "../../contexts/contexts";
import useValidation from "../../components/hooks/useValidation";

export default function Profile({
  handleChangeProfile,
  exit,
  isLoading,
  messageState: [message, setMessage],
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = useValidation();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedloggedIn = localStorage.getItem("isLoggedIn");
    if (!storedloggedIn) {
      return;
    }
    setLoggedIn(true);
  }, [currentUser, loggedIn]);

  //   // сброс сообщения api при повторном возвращении на страницу
  useEffect(() => {
    setMessage({});
  }, [isValid, setMessage]);

  useEffect(() => {
    if (
      currentUser.name === values?.name ||
      currentUser.email === values?.email
    ) {
      resetForm();
    }
  }, [handleChange]);

  function fetchInputChange(event) {
    setMessage({});
    handleChange(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleChangeProfile(
      values.name || currentUser.name,
      values.email || currentUser.email,
   );
    resetForm();
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile" id="profile">
        <section className="profile__wrapper">
          <h1 className="profile__name">{`Привет, ${
            currentUser ? currentUser.name : "Студент Яндекс практикума"
          }!`}</h1>
          <form
            className="profile__form"
            noValidate
          >
            <label className="profile__container">
              <span className="profile__span-name">Имя</span>
              <input
                className="profile__input-name"
                name="name"
                type="text"
                minLength="2"
                maxLength="30"
                value={values.name || currentUser.name}
                required
                onChange={fetchInputChange}
                 disabled={isLoading}
              />
            </label>
            <label className="profile__container">
              <span className="profile__span-name">E-mail</span>
              <input
                className="profile__input-email"
                name="email"
                type="email"
                value={values.email || currentUser.email}
                required
                onChange={fetchInputChange}
                disabled={isLoading}
              />
            </label>
            <span className="profile__error">
              {!errors && message.isSuccess
                ? message.text
                : errors.name || errors.email || message.text}
            </span>
            <button
              // className="profile__edit"
              // disabled={!isValid || isLoading}
              className={`profile__edit ${
                !isValid ? "profile__edit_disabled" : ""
              }`}
              disabled={!isValid}
              type={"submit"}
              onClick={handleSubmit}
              
            >
              {isLoading ? "Редактировать..." : "Редактировать"}
            </button>
          </form>
          <Link to={"/"} className="profile__exit">
            <button className="profile__exitBtn" type="button" onClick={exit}>
              Выйти из аккаунта
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
