import React, { useEffect, useState } from "react";
import "./Login.css";
import Logo from "../../../src/images/logo.svg";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    let isEmailValid = isValidEmail(email);
    let isPasswordValid = isValidPassword(email);

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
  }, [email, password]);

  function handleSubmit(event) {
    event.preventDefault();
    let isEmailValid = isValidEmail(email);
    let isPasswordValid = isValidPassword(password);

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
    onLogin(email, password);
  }

  function isValidEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function isValidPassword(password) {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/;
    return pattern.test(password);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <main className="login">
      <section className="login__wrapper">
        <Link to={"/"} className="login__logo">
          <img src={Logo} alt="Логотип главной страницы" />
        </Link>
        <h1 className="login__name">Рады видеть!</h1>
        <form className="login__form" noValidate onSubmit={handleSubmit}>
          <label>
            <span className="login__span-name">E-mail</span>
            <input
              className="login__input-email"
              type="email"
              placeholder="pochta@yandex.ru"
              value={email}
              required={true}
              onChange={handleChangeEmail}
            />
            <span className="login__error">{emailError}</span>
          </label>
          <label>
            <span className="login__span-name">Пароль</span>
            <input
              className="login__input-password"
              type="password"
              placeholder="••••••••••••••"
              maxLength="30"
              value={password}
              required={true}
              onChange={handleChangePassword}
            />
            <span className="login__error">{passwordError}</span>
          </label>
          <button
            className={`login__button ${
              (!isValidEmail(email) || !isValidPassword(password)) &&
              "login__button_disabled"
            }`}
            type={"submit"}
          >
            Войти
          </button>
          <div className="login__container-enter">
            <p className="login__already">Ещё не зарегистрированы?</p>
            <a href="signup" className="login__registration">
              Регистрация
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
