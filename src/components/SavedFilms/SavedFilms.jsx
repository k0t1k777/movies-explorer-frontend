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
  const [savedSearch, setSavedSearch] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);

  const filter = useCallback((search, isCheck, movies) => {
    const fltrMvs = movies.filter((movie) => {
      const searchName =
        movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(search.toLowerCase());
      return isCheck
        ? searchName && movie.duration <= shortFilmDuration
        : searchName;
    });
    setFilteredMovies(fltrMvs);
  }, []);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFirstEntrance(true);
    } else {
      setFirstEntrance(false);
    }
    filter(savedSearch, isCheck, savedMovies);
  }, [filter, savedMovies, isCheck, savedSearch]);

  function getFilms(search) {
    setFirstEntrance(false);
    filter(search, isCheck, savedMovies);
    setSavedSearch(search);
  }

  return (
    <>
      <Header loggedIn={loggedIn} name="movies" />
      <main>
        <SearchForm
          isCheck={isCheck}
          getFilms={getFilms}
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
        />
      </main>
      <Footer />
    </>
  );
}
