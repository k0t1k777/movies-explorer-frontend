import "./SavedFilms.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import ListFilms from "../Movies/ListFilms/ListFilms";

export default function SavedFilms({ savedMovies, onDeleteMovie }) {
  const shortFilmDuration = 40;
  const loggedIn = localStorage.getItem("isLoggedIn");
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  // стейт запроса поиска - какой фильм ищем и его длину
  const [savedSearch, setSavedSearch] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);
  // const [serverError, setServerError] = useState("");

  const filter = useCallback((search, isCheck, movies) => {
    // console.log('получили список фильмаов', movies)
     setFilteredMovies(
      movies.filter((movie) => {
        // console.log(movies)
        const searchName =
          movie.data.nameRU.toLowerCase().includes(search.toLowerCase()) ||
          movie.data.nameEN.toLowerCase().includes(search.toLowerCase());
          // console.log(movie.data.nameRU, movie.data.nameEN);
        return isCheck
          ? searchName && movie.data.duration <= shortFilmDuration
          : searchName;
      })
    );  
  }, [shortFilmDuration]);
  // }, [shortFilmDuration]);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true);
    } else {
      setFirstEntrance(false);
    }
    filter(savedSearch, isCheck, savedMovies);
  }, [filter, savedMovies, isCheck, savedSearch]);

  function getingFilms(search) {
    setFirstEntrance(false);
    // местами поменял ниже
    filter(search, isCheck, savedMovies);
    setSavedSearch(search);
    // console.log(savedMovies)
  }

  return (
    <>
      <Header loggedIn={loggedIn} name="movies" />
      <main>
        <SearchForm
          isCheck={isCheck}
          getingFilms={getingFilms}
          savedSearch={savedSearch}
          firstEntrance={firstEntrance}
          savedMovies={savedMovies}
          moviesData={savedMovies}
          filter={filter}
          setIsCheck={setIsCheck}
        />
        <ListFilms
          name="saved-movies"
          cards={filteredMovies}
          onDeleteMovie={onDeleteMovie}
          // serverError={serverError}
        />
        {/* {serverError && (
          // сделать класс
          <p className="savedFilms__error">{serverError}</p>
        )} */}
      </main>
      <Footer />
    </>
  );
}

