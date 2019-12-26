import React from "react";

import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
import { FilmsSection } from "./filmsSection";
import { mockFilms } from "../mockData";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Tabs />
        <Sorting />
        <FilmsSection films={mockFilms} />
      </div>
    );
  }
}
