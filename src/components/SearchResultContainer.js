import React from "react";
import { FilmList } from "./FilmList";

export const SearchResultContainer = ({
  films,
  onFilmClick,
  handleClickWatchlist,
  handleClickWatched,
  handleClickFavorite
}) => {
  return (
    <section className="films">
      <div className="result">
        <p className="result__text">
          Result <span className="result__count">{films.length}</span>
        </p>
      </div>
      <FilmList
        type={"regular"}
        text={"Search Result"}
        films={films}
        onFilmClick={onFilmClick}
        handleClickWatchlist={handleClickWatchlist}
        handleClickWatched={handleClickWatched}
        handleClickFavorite={handleClickFavorite}
      />
    </section>
  );
};
