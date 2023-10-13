import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
// import CurrentUserContext from "../../contexts/contexts";

export default function Profile({ exit, handleChangeProfile, onClick }) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isVisibleSubmit, setIsVisibleSubmit] = useState(false);

  // const user = useContext(CurrentUserContext);
  // const { name, email } = user;

  useEffect(() => {
    const storedloggedIn = localStorage.getItem("isLoggedIn");
    console.log("Profile прочитал состояние", storedloggedIn);
    if (!storedloggedIn) {
      return;
    }
    setLoggedIn(true);
  }, [loggedIn]);

  function handleExit() {
    setLoggedIn(false);
    exit();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name === "") {
      setNameError("Введите имя. ");
    } else if (!isValidName(name)) {
      setNameError("Имя должно содержать от 2 до 30 символов");
    }
    if (!isValidEmail(email)) {
      setEmailError("Введите корректный email-адрес.");
    } else {
      setEmailError("");
    }
    handleChangeProfile({
      name: name,
      email: email,
    });
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
          <h1 className="profile__name">Привет, Виталий!</h1>
          {/* <h1 className="profile__name">Привет, ${ name }`!</h1> */}
          <form className="profile__form" noValidate onSubmit={handleSubmit}>
            <label className="profile__container">
              <span className="profile__span-name">Имя</span>
              <input
                className="profile__input-name"
                name="name"
                type="text"
                placeholder="Виталий"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChangeName}
                // value={name || ''}
                // onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="profile__container">
              <span className="profile__span-name">E-mail</span>
              <input
                className="profile__input-email"
                name="email"
                type="email"
                placeholder="pochta@yandex.ru"
                required
                onChange={handleChangeEmail}
                // value={link || ''}
                // onChange={(event) => setLink(event.target.value)}
              />
            </label>
            <span className="profile__error">
              {nameError} {emailError}
            </span>

            <button className="profile__edit" type="submit" onClick={ onClick }>
              Редактировать
            </button>
          </form>

          <Link to={"/"} className="profile__exit">
            <button
              className="profile__exitBtn"
              type="button"
              onClick={handleExit}
            >
              Выйти из аккаунта
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
