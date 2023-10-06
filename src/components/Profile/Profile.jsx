import Header from "../Header/Header";
import "./Profile.css";

export default function Profile() {
  return (
    <>
      <Header />
      <section className="profile" id="profile">
        <h2 className="profile__name">Привет, Виталий!</h2>
        <form className="profile__form" validate>
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
        <button className="profile__exit" type="button">
          Выйти из аккаунта
        </button>
      </section>
    </>
  );
}
