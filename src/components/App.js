import React from "react";

import { Tabs } from "./Tabs";
import { Sorting } from "./Sorting";
import { FilmList } from "./FilmList";
import { mockFilms } from "../mockData";
import { ShowMoreButton } from "./ShowMoreButton";
import { Popup } from "./Popup";
import {
  getTabsFilmsLength,
  getSortedFilms,
  getFilmById,
  filterFilms
} from "../utils";
import { Stats } from "./Stats";
import { Header } from "./Header";
import { SearchResultContainer } from "./SearchResultContainer";
import { Footer } from "./statsComponents/Footer";

export class App extends React.Component {
  state = {
    amountOfFilmsShown: 5,
    allFilms: mockFilms,
    films: mockFilms,
    isPopupOpened: false,
    filmId: null,
    sortingType: "default",
    tabType: `all`,
    isStatsOpened: false,
    isSearchInit: false,
    searchFilms: []
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
        return film;
      })
    }));
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
      this.setState({
        tabType: "all",
        isStatsOpened: false,
        amountOfFilmsShown: 5
      });
    } else if (type === "watchlist") {
      this.setState({
        tabType: "watchlist",
        isStatsOpened: false,
        amountOfFilmsShown: 5
      });
    } else if (type === "history") {
      this.setState({
        tabType: "history",
        isStatsOpened: false,
        amountOfFilmsShown: 5
      });
    } else if (type === "favorites") {
      this.setState({
        tabType: "favorites",
        isStatsOpened: false,
        amountOfFilmsShown: 5
      });
    } else if (type === "stats") {
      this.setState({
        tabType: "stats",
        isStatsOpened: true,
        amountOfFilmsShown: 5
      });
    }
  };

  onPopupClose = () => {
    this.setState({ filmId: null, isPopupOpened: false });
  };

  getSearchQuery = query => {
    // TODO: fix late coming of query by 1 letter
    if (query.length > 2) {
      this.setState({ isSearchInit: true });
      const searchFilms = filterFilms(this.state.films, query);
      this.setState({ searchFilms });
    } else {
      this.setState({ isSearchInit: false });
    }
  };

  handleCancelSearchButton = () => {
    this.setState({ isSearchInit: false });
  };

  onClickShowMore = () => {
    console.log("amount", this.state.amountOfFilmsShown);
    // TODO: FIX DOUBLE PRESSING BTN BEFORE FIRST RENDER
    if (this.state.amountOfFilmsShown < this.state.allFilms.length) {
      this.setState({ amountOfFilmsShown: this.state.amountOfFilmsShown + 5 });
      this.setState({
        films: this.state.allFilms.slice(0, this.state.amountOfFilmsShown)
      });
    }
  };

  componentDidMount() {
    this.setState({
      films: this.state.allFilms.slice(0, this.state.amountOfFilmsShown)
    });
  }

  render() {
    const films = getSortedFilms(
      this.state.sortingType,
      this.state.tabType,
      this.state.films
    );

    return (
      <div>
        <Header
          films={this.state.allFilms}
          getSearchQuery={this.getSearchQuery}
          handleCancelSearchButton={this.handleCancelSearchButton}
        />
        {!this.state.isSearchInit && (
          <Tabs
            onTabChange={this.onTabChange}
            watchlist={getTabsFilmsLength(`watchlist`, this.state.films)}
            watched={getTabsFilmsLength(`history`, this.state.films)}
            favorites={getTabsFilmsLength(`favorites`, this.state.films)}
          />
        )}
        {!this.state.isStatsOpened && !this.state.isSearchInit && (
          <div>
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
              <ShowMoreButton onClickShowMore={this.onClickShowMore} />

              {/*<FilmList type={"extra"} text={"Top rated"} films={props.films} />*/}
              {/*<FilmList type={"extra"} text={"Most commented"} films={props.films} />*/}
            </section>
          </div>
        )}

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

        {this.state.isSearchInit && (
          <SearchResultContainer
            films={this.state.searchFilms}
            onFilmClick={this.onFilmClick}
            handleClickWatchlist={this.handleClickWatchlist}
            handleClickWatched={this.handleClickWatched}
            handleClickFavorite={this.handleClickFavorite}
          />
        )}
        {this.state.isStatsOpened && <Stats films={this.state.films} />}
        <Footer amount={this.state.allFilms.length} />
      </div>
    );
  }
}
