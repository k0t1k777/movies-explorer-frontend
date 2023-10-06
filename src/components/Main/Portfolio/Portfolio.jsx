import "./Portfolio.css";
import Photo from "../../../images/pic__COLOR_pic.png";
import { Link } from "react-router-dom";

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <h3 className="portfolio__name">Студент</h3>
      <img src={Photo} className="portfolio__photo" alt="Мое фото" />
      <h2 className="portfolio__title">Виталий</h2>
      <p className="portfolio__subtitle">Фронтенд-разработчик, 30 лет</p>
      <p className="portfolio__biography">
        Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики
        СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку,
        а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
        в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс
        по&nbsp;веб-разработке, начал заниматься фриланс-заказами и ушёл
        с&nbsp;постоянной работы.
      </p>
      <a className="portfolio__github" href="https://github.com/k0t1k777" target="_blank" rel="noreferrer">Github</a>
      <p className="portfolio__portfolio">Портфолио</p>

      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link to="https://github.com/k0t1k777/how-to-learn.git" className="portfolio__link" target="_blank" rel="noreferrer">
            Статичный сайт
            <button className="portfolio__arrow">↗</button>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="https://github.com/k0t1k777/russian-travel.git" className="portfolio__link" target="_blank" rel="noreferrer">
            Адаптивный сайт
            <button className="portfolio__arrow">↗</button>
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="https://github.com/k0t1k777/react-mesto-api-full-gha.git" className="portfolio__link" target="_blank" rel="noreferrer">
            Одностраничное приложение
            <button className="portfolio__arrow">↗</button>
          </Link>
        </li>
      </ul>
    </section>
  );
}
