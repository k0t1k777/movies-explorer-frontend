import React from "react";
import "./Login.css";
import Logo from "../../../src/images/logo.svg";
import { Link } from "react-router-dom";
import useValidation from "../../components/hooks/useValidation";
import { validationPattern } from "../../utils/constans";

export default function Login({
  handleLogin,
  isLoading,
  messageState: [message, setMessage],
}) {
  const { values, errors, isValid, handleChange } = useValidation();

  function inputChange(event) {
    setMessage({});
    handleChange(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleLogin({
      email: values.email,
      password: values.password,
    });
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
              name="email"
              type="email"
              placeholder="Ваш email"
              value={values.email ? values.email : ""}
              required={true}
              onChange={inputChange}
              pattern={validationPattern.email}
            />
            <span className="login__error">{errors.email}</span>
          </label>
          <label>
            <span className="login__span-name">Пароль</span>
            <input
              className="login__input-password"
              name="password"
              type="password"
              placeholder="Ваш пароль"
              minLength="6"
              maxLength="30"
              value={values.password ? values.password : ""}
              required={true}
              onChange={inputChange}
            />
            <span className="login__error">
              {
              !errors && message.isSuccess
                ? message.text
                : errors.password || message.text
            }
             </span>
          </label>
          <button
            className={`login__button ${
              isValid || isLoading ? "" : "login__button_disabled"
            }`}
            type="submit"
            disabled={!isValid || isLoading}
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
