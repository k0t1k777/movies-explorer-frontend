import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../../../src/images/logo.svg";
import useValidation from "../../components/hooks/useValidation";
import { validationPattern } from "../../utils/constans";

export default function Register({
  handleRegister,
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
    handleRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
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
              name="name"
              className="register__input-name"
              type="text"
              value={values.name || ""}
              placeholder="Ваше имя"
              pattern={validationPattern.name}
              minLength="2"
              maxLength="30"
              required={true}
              onChange={inputChange}
            />
            <span className="register__error">
              {errors.name}
            </span>
          </label>
          <label className="register__container">
            <span className="register__span-name">E-mail</span>
            <input
              name="email"
              className="register__input-email"
              type="email"
              placeholder="Ваш email"
              pattern={validationPattern.email}
              value={values.email || ""}
              required={true}
              onChange={inputChange}
            />
            <span className="register__error">
              {errors.email}
            </span>
          </label>
          <label className="register__container">
            <span className="register__span-name">Пароль</span>
            <input
              name="password"
              className="register__input-password"
              type="password"
              placeholder="Ваш пароль"
              maxLength="30"
              value={values.password || ""}
              pattern={validationPattern.password}
              required={true}
              onChange={inputChange}
            />
            <span className="register__error">
              {/* {errors.password || message.text} */}
              {
              !errors && message.isSuccess
                ? message.text
                : errors.password || message.text
            }
            </span>
          </label>
          <button
            className={`register__button ${
              isValid || isLoading ? "" : "register__button_disabled"
            }`}
            type={"submit"}
            disabled={!isValid || isLoading}
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
