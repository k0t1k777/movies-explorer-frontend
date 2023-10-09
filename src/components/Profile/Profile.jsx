import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";

export default function Profile() {
  return (
    <>
      <Header />
      <main className="profile" id="profile">
        <section className="profile__wrapper">
          <h1 className="profile__name">Привет, Виталий!</h1>
          <form className="profile__form" validate="true">
            <label className="profile__container">
              <span className="profile__span-name">Имя</span>
              <input
                className="profile__input-name"
                type="text"
                placeholder="Виталий"
                minLength="2"
                maxLength="30"
                required
              />
              <span className="profile__error"></span>
            </label>
            <label className="profile__container">
              <span className="profile__span-name">E-mail</span>
              <input
                className="profile__input-email"
                type="email"
                placeholder="pochta@yandex.ru"
                required
              />
              <span className="profile__error"></span>
            </label>
            <button className="profile__edit" type="submit">
              Редактировать
            </button>
          </form>

          <Link to={"/"} className="profile__exit">
            <button className="profile__exitBtn" type="button">
              Выйти из аккаунта
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
