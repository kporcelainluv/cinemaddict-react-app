import React from "react";

import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
import { FilmsSection } from "./filmsSection";
import { mockFilms } from "../mockData";
import { Popup } from "./Popup";

export class App extends React.Component {
  state = { isPopupOpened: false, filmId: null };

  onFilmClick = (id, isOpened) => {
    this.setState({ filmId: id, isPopupOpened: isOpened });
  };

  onPopupClose = () => {
    this.setState({ filmId: null, isPopupOpened: false });
  };

  getFilmById = (id, films) => {
    const film = films.filter(elm => elm.id === id)[0];
    return film;
  };
  render() {
    return (
      <div>
        <Tabs />
        <Sorting />
        <FilmsSection films={mockFilms} onFilmClick={this.onFilmClick} />
        {this.state.isPopupOpened && (
          <Popup
            film={this.getFilmById(this.state.filmId, mockFilms)}
            onPopupClose={this.onPopupClose}
          />
        )}
      </div>
    );
  }
}
