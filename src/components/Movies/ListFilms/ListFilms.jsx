import "./ListFilms.css";
import { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import FilmsCard from "../FilmsCard/FilmsCard";
import { useLocation } from "react-router-dom";
import {
  cardsAdd,
  cardsBigScreen,
  cardsMediumScreen,
  cardsSmallScreen,
} from "../../../utils/constans";

export default function ListFilms({
  isLoading,
  firstEntrance,
  onToggleAddMovie,
  onDeleteMovie,
  savedMovies,
  name,
  cards,
  serverError,
}) {
  const { pathname } = useLocation();
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const changeCards = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        setVisibleCards(cardsBigScreen);
      } else if (screenWidth >= 768) {
        setVisibleCards(cardsMediumScreen);
      } else if (screenWidth >= 540) {
        setVisibleCards(cardsSmallScreen);
      } else {
        setVisibleCards(cardsSmallScreen);
      }
    };
    changeCards();
    window.addEventListener("resize", changeCards);
    return () => {
      window.removeEventListener("resize", changeCards);
    };
  }, []);

  const handleShowMore = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setVisibleCards(visibleCards + cardsAdd);
    } else if (screenWidth >= 780) {
      setVisibleCards(visibleCards + cardsAdd - 1);
    } else if (screenWidth >= 540) {
      setVisibleCards(visibleCards + cardsAdd - 1);
    } else {
      setVisibleCards(visibleCards + cardsAdd - 1);
    }
  };

  // проверяем, есть ли фильм в ранее добавленных в избранное пользователем
  function setLiked(card) {
    if (name === "saved-movies") {
      return true;
    }
    const liked = savedMovies.some(
      (savedMovie) => savedMovie.movieId === card.id
    );
    return liked;
  }

  return (
    <section className="listFilms">
      <ul className="listFilms__list">
        {isLoading ? (
          <Preloader />
        ) : name === "movies" && cards.length !== 0 ? (
          cards.slice(0, visibleCards).map((card) => {
            return (
              <li key={card.id}>
                <FilmsCard
                  movieData={card}
                  name={name}
                  onToggleAddMovie={onToggleAddMovie}
                  isLiked={setLiked(card)}
                />
              </li>
            );
          })
        ) : name === "saved-movies" && cards.length !== 0 ? (
          cards.map((movieData) => {
            return (
              <li key={movieData._id}>
                <FilmsCard
                  movieData={movieData}
                  name={name}
                  onDeleteMovie={onDeleteMovie}
                />
              </li>
            );
          })
        ) : serverError ? (
          <span className="listFilms__serch-error">
            Произошла ошибка. Пожалуйста, повторите позже.
          </span>
        ) : !firstEntrance && pathname === "/movies" ? (
          <span className="listFilms__serch-error">Ничего не найдено.</span>
        ) : pathname === "/movies" ? (
          <span className="listFilms__serch-error">Выполните поиск.</span>
        ) : (
          <span className="listFilms__serch-error">
            Нет сохраненных фильмов.
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
