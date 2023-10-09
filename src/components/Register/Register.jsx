import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../../../src/images/logo.svg";

export default function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  return (
    <main className="register">
      <section className="register__wrapper">
        <Link to={"/"} className="register__logo">
          <img src={Logo} alt="Логотип главной страницы" />
        </Link>
        <h1 className="register__name">Добро пожаловать!</h1>
        <form className="register__form" validate="true" onSubmit={handleSubmit}>
          <label className="register__container">
            <span className="register__span-name">Имя</span>
            <input
              className="register__input-name"
              type="text"
              placeholder="Виталий"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="register__error"></span>
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
            <span className="register__error"></span>
          </label>
          <label className="register__container">
            <span className="register__span-name">Пароль</span>
            <input
              className="register__input-password"
              type="password"
              placeholder="••••••••••••••"
              minLength="8"
              maxLength="30"
              value={password}
              required={true}
              onChange={handleChangePassword}
            />
            <span className="register__error"></span>
          </label>
          <button className="register__button" type="submit">
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
