import "./ListFilms.css";
import { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import FilmsCard from "../FilmsCard/FilmsCard";
import { useLocation } from "react-router-dom";
import {
  CARDS_ADD,
  CARDS_BIG_SCREEN,
  CARDS_MEDIUM_SCREEN,
  CARDS_SMALL_SCREEN,
  DESCTOP_SCREEN,
  TABLET_SCREEN,
  MOBILE_SCREEN,
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
  const [visibleMovies, setVisibleMovies] = useState(0);

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

  useEffect(() => {
    const changeCards = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= DESCTOP_SCREEN) {
        setVisibleMovies(CARDS_BIG_SCREEN);
      } 
      else if (screenWidth >= TABLET_SCREEN) {
        setVisibleMovies(CARDS_MEDIUM_SCREEN);
      }
       else if (screenWidth >= MOBILE_SCREEN) {
        setVisibleMovies(CARDS_SMALL_SCREEN);
      } 
      else {
        setVisibleMovies(CARDS_SMALL_SCREEN);
      }
    };
    changeCards();
    window.addEventListener("resize", changeCards);
    return () => {
      window.removeEventListener("resize", changeCards);
    };
  }, [cards]);

  // Добавление новых фильмов
  const handleShowMore = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= DESCTOP_SCREEN) {
      setVisibleMovies(visibleMovies + CARDS_ADD);
    } else if (screenWidth >= TABLET_SCREEN) {
      setVisibleMovies(visibleMovies + CARDS_ADD - 1);
    } else if (screenWidth >= MOBILE_SCREEN) {
      setVisibleMovies(visibleMovies + CARDS_ADD - 1);
    } 
    else {
      setVisibleMovies(visibleMovies + CARDS_ADD - 1);
    }
  };

  return (
    <section className="listFilms">
      <ul className="listFilms__list">
        {isLoading ? (
          <Preloader />
        ) : name === "movies" && cards.length !== 0 ? (
          cards.slice(0, visibleMovies).map((card) => {
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
      {name === "movies" && !firstEntrance && visibleMovies < cards.length && (
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
