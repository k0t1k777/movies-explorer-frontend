import "./Promo.css";
import LogoPromo from "../../../images/pic__COLOR_landing-logo.png";

export default function Promo() {
  return (
    <section className="promo">
      <img
        src={LogoPromo}
        className="promo__logo"
        alt="Логотип на главной странице"
      />
      <h1 className="promo__tittle">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}
