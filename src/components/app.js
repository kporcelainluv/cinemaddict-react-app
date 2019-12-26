import React from "react";

import { FilmCard } from "./film-card";
import { mockFilms } from "../mockData";
import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
import { ShowMoreButton } from "./showMoreButton";
import { FilmsSection } from "./filmsSection";
import { FilmsList } from "./filmsListSection";
import { ExtraFilmList } from "./filmListExtra";

export class App extends React.Component {
  // pass children
  render() {
    return (
      <div>
        <Tabs />
        <Sorting />
        <section className="films-list">
          <FilmsList>


            <div className="films-list__container">
              {mockFilms.map(film => {
                return <FilmCard props={film} key={film.id} />;
              })}
            </div>

            <ShowMoreButton />
          </FilmsList>

          {/*  <ExtraFilmList name={"Top rated"}>*/}
          {/*    <div className="films-list__container">*/}
          {/*      {mockFilms.slice(0, 2).map(film => {*/}
          {/*        return <FilmCard props={film} key={film.id} />;*/}
          {/*      })}*/}
          {/*    </div>*/}
          {/*  </ExtraFilmList>*/}

          {/*  <ExtraFilmList name={"Most commented"}>*/}
          {/*    <div className="films-list__container">*/}
          {/*      {mockFilms.slice(0, 2).map(film => {*/}
          {/*        return <FilmCard props={film} key={film.id} />;*/}
          {/*      })}*/}
          {/*    </div>*/}
          {/*  </ExtraFilmList>*/}
        </section>
      </div>
    );
  }
}
