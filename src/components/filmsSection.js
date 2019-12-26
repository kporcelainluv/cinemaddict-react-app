import React from "react";
import { ShowMoreButton } from "./showMoreButton";
import { FilmList } from "./filmList";
import { Popup } from "./Popup";

export const FilmsSection = ({ films, onFilmClick }) => {
  return (
    <section className="films">
      <FilmList
        type={"regular"}
        text={"All movies. Upcoming"}
        films={films}
        onFilmClick={onFilmClick}
      />
      <ShowMoreButton />

      {/*<FilmList type={"extra"} text={"Top rated"} films={props.films} />*/}
      {/*<FilmList type={"extra"} text={"Most commented"} films={props.films} />*/}
    </section>
  );
};
