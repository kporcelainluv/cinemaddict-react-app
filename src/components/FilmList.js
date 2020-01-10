import React from "react";
import { FilmCard } from "./FilmCard";
import { DEFAULT_AMOUNT_DISPLAYED } from "../consts";

export const FilmList = ({
  type,
  text,
  films,
  onFilmClick,
  updateFilmHandler,
  handleClickWatchlist,
  handleClickWatched,
  handleClickFavorite
}) => {
  if (type === "extra") {
    return (
      <section className="films-list--extra">
        <h2 className="films-list__title">{text}</h2>
        <div className="films-list__container">
          {films.slice(0, DEFAULT_AMOUNT_DISPLAYED).map(film => {
            return (
              <FilmCard
                film={film}
                key={film.id}
                onFilmClick={onFilmClick}
                updateFilmHandler={updateFilmHandler}
                handleClickWatchlist={handleClickWatchlist}
                handleClickWatched={handleClickWatched}
                handleClickFavorite={handleClickFavorite}
              />
            );
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section className="films-list">
        <h2 className="films-list__title visually-hidden">{text}</h2>
        <div className="films-list__container">
          {films.map(film => {
            return (
              <FilmCard
                film={film}
                key={film.id}
                onFilmClick={onFilmClick}
                updateFilmHandler={updateFilmHandler}
                handleClickWatchlist={handleClickWatchlist}
                handleClickWatched={handleClickWatched}
                handleClickFavorite={handleClickFavorite}
              />
            );
          })}
        </div>
      </section>
    );
  }
};
