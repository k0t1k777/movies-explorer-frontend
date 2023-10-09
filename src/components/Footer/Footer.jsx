import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__name">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__down">
        <p className="footer__date">©2023</p>
        <nav>
          <ul className="footer__links">
            <li className="footer__links-item">
              <a
                href="https://practicum.yandex.ru"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__links-item">
              <a
                href="https://github.com"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
