import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import CurrentUserContext from "../../contexts/contexts";
import useValidation from "../../components/hooks/useValidation";
import { validationPattern } from "../../utils/constans";

export default function Profile({
  handleChangeProfile,
  exit,
  messageState: [message, setMessage],
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const {
    handleChange,
    values = {},
    isValid,
    resetForm,
    errors,
  } = useValidation();

  useEffect(() => {
    const storedloggedIn = localStorage.getItem("isLoggedIn");
    if (!storedloggedIn) {
      return;
    }
    setLoggedIn(true);
  }, [currentUser, loggedIn]);

  useEffect(() => {
    if (
      currentUser.name === values?.name &&
      currentUser.email === values?.email
    ) {
      resetForm();
    }
  }, [handleChange, currentUser, resetForm, values]);

  useEffect(() => {
    setMessage({});
  }, [isValid, setMessage]);

  function inputChange(event) {
    setMessage({});
    handleChange(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleChangeProfile(
      values.name || currentUser.name,
      values.email || currentUser.email
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
          <form className="profile__form" noValidate>
            <label className="profile__container">
              <span className="profile__span-name">Имя</span>
              <input
                className="profile__input-name"
                name="name"
                type="text"
                minLength="2"
                maxLength="30"
                value={values.name || currentUser.name}
                placeholder="Имя"
                required={true}
                onChange={inputChange}
                pattern={validationPattern.name}
              />
            </label>
            <label className="profile__container">
              <span className="profile__span-name">E-mail</span>
              <input
                className="profile__input-email"
                name="email"
                type="email"
                value={values.email || currentUser.email}
                placeholder="Почта"
                required={true}
                onChange={inputChange}
                pattern={validationPattern.email}
              />
            </label>
            <span className="profile__error">
              {!errors && message.isSuccess
                ? message.text
                : errors.name || errors.email || message.text}
            </span>
            <button
              className={`profile__edit ${
                !isValid ? "profile__edit_disabled" : ""
              }`}
              disabled={!isValid}
              type={"submit"}
              onClick={handleSubmit}
            >
              Редактировать
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
