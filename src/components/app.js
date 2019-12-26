import React from "react";

import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
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
