import "./ListFilms.css";
import { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import FilmsCard from "../FilmsCard/FilmsCard";
import { useLocation } from "react-router-dom";

const MAX_CARDS_LARGE_SCREEN = 12;
const MAX_CARDS_MEDIUM_SCREEN = 8;
const MAX_CARDS_SMALL_SCREEN = 5;
const CARDS_TO_ADD = 3;

// вот тут надо как-то обработать список найденных (foundMoives) и список лайканных (myMovies)
// и в каждую карточку передать isLiked чтобы поставить галку лайка или снять

export default function ListFilms({
  toggleAddMovie,
  onDeleteMovie,
  handleDeleteMovie,
  firstEntrance,
  savedMovies,
  isLoading,
  name,
  cards,
  serverError,
}) {
  const { pathname } = useLocation();
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const updateVisibleCards = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        setVisibleCards(MAX_CARDS_LARGE_SCREEN);
      } else if (screenWidth >= 768) {
        setVisibleCards(MAX_CARDS_MEDIUM_SCREEN);
      } else if (screenWidth >= 480) {
        setVisibleCards(MAX_CARDS_SMALL_SCREEN);
      } else {
        setVisibleCards(MAX_CARDS_SMALL_SCREEN);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  const handleShowMore = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setVisibleCards(visibleCards + CARDS_TO_ADD);
    } else if (screenWidth >= 768) {
      setVisibleCards(visibleCards + CARDS_TO_ADD - 1);
    } else if (screenWidth >= 480) {
      setVisibleCards(visibleCards + CARDS_TO_ADD - 1);
    } else {
      setVisibleCards(visibleCards + CARDS_TO_ADD - 1);
    }
  };

  return (
    <section className="listFilms">
      <ul className="listFilms__list">
        {isLoading ? (
          <Preloader />
        ) : name === "movies" && cards.length !== 0 ? (
          // cards.slice(0, visibleCards).map((movieData) => {
            cards.map((movieData) => {
            return (
              <li className="movies-card" key={movieData.id}>
                <FilmsCard
                  movieData={movieData}
                  name={name}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  toggleAddMovie={toggleAddMovie}
                />
              </li>
            );
          })
        ) : name === "saved-movies" && cards.length !== 0 ? (
          // здесь пока отрисовывается весь массив, который НЕ фильтровался
          cards.map((movieData) => {
            return (
              <li className="movies-card" key={movieData.id}>
                <FilmsCard
                  movieData={movieData}
                  name={name}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                  toggleAddMovie={toggleAddMovie}
                  onDeleteMovie={onDeleteMovie}
                />
              </li>
            );
          })
        ) : serverError ? (
          <span className="listFilms__serch-error">
            Во время запроса произошла ошибка. Пожалуйста, попробуйте позже.
          </span>
        ) : !firstEntrance ? (
          <span className="listFilms__serch-error">
            Ничего не найдено
          </span>
        ) : pathname === "/movies" ? (
          <span className="listFilms__serch-error">Выполните поиск</span>
        ) : (
          <span className="listFilms__serch-error">
            Нет сохранённых фильмов
          </span>
        )}
      </ul>
      {name === "movies" && !firstEntrance && visibleCards < cards.length && (
        <div className="listFilms__wrap">
          <button
            className="listFilms__else"
            type="button"
            onClick={handleShowMore}
          >
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}
