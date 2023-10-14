import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import CurrentUserContext from "../../contexts/contexts";

export default function Profile({ isLoading, exit, handleChangeProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const storedloggedIn = localStorage.getItem("isLoggedIn");
    console.log("Profile прочитал состояние", storedloggedIn);
    if (!storedloggedIn) {
      return;
    }
    setLoggedIn(true);
  }, [currentUser, loggedIn]);

  function handleSubmit(event) {
    event.preventDefault();
    if (name === "") {
      setNameError("Введите имя. ");
    } else if (!isValidName(name)) {
      setNameError("Имя должно содержать от 2 до 30 символов");
    } else {
      setNameError("");
    }
    if (!isValidEmail(email)) {
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
                placeholder="Введите Ваше имя"
                minLength="2"
                maxLength="30"
                value={name}
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
                placeholder="Введите Ваш e-mail"
                value={email}
                required
                onChange={handleChangeEmail}
              />
            </label>
            <span className="profile__error">
              {nameError} {emailError}
            </span>

            {isLoading ? (
              <button className="profile__edit" type="button" disabled>
                Сохранение...
              </button>
            ) : (
              <button className="profile__edit" type="submit">
                Редактировать
              </button>
            )}
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
