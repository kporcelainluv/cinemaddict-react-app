import React from "react";

import { Tabs } from "./Tabs";
import { Sorting } from "./Sorting";
import { FilmList } from "./FilmList";
import { mockFilms } from "../mockData";
import { ShowMoreButton } from "./ShowMoreButton";
import { Popup } from "./Popup";
import {
  getFavorite,
  getWatched,
  getWatchlist,
  sortByDate,
  sortByDefault,
  sortByRating
} from "../utils";
import { NavTab } from "../consts";
import { Stats } from "./Stats";

export class App extends React.Component {
  state = {
    films: mockFilms,
    isPopupOpened: false,
    filmId: null,
    sortingType: "default",
    tabType: `all`,
    statsOpened: false
  };

  onFilmClick = (id, isOpened) => {
    this.setState({
      filmId: id,
      isPopupOpened: isOpened
    });
  };

  handleClickWatchlist = filmId => {
    this.setState(state => ({
      ...state,
      films: state.films.map(film => {
        if (film.id === filmId) {
          return {
            ...film,
            user_details: {
              ...film.user_details,
              watchlist: !film.user_details.watchlist
            }
          };
        }
        return film;
      })
    }));
  };

  handleClickWatched = filmId => {
    this.setState(state => ({
      ...state,
      films: state.films.map(film => {
        if (film.id === filmId) {
          return {
            ...film,
            user_details: {
              ...film.user_details,
              already_watched: !film.user_details.already_watched
            }
          };
        }
        return film;
      })
    }));
  };
  handleClickFavorite = filmId => {
    this.setState(state => ({
      ...state,
      films: state.films.map(film => {
        if (film.id === filmId) {
          return {
            ...film,
            user_details: {
              ...film.user_details,
              favorite: !film.user_details.favorite
            }
          };
        }
        return film;
      })
    }));
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
    } else if (type === "stats") {
      this.setState({ tabType: "stats", statsOpened: true });
    }
  };

  onPopupClose = () => {
    this.setState({ filmId: null, isPopupOpened: false });
  };

  getFilmById = (id, films) => {
    return films.filter(elm => elm.id === id)[0];
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
    } else if (tabType === NavTab.STATS) {
      return films;
    }
  };
  getTabsFilmsLength = (tabType, films) => {
    const tabedFilms = this.tabFilms(tabType, films);
    return tabedFilms.length;
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
        <Tabs
          onTabChange={this.onTabChange}
          watchlist={this.getTabsFilmsLength(`watchlist`, this.state.films)}
          watched={this.getTabsFilmsLength(`history`, this.state.films)}
          favorites={this.getTabsFilmsLength(`favorites`, this.state.films)}
        />
        <Sorting onSortingTypeChange={this.onSortingTypeChange} />

        <section className="films">
          <FilmList
            type={"regular"}
            text={"All movies. Upcoming"}
            films={films}
            onFilmClick={this.onFilmClick}
            handleClickWatchlist={this.handleClickWatchlist}
            handleClickWatched={this.handleClickWatched}
            handleClickFavorite={this.handleClickFavorite}
          />
          <ShowMoreButton />

          {/*<FilmList type={"extra"} text={"Top rated"} films={props.films} />*/}
          {/*<FilmList type={"extra"} text={"Most commented"} films={props.films} />*/}
        </section>

        {this.state.isPopupOpened && (
          <Popup
            film={this.getFilmById(this.state.filmId, films)}
            onPopupClose={this.onPopupClose}
            handleClickWatchlist={this.handleClickWatchlist}
            handleClickWatched={this.handleClickWatched}
            handleClickFavorite={this.handleClickFavorite}
          />
        )}
        {/*TODO: hide filmsSection */}
        {this.state.statsOpened && <Stats films={this.state.films} />}
      </div>
    );
  }
}
