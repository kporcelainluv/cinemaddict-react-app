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
    openedFilmId: null,
    sortingType: "default",
    tabType: `all`,
    query: undefined
  };

  onFilmClick = id => {
    this.setState({
      openedFilmId: id
    });
  };

  handleCommentAdding = (filmId, newComment) => {
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
    // TODO: handle doble clicking before rerendering
    if (type === "all") {
      this.setState({
        ...this.state,
        tabType: "all",
        amountOfFilmsShown: 5,
        films: this.state.allFilms.slice(0, this.state.amountOfFilmsShown)
      });
    } else if (type === "watchlist") {
      this.setState({
        ...this.state,
        tabType: "watchlist",
        amountOfFilmsShown: 5,
        films: this.state.allFilms.slice(0, this.state.amountOfFilmsShown)
      });
    } else if (type === "history") {
      this.setState({
        ...this.state,
        tabType: "history",
        amountOfFilmsShown: 5,
        films: this.state.allFilms.slice(0, this.state.amountOfFilmsShown)
      });
    } else if (type === "favorites") {
      this.setState({
        ...this.state,
        tabType: "favorites",
        amountOfFilmsShown: 5,
        films: this.state.allFilms.slice(0, this.state.amountOfFilmsShown)
      });
    } else if (type === "stats") {
      this.setState({
        ...this.state,
        tabType: "stats",
        amountOfFilmsShown: 5,
        films: this.state.allFilms.slice(0, this.state.amountOfFilmsShown)
      });
    }
  };

  onPopupClose = () => {
    this.setState({ openedFilmId: null });
  };

  getSearchQuery = query => {
    // TODO: fix late coming of query by 1 letter
    if (query.length > 2) {
      this.setState({ query });
    } else {
      this.setState({ query: undefined });
    }
  };

  handleCancelSearchButton = () => {
    this.setState({ query: undefined });
  };

  onClickShowMore = () => {
    console.log("amount", this.state.amountOfFilmsShown);
    // TODO: FIX DOUBLE PRESSING BTN BEFORE FIRST RENDER

    if (this.state.amountOfFilmsShown <= this.state.allFilms.length) {
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
        {!this.state.query && (
          <Tabs
            onTabChange={this.onTabChange}
            watchlist={getTabsFilmsLength(`watchlist`, this.state.allFilms)}
            watched={getTabsFilmsLength(`history`, this.state.allFilms)}
            favorites={getTabsFilmsLength(`favorites`, this.state.allFilms)}
          />
        )}
        {this.state.tabType !== "stats" && !this.state.query && (
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
              {this.state.amountOfFilmsShown <= this.state.allFilms.length ? (
                <ShowMoreButton onClickShowMore={this.onClickShowMore} />
              ) : (
                ``
              )}

              {/*<FilmList type={"extra"} text={"Top rated"} films={props.films} />*/}
              {/*<FilmList type={"extra"} text={"Most commented"} films={props.films} />*/}
            </section>
          </div>
        )}

        {this.state.openedFilmId && (
          <Popup
            film={getFilmById(this.state.openedFilmId, films)}
            onPopupClose={this.onPopupClose}
            handleClickWatchlist={this.handleClickWatchlist}
            handleClickWatched={this.handleClickWatched}
            handleClickFavorite={this.handleClickFavorite}
            handleCommentDeleting={this.handleCommentDeleting}
            handleCommentAdding={this.handleCommentAdding}
          />
        )}

        {this.state.query && (
          <SearchResultContainer
            films={filterFilms(this.state.allFilms, this.state.query)}
            onFilmClick={this.onFilmClick}
            handleClickWatchlist={this.handleClickWatchlist}
            handleClickWatched={this.handleClickWatched}
            handleClickFavorite={this.handleClickFavorite}
          />
        )}
        {this.state.tabType === "stats" && <Stats films={this.state.films} />}
        <Footer amount={this.state.allFilms.length} />
      </div>
    );
  }
}
