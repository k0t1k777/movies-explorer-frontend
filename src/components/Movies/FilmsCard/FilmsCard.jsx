import "../FilmsCard/FilmsCard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FilmsCard({
  name,
  movieData,
  savedMovies,
  toggleAddMovie,
  onDeleteMovie,
}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (name === "movies") {
      setIsLiked(savedMovies.some((element) => movieData.id === element.movieId));
    }
  }, [savedMovies, movieData.id, setIsLiked, name]);

  function onClick() {
    setIsLiked(!isLiked);
    toggleAddMovie(movieData);
  }

  function setTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? `${hours}ч`  : ""} ${minutes > 0 ? `${minutes}м` : ""}`.trim();
  }

  return (
    <div className="listFilms__container">
      <Link to={movieData.trailerLink} className="listFilms__films" target="_blank">
        <img
          className="listFilms__img"
          alt="Фото фильма"
          src={name === "movies" ? `https://api.nomoreparties.co${movieData.image.url}` : movieData.image}
        />
      </Link>
      <div className="listFilms__wrapper">
        <h2 className="listFilms__title">{movieData.nameRU}</h2>
        {name === "movies" && (
          <button
            className={`listFilms__save ${isLiked ? "listFilms__save-red" : ""}`}
            type="button"
            onClick={onClick}
          />
        )}
        {name === "savedMovies" && (
          <button
            className="listFilms__save_pic_x"
            type="button"
            onClick={() => onDeleteMovie(movieData)}
          />
        )}
      </div>
      <p className="listFilms__time">{setTime(movieData.duration)}</p>
    </div>
  );
}







// import "../FilmsCard/FilmsCard.css";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// // вот тут надо как-то обработать список найденных (foundMoives) и сприсок лайканных (myMovies)
// // и в каждую карточку передать isLiked чтобы поставить галку лайка или снять

// export default function FilmsCard({
//   name,
//   movieData,
//   savedMovies,
//   toggleAddMovie,
//   onDeleteMovie,
// }) {
//   const [click, setClick] = useState(false);

//   useEffect(() => {
//     if (name === "movies")
//       setClick(savedMovies.some((element) => movieData.id === element.movieId));
//   }, [savedMovies, movieData.id, setClick, name]);

//   function onClick() {
//     if (savedMovies.some((element) => movieData.id === element.movieId)) {
//       setClick(true);
//       toggleAddMovie(movieData);
//     } else {
//       setClick(false);
//       toggleAddMovie(movieData);
//     }
//   }

//   function setTime(duration) {
//     const hours = Math.floor(duration / 60);
//     const minutes = duration % 60;
//     // проверяем, больше ли ноль hours и minutes, прежде чем включать их в выходную строку, а также удаляем любые ведущие или конечные пробелы с помощью .trim()
//     return `${hours > 0 ? `${hours}ч` : ""} ${minutes > 0 ? `${minutes}м` : ""
//     }`.trim();
//   }

//   return (
//     <>
//       <li className="listFilms__container">
//         <Link
//           to={movieData.trailerLink}
//           className="listFilms__films"
//           target="_blank"
//         >
//           <img
//             className="listFilms__img"
//             alt="Фото фильма"
//             src={
//               name === "movies"
//                 ? `https://api.nomoreparties.co${movieData.image.url}`
//                 : movieData.image
//             }
//           />
//         </Link>
//         <div className="listFilms__wrapper">
//           <h2 className="listFilms__title">{movieData.nameRU}</h2>
//           {name === "movies" ? (
//             <button
//               className="listFilms__save"
//               type="button"
//               onClick={onClick}
//               click={click}
//               savedMovies={savedMovies}
//             />
//           ) : (
//             <button
//               className="listFilms__save_pic_x"
//               type="button"
//               onDeleteMovie={onDeleteMovie}
//               movieData={movieData}
//             />
//           )}
//         </div>
//         <p className="listFilms__time">{setTime(movieData.duration)}</p>
//       </li>
//     </>
//   );
// }