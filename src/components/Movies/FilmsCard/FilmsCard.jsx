import "./FilmsCard.css";
import Movies from "../../../images/test.png";
import Movies2 from "../../../images/test2.png";

// вот тут надо как-то обработать список найденных (foundMoives) и сприсок лайканных (myMovies)
// и в каждую карточку передать isLiked чтобы поставить галку лайка или снять


// const handleDuration = () => {
//   const hours = Math.floor(movie.duration / 60);
//   const min = movie.duration % 60;

export default function FilmsCard() {
  return (
    <section className="filmsCard">
      <ul className="filmsCard__list">
        <li className="filmsCard__container">
          <img src={Movies} className="filmsCard__films" alt="Фильм" />
          <div className="filmsCard__wrapper">
            <h2 className="filmsCard__title">33 слова о дизайне</h2>
            <button className="filmsCard__save" type="button" />
          </div>
          <p className="filmsCard__time">1ч 47м</p>
        </li>
        <li className="filmsCard__container">
          <img src={Movies2} className="filmsCard__films" alt="Фильм" />
          <div className="filmsCard__wrapper">
            <h2 className="filmsCard__title">
              Киноальманах «100 лет дизайна»
            </h2>
            <button className="filmsCard__save" type="button" />
          </div>
          <p className="filmsCard__time">1ч 3м</p>
        </li>
      </ul>
    </section>
  );
}
