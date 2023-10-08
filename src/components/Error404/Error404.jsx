import { useNavigate } from "react-router-dom";
import "./Error404.css";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <main className="error404">
      <section className="error404__container">
        <h1 className="error404__tittle">404</h1>
        <p className="error404__subtittle">Страница не найдена</p>
        <button
          className="error404__button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </section>
    </main>
  );
}
