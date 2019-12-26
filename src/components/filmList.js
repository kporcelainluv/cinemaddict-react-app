import React from "react";
import { FilmCard } from "./film-card";

export const FilmList = ({ type, text, films }) => {
  console.log(films);
  if (type === "extra") {
    return (
      <section className="films-list--extra">
        <h2 className="films-list__title">{text}</h2>
        <div className="films-list__container">
          {films.slice(0, 2).map(film => {
            return <FilmCard props={film} key={film.id} />;
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
            return <FilmCard props={film} key={film.id} />;
          })}
        </div>
      </section>
    );
  }
};
