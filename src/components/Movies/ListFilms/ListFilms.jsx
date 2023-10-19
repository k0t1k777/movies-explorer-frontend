import "./ListFilms.css";
import { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import FilmsCard from "../FilmsCard/FilmsCard";
import { useLocation } from "react-router-dom";

const MAX_CARDS_LARGE_SCREEN = 12;
const MAX_CARDS_MEDIUM_SCREEN = 8;
const MAX_CARDS_SMALL_SCREEN = 5;
const CARDS_TO_ADD = 3;

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
      } else if (screenWidth >= 780) {
        setVisibleCards(MAX_CARDS_MEDIUM_SCREEN);
      } else if (screenWidth >= 540) {
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
    } else if (screenWidth >= 780) {
      setVisibleCards(visibleCards + CARDS_TO_ADD - 1);
    } else if (screenWidth >= 540) {
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
          cards.slice(0, visibleCards).map((movieData) => {
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
            Произошла ошибка. Пожалуйста, повторите позже.
          </span>
        ) : !firstEntrance ? (
          <span className="listFilms__serch-error">404. Ничего не найдено.</span>
        ) : pathname === "/movies" ? (
          <span className="listFilms__serch-error">Выполните поиск.</span>
        ) : (
          <span className="listFilms__serch-error">
            Нет сохранённых фильмов.
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
