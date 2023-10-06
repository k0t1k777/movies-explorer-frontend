import "./Error404.css";

export default function Error404() {
  return (
    <section className="error404">
      <h2 className="error404__tittle">404</h2>
      <p className="error404__subtittle">Страница не найдена</p>
      <button className="error404__button"  type={'button'}>Назад</button>
    </section>
  );
}
