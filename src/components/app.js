import React from "react";

import { FilmCard } from "./film-card";
import { mockFilms } from "../mockData";
import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
import { ShowMoreButton } from "./showMoreButton";
import { FilmsSection } from "./filmsSection";
import { FilmsList } from "./filmsListSection";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Tabs />
        <Sorting />
        <FilmsSection>
          <FilmsList>
            <h2 className="films-list__title visually-hidden">
              All movies. Upcoming
            </h2>

            <div className="films-list__container">
              {mockFilms.map(film => {
                return <FilmCard props={film} key={film.id} />;
              })}
            </div>

            <ShowMoreButton />
          </FilmsList>

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
        </FilmsSection>
      </div>
    );
  }
}
