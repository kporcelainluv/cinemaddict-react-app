import React from "react";
import { FilmDetails } from "./FilmDetails";
import {
  countHoursAndMins,
  getActors,
  getGenreHeading,
  getGenresTemplate,
  getreleaseDate,
  getWriters
} from "../../utils";

export const FilmInfo = ({ film }) => {
  const [hours, minutes] = countHoursAndMins(film.film_info.runtime);
  const actors = getActors(film);
  const writers = getWriters(film);
  const releaseDate = getreleaseDate(film);
  const genres = getGenresTemplate(film);

  return (
    <div className="film-details__info-wrap">
      <div className="film-details__poster">
        <img
          className="film-details__poster-img"
          src={film.film_info.poster}
          alt=""
        />

        <p className="film-details__age">{film.film_info.age_rating}+</p>
      </div>

      <div className="film-details__info">
        <div className="film-details__info-head">
          <div className="film-details__title-wrap">
            <h3 className="film-details__title">{film.film_info.title}</h3>
            <p className="film-details__title-original">
              Original: {film.film_info.alternative_title}
            </p>
          </div>

          <div className="film-details__rating">
            <p className="film-details__total-rating">
              {film.film_info.total_rating}
            </p>
          </div>
        </div>

        <table className="film-details__table">
          <tbody>
            <FilmDetails heading={`Director`} text={film.film_info.director} />
            <FilmDetails heading={`Writers`} text={writers} />
            <FilmDetails heading={`Actors`} text={actors} />
            <FilmDetails heading={`Release Date`} text={releaseDate} />
            <FilmDetails heading={`Runtime`} text={`${hours}h ${minutes}m`} />
            <FilmDetails
              heading={`Country`}
              text={film.film_info.release.release_country}
            />
            <FilmDetails
              heading={getGenreHeading(film.film_info.genre)}
              text={genres}
            />
          </tbody>
        </table>

        <p className="film-details__film-description">
          {film.film_info.description}
        </p>
      </div>
    </div>
  );
};
