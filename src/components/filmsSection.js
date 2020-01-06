import React from "react";
import { ShowMoreButton } from "./showMoreButton";
import { FilmList } from "./filmList";

export const FilmsSection = ({ films, onFilmClick, updateFilmHandler }) => {
  return (
    <section className="films">
      <FilmList
        type={"regular"}
        text={"All movies. Upcoming"}
        films={films}
        onFilmClick={onFilmClick}
        updateFilmHandler={updateFilmHandler}
      />
      <ShowMoreButton />

      {/*<FilmList type={"extra"} text={"Top rated"} films={props.films} />*/}
      {/*<FilmList type={"extra"} text={"Most commented"} films={props.films} />*/}
    </section>
  );
};
