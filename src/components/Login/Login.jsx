import "./Login.css";
import Logo from "../../../src/images/logo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login">
      <div className="login__wrapper">
        <Link to={"/"} className="login__logo">
          <img src={Logo} alt="Логотип главной страницы" />
        </Link>
        <h2 className="login__name">Рады видеть!</h2>
        <form className="login__form">
          <label>
            <span className="login__span-name">E-mail</span>
            <input
              className="login__input-email"
              type="email"
              placeholder="pochta@yandex.ru"
              required
            />
            <span className="login__error"></span>
          </label>
          <label>
            <span className="login__span-name">Пароль</span>
            <input
              className="login__input-password"
              type="password"
              placeholder=""
              required
            />
            <span className="login__error"></span>
          </label>
          <button className="login__button" type="submit">
            Войти
          </button>
          <div className="login__container-enter">
            <p className="login__already">Ещё не зарегистрированы?</p>
            <a href="signup" className="login__registration">
              Регистрация
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
