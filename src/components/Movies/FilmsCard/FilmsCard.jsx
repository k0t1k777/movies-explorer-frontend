import "../FilmsCard/FilmsCard.css";
import { Link } from "react-router-dom";

export default function FilmsCard({
  name,
  movieData,
  toggleAddMovie,
  onDeleteMovie,
  isLiked,
}) {
  function handleLikeClick() {
    toggleAddMovie(movieData);
  }

  function setTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? `${hours}ч` : ""} ${
      minutes > 0 ? `${minutes}м` : ""
    }`.trim();
  }

  return (
    <div className="filmsCard__container">
      <Link to={movieData.trailerLink} target="_blank">
        <img
          className="filmsCard__films"
          alt="Фото фильма"
          src={
            name === "movies"
              ? `https://api.nomoreparties.co${movieData.image.url}`
              : movieData.image
          }
        />
      </Link>
      <div className="filmsCard__wrapper">
        <h2 className="filmsCard__title">{movieData.nameRU}</h2>
        {name === "movies" && (
          <button
            key={movieData.id}
            className={`filmsCard__save ${
              isLiked ? "filmsCard__save-red" : ""
            }`}
            type="button"
            onClick={handleLikeClick}
          />
        )}
        {name === "saved-movies" && (
          <button
            key={movieData.id}
            className="filmsCard__save filmsCard__save_pic_x"
            type="button"
            onClick={() => onDeleteMovie(movieData._id)}
          />
        )}
      </div>
      <p className="filmsCard__time">{setTime(movieData.duration)}</p>
    </div>
  );
}
