import React from "react";

import { Tabs } from "./tabs";
import { Sorting } from "./sorting";
import { FilmsSection } from "./filmsSection";
import { mockFilms } from "../mockData";
import { Popup } from "./Popup";
import {
  sortByDefault,
  sortByDate,
  sortByRating,
  getWatchlist,
  getFavorite,
  getWatched
} from "../utils";
import { NavTab } from "../consts";

export class App extends React.Component {
  state = {
    films: mockFilms,
    isPopupOpened: false,
    filmId: null,
    sortingType: "default",
    tabType: `all`
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

  onTabChange = type => {
    if (type === "all") {
      this.setState({ tabType: "all" });
    } else if (type === "watchlist") {
      this.setState({ tabType: "watchlist" });
    } else if (type === "history") {
      this.setState({ tabType: "history" });
    } else if (type === "favorites") {
      this.setState({ tabType: "favorites" });
    }
  };

  onPopupClose = () => {
    this.setState({ filmId: null, isPopupOpened: false });
  };

  getFilmById = (id, films) => {
    const film = films.filter(elm => elm.id === id)[0];
    return film;
  };

  sortedFilms = (type, films) => {
    if (type === "default") {
      return sortByDefault(films);
    } else if (type === "date") {
      return sortByDate(films);
    } else if (type === "rating") {
      return sortByRating(films);
    }
  };
  tabFilms = (tabType, films) => {
    if (tabType === NavTab.ALL) {
      return films;
    } else if (tabType === NavTab.WATCHLIST) {
      return getWatchlist(films);
    } else if (tabType === NavTab.HISTORY) {
      return getWatched(films);
    } else if (tabType === NavTab.FAVORITES) {
      return getFavorite(films);
    }
    // else if (tabType === NavTab.STATS)
  };
  getSortedFilms = (sortType, tabType, films) => {
    return this.tabFilms(tabType, this.sortedFilms(sortType, films));
  };
  render() {
    const films = this.getSortedFilms(
      this.state.sortingType,
      this.state.tabType,
      this.state.films
    );

    return (
      <div>
        <Tabs onTabChange={this.onTabChange} />
        <Sorting onSortingTypeChange={this.onSortingTypeChange} />
        <FilmsSection films={films} onFilmClick={this.onFilmClick} />
        {this.state.isPopupOpened && (
          <Popup
            film={this.getFilmById(this.state.filmId, films)}
            onPopupClose={this.onPopupClose}
          />
        )}
      </div>
    );
  }
}
