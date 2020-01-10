import React from "react";
import { FilmList } from "./FilmList";

export const SearchResultContainer = ({
  films,
  onFilmClick,
  handleClickWatchlist,
  handleClickWatched,
  handleClickFavorite
}) => {
  if (films.length > 0) {
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
  } else {
    return (
      <section className="films">
        <div className="result">
          <div className="no-result">There are no movies per your request.</div>
        </div>
      </section>
    );
  }
};
