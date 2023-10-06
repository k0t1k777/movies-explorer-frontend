import "./NavTab.css";
import { HashLink } from "react-router-hash-link";

export default function NavTab() {
  return (
    <nav className="navTab">
      <ul className="navTab__items">
        <li className="navTab__list">
          <HashLink smooth to="/#aboutProject" className="navTab__link">
            О проекте
          </HashLink>
        </li>
        <li className="navTab__list">
          <HashLink smooth to="/#techs" className="navTab__link">
            Технологии
          </HashLink>
        </li>
        <li className="navTab__list">
          <HashLink smooth to="/#portfolio" className="navTab__link">
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}
