import React from "react";
import { mockFilms } from "../mockData";
import { FilmCard } from "./film-card";
import { ShowMoreButton } from "./showMoreButton";
export const FilmsSection = props => {
  return (
    <section className="films-list">
      <section className="films-list">
        <h2 className="films-list__title visually-hidden">
          All movies. Upcoming
        </h2>

        <div className="films-list__container">
          {mockFilms.map(film => {
            return <FilmCard props={film} key={film.id} />;
          })}
        </div>

        <ShowMoreButton />
      </section>

      <section className="films-list--extra">
        <h2 className="films-list__title">Top rated</h2>
        <div className="films-list__container">
          {mockFilms.slice(0, 2).map(film => {
            return <FilmCard props={film} key={film.id} />;
          })}
        </div>
      </section>

      <section className="films-list--extra">
        <h2 className="films-list__title">Most commented</h2>
        <div className="films-list__container">
          {mockFilms.slice(0, 2).map(film => {
            return <FilmCard props={film} key={film.id} />;
          })}
        </div>
      </section>
    </section>
  );
};
