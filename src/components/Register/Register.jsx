import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../../../src/images/logo.svg";

export default function Register({ onRegister }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    let isNameValid = isValidName(name);
    let isEmailValid = isValidEmail(email);
    let isPasswordValid = isValidPassword(email);

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

    if (!isPasswordValid) {
      setPasswordError("Введите корректный пароль.");
    } else {
      setPasswordError("");
    }
  }, [name, email, password]);

  function handleSubmit(event) {
    event.preventDefault();
    let isNameValid = isValidName(name);
    let isEmailValid = isValidEmail(email);
    let isPasswordValid = isValidPassword(password);

    if (!isNameValid) {
      setNameError("Имя должно содержать от 2 до 30 символов.");
    } else {
      setNameError("");
    }

    if (!isEmailValid) {
      setEmailError("Введите корректный email-адрес.");
    } else {
      setEmailError("");
    }

    if (!isPasswordValid) {
      setPasswordError("Введите корректный пароль.");
    } else {
      setPasswordError("");
    }
    onRegister(name, email, password);
  }

  function isValidName(name) {
    let pattern = /^[a-zA-Zа-яА-ЯёЁ]{2,30}$/;
    return pattern.test(name);
  }

  function isValidEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function isValidPassword(password) {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/;
    return pattern.test(password);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <main className="register">
      <section className="register__wrapper">
        <Link to={"/"} className="register__logo">
          <img src={Logo} alt="Логотип главной страницы" />
        </Link>
        <h1 className="register__name">Добро пожаловать!</h1>
        <form className="register__form" noValidate onSubmit={handleSubmit}>
          <label className="register__container">
            <span className="register__span-name">Имя</span>
            <input
              className="register__input-name"
              type="text"
              placeholder="Виталий"
              minLength="2"
              maxLength="30"
              required={true}
              onChange={handleChangeName}
            />
            <span className="register__error">{nameError}</span>
          </label>
          <label className="register__container">
            <span className="register__span-name">E-mail</span>
            <input
              className="register__input-email"
              type="email"
              placeholder="pochta@yandex.ru"
              value={email}
              required={true}
              onChange={handleChangeEmail}
            />
            <span className="register__error">{emailError}</span>
          </label>
          <label className="register__container">
            <span className="register__span-name">Пароль</span>
            <input
              className="register__input-password"
              type="password"
              placeholder="••••••••••••••"
              maxLength="30"
              value={password}
              required={true}
              onChange={handleChangePassword}
            />
            <span className="register__error">{passwordError}</span>
          </label>
          <button
            className={`register__button ${
              (!isValidName(name) ||
                !isValidEmail(email) ||
                !isValidPassword(password)) &&
              "register__button_disabled"
            }`}
            type={"submit"}
          >
            Зарегистрироваться
          </button>
          <div className="register__container-enter">
            <p className="register__already">Уже зарегистрированы?</p>
            <a href="signin" className="register__enter">
              Войти
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
