import { useCallback, useEffect, useState } from "react";
import MoviesApi from "../../utils/MoviesApi";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import ListFilms from "./ListFilms/ListFilms";
import Footer from "../Footer/Footer";

export default function Movies({ toggleAddMovie, savedMovies, name }) {
  const shortFilmDuration = 40;
  const loggedIn = localStorage.getItem("isLoggedIn");
  const [isLoading, setIsLoading] = useState(false);
  const [allMoviesData, setAllMoviesData] = useState([]);
  const [firstEntrance, setFirstEntrance] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [savedSearch, setSavedSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [serverError, setServerError] = useState(false);

  const filter = useCallback((search, isCheck, movies) => {
    setSavedSearch(search);
    localStorage.setItem("movie", JSON.stringify(search));
    localStorage.setItem("shorts", JSON.stringify(isCheck));
    localStorage.setItem("allmovies", JSON.stringify(movies));
    setFilteredMovies(
      movies.filter((movie) => {
        const searchName =
          movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(search.toLowerCase());
        return isCheck
          ? searchName && movie.duration <= shortFilmDuration
          : searchName;
      })
    );
  }, []);

  // получаем фильмы с сервера и отрисовываем их
  const getingFilms = (search) => {
    if (allMoviesData.length === 0) {
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((res) => {
          setAllMoviesData(res);
          setServerError(false);
          setFirstEntrance(false);
          filter(search, isCheck, res);
        })
        .catch((error) => {
          setServerError(true);
          console.error(`Ошибка при поиске фильмов ${error}`);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(search, isCheck, allMoviesData);
    }
  };

  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies) || [];
      const search = JSON.parse(localStorage.movie || " ");
      const isCheck = JSON.parse(localStorage.shorts) || false;
      setServerError(false);
      setFirstEntrance(false);
      setSavedSearch(search);
      setIsCheck(isCheck);
      setAllMoviesData(movies);
      filter(search, isCheck, movies);
    }
  }, [filter]);

  return (
    <>
      <Header loggedIn={loggedIn} name="movies" />
      <section className="movies">
        <SearchForm
          name={name}
          firstEntrance={firstEntrance}
          moviesData={allMoviesData}
          getingFilms={getingFilms}
          savedSearch={savedSearch}
          isCheck={isCheck}
          setIsCheck={setIsCheck}
          filter={filter}
        />
        <ListFilms
          name="movies"
          isLoading={isLoading}
          firstEntrance={firstEntrance}
          savedMovies={savedMovies}
          toggleAddMovie={toggleAddMovie}
          cards={filteredMovies}
          serverError={serverError}
        />
      </section>
      <Footer />
    </>
  );
}
