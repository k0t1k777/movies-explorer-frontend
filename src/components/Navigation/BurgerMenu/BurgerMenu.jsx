import { Link } from "react-router-dom";
import "./BurgerMenu.css";
// import { useState } from "react";
import LogoProfile from "../../../images/profile2.svg";

export default function BurgerMenu() {
  // const [isBurgerActiv, setIsBurgerActiv] = useState(false);

  return (
      // <section className={`burgerMenu ${ isBurgerActiv && "burgerMenu-active" }`}>
         <section className="burgerMenu">
        <button className="burgerMenu__close" type="button" />
        <ul className="burgerMenu__list">
          <li>
            <Link className="burgerMenu__link" to="/">
              Главная
            </Link>
          </li>
          <li>
            <Link className="burgerMenu__link" to="/movies">
              Фильмы
            </Link>
          </li>
          <li>
            <Link className="burgerMenu__link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        {/* <Link to={"/profile"} className="burgerMenu__profile"> */}
        <Link to={"/profile"} className="burgerMenu__profile">
        Аккаунт
          <img src={LogoProfile} className="burgerMenu__profile-button" alt="Логотип профиля" />
        </Link>
      </section>
  );
}
