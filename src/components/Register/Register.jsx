import "./Register.css";
import Logo from "../../../src/images/logo.svg";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="register">
      <div className="register__wrapper">
        <Link to={"/"} className="register__logo">
        <img src={Logo} alt="Логотип главной страницы" />
      </Link>
        <h2 className="register__name">Добро пожаловать!</h2>

        <form className="register__form" validate>
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
              required
            />
            <span className="register__error"></span>
          </label>
          <label className="register__container">
            <span className="register__span-name">Пароль</span>
            <input
              className="register__input-password"
              type="password"
              placeholder="••••••••••••••"
              required
            />
            <span className="register__error">Что-то пошло не так...</span>
          </label>
          <button className="register__button" type="submit">Зарегистрироваться</button>
          <div className="register__container-enter">
            <p className="register__already">Уже зарегистрированы?</p>
            <a href="signin" className="register__enter">Войти</a>
          </div>
        </form>
      </div>
    </section>
  );
}
