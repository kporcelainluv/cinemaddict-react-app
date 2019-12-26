import React from "react";

import { FilmCard } from "./film-card";
import { mockFilms } from "../mockData";
import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
import { ShowMoreButton } from "./showMoreButton";
import { FilmsSection } from "./filmsSection";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Tabs />
        <Sorting />
        <FilmsSection />
      </div>
    );
  }
}
