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
  toggleAddMovie,
  onDeleteMovie,
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
        setVisibleCards(cardsBigScreen);
      } else if (screenWidth >= 768) {
        setVisibleCards(cardsMediumScreen);
      } else if (screenWidth >= 540) {
        setVisibleCards(cardsSmallScreen);
      } else {
        setVisibleCards(cardsSmallScreen);
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
      setVisibleCards(visibleCards + cardsAdd);
    } else if (screenWidth >= 780) {
      setVisibleCards(visibleCards + cardsAdd - 1);
    } else if (screenWidth >= 540) {
      setVisibleCards(visibleCards + cardsAdd - 1);
    } else {
      setVisibleCards(visibleCards + cardsAdd - 1);
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
              <li key={movieData.id}>
                <FilmsCard
                  movieData={movieData}
                  name={name}
                  savedMovies={savedMovies}
                  toggleAddMovie={toggleAddMovie}
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
                  savedMovies={savedMovies}
                  onDeleteMovie={onDeleteMovie}
                />
              </li>
            );
          })
        ) : // ошибки доработать
        serverError ? (
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
