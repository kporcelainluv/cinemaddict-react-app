import React from "react";

import { Tabs } from "./Tabs";
import { Sorting } from "./Sorting";
import { FilmList } from "./FilmList";
import { mockFilms } from "../mockData";
import { ShowMoreButton } from "./ShowMoreButton";
import { Popup } from "./Popup";
import {
  sortByDate,
  sortByDefault,
  sortByRating,
  getTabsFilmsLength,
  getSortedFilms,
  getFilmById
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

  handleCommentAdding = (filmId, newComment) => {
    console.log("comment adding");
    this.setState(state => ({
      ...state,
      films: state.films.map(film => {
        if (film.id === filmId) {
          return {
            ...film,
            comments: [...film.comments, newComment]
          };
        }
        console.log({ film });
        return film;
      })
    }));
    console.log(this.state.films);
  };
  handleCommentDeleting = (filmId, commentId) => {
    this.setState(state => ({
      ...state,
      films: state.films.map(film => {
        if (film.id === filmId) {
          return {
            ...film,
            comments: film.comments.filter(comment => comment.id !== commentId)
          };
        }
        return film;
      })
    }));
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

  render() {
    const films = getSortedFilms(
      this.state.sortingType,
      this.state.tabType,
      this.state.films
    );

    return (
      <div>
        <Tabs
          onTabChange={this.onTabChange}
          watchlist={getTabsFilmsLength(`watchlist`, this.state.films)}
          watched={getTabsFilmsLength(`history`, this.state.films)}
          favorites={getTabsFilmsLength(`favorites`, this.state.films)}
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
            film={getFilmById(this.state.filmId, films)}
            onPopupClose={this.onPopupClose}
            handleClickWatchlist={this.handleClickWatchlist}
            handleClickWatched={this.handleClickWatched}
            handleClickFavorite={this.handleClickFavorite}
            handleCommentDeleting={this.handleCommentDeleting}
            handleCommentAdding={this.handleCommentAdding}
          />
        )}
        {/*TODO: hide filmsSection */}
        {this.state.statsOpened && <Stats films={this.state.films} />}
      </div>
    );
  }
}
