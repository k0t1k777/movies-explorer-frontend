import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import CurrentUserContext from "../../contexts/contexts";

export default function Profile({ isLoading, exit, handleChangeProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const storedloggedIn = localStorage.getItem("isLoggedIn");
    if (!storedloggedIn) {
      return;
    }
    setLoggedIn(true);
  }, [currentUser, loggedIn]);

  useEffect(() => {
    let isNameValid = isValidName(name);
    let isEmailValid = isValidEmail(email);

    if (!isNameValid) {
      setNameError("Имя должно содержать от 2 до 30 символов. ");
    } else {
      setNameError("");
    }

    if (!isEmailValid) {
      setEmailError("Введите корректный email-адрес.");
    } else {
      setEmailError("");
    }

  }, [name, email])

  function handleSubmit(event) {
    event.preventDefault();
    let isNameValid = isValidName(name);
    let isEmailValid = isValidEmail(email);

    if (!isNameValid) {
      setNameError("Имя должно содержать от 2 до 30 символов.");
    } else {
      setNameError("");
    }

    if (!isEmailValid) {
      setEmailError("Введите корректный email-адрес.");
    } else {
      setEmailError("");
      handleChangeProfile(name, email);
    }
  }

  function isValidName(name) {
    let pattern = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
    return pattern.test(name);
  }

  function isValidEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile" id="profile">
        <section className="profile__wrapper">
          <h1 className="profile__name">{`Привет, ${
            currentUser ? currentUser.name : "Студент Яндекс практикума"
          }!`}</h1>
          <form className="profile__form" noValidate onSubmit={handleSubmit}>
            <label className="profile__container">
              <span className="profile__span-name">Имя</span>
              <input
                className="profile__input-name"
                name="name"
                type="text"
                minLength="2"
                maxLength="30"
                value={name || currentUser.name}
                required
                onChange={handleChangeName}
              />
            </label>
            <label className="profile__container">
              <span className="profile__span-name">E-mail</span>
              <input
                className="profile__input-email"
                name="email"
                type="email"
                value={email || currentUser.email}
                required
                onChange={handleChangeEmail}
              />
            </label>
            <span className="profile__error">
              {nameError + emailError}
            </span>
            <button
              className={`profile__edit ${
                (!isValidName(name) || !isValidEmail(email)) &&
                "profile__edit_disabled"
              }`}
              type={"submit"}
              disabled={!isValidName(name) || !isValidEmail(email) || isLoading}
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
