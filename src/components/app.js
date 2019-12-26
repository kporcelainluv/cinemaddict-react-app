import React from "react";

import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
import { FilmsSection } from "./filmsSection";
import { mockFilms } from "../mockData";
import { Popup } from "./Popup";
import { sortByDefault, sortByDate, sortByRating } from "../utils";

export class App extends React.Component {
  state = {
    isPopupOpened: false,
    filmId: null,
    sortingType: "default",
    films: mockFilms
  };

  onFilmClick = (id, isOpened) => {
    this.setState({
      filmId: id,
      isPopupOpened: isOpened
    });
  };

  onSortingTypeChange = type => {
    if (type === "default") {
      this.setState({ sortingType: "default" });
    } else if (type === "date") {
      this.setState({ sortingType: "date" });
    } else if (type === "rating") {
      this.setState({ sortingType: "rating" });
    }
  };

  onPopupClose = () => {
    this.setState({ filmId: null, isPopupOpened: false });
  };

  getFilmById = (id, films) => {
    const film = films.filter(elm => elm.id === id)[0];
    return film;
  };
  render() {
    const sortedFilms = (type, films) => {
      if (type === "default") {
        const a = sortByDefault(films);
        return sortByDefault(films);
      } else if (type === "date") {
        return sortByDate(films);
      } else if (type === "rating") {
        return sortByRating(films);
      }
    };
    return (
      <div>
        <Tabs />
        <Sorting onSortingTypeChange={this.onSortingTypeChange} />
        <FilmsSection
          films={sortedFilms(this.state.sortingType, this.state.films)}
          onFilmClick={this.onFilmClick}
        />
        {this.state.isPopupOpened && (
          <Popup
            film={this.getFilmById(
              this.state.filmId,
              sortedFilms(this.state.sortingType, this.state.films)
            )}
            onPopupClose={this.onPopupClose}
          />
        )}
      </div>
    );
  }
}
