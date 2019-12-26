import React from "react";
import { ShowMoreButton } from "./showMoreButton";
import { FilmList } from "./filmList";

export const FilmsSection = props => {
  return (
    <section className="films">
      <FilmList
        type={"regular"}
        text={"All movies. Upcoming"}
        films={props.films}
      />
      <ShowMoreButton />
      <FilmList type={"extra"} text={"Top rated"} films={props.films} />
      <FilmList type={"extra"} text={"Most commented"} films={props.films} />
    </section>
  );
};
