import React from "react";
import { ShowMoreButton } from "./showMoreButton";
import { FilmList } from "./filmList";

export const FilmsSection = props => {
  return (
    <section className="films">
      <FilmList type={"regular"} text={"All movies. Upcoming"} />
      <ShowMoreButton />
      <FilmList type={"extra"} text={"Top rated"} />
      <FilmList type={"extra"} text={"Most commented"} />
    </section>
  );
};
