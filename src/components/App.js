import React from "react";

import { Tabs } from "./Tabs";
import { Sorting } from "./Sorting";
import { FilmList } from "./FilmList";
import { mockFilms } from "../mockData";
import { ShowMoreButton } from "./ShowMoreButton";
import { Popup } from "./Popup";
import {
  getAmountOfFilmsIn,
  getSortedFilms,
  getFilmById,
  getFilmsByQuery,
  sortFilmsBySection,
  handleCommentAddingState,
  toggleFilmProperty,
  onCommentDelete,
  handlePersonalRate
} from "../utils";
import { Stats } from "./Stats";
import { Header } from "./Header";
import { SearchResultContainer } from "./SearchResultContainer";
import { Footer } from "./statsComponents/Footer";
import { PER_PAGE, SEARCH_QUERY_LENGTH, FilmListHeading } from "../consts";

export class App extends React.Component {
  state = {
    amountOfFilmsShown: PER_PAGE,
    films: mockFilms,
    openedFilmId: null,
    sortType: "default",
    tabType: `all`,
    query: undefined,
    error: false
  };

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
  componentDidMount() {
    fetch(`https://htmlacademy-es-10.appspot.com/cinemaddict/movies`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Basic eo0w590ik29889a=${Math.random()}`,
        "Content-Type": "application/json"
      }),
      body: null
    })
      .then(this.checkStatus)
      .then(res => res.json())
      .then(films => {
        this.setState({ films });
      });
  }

  onFilmClick = id => {
    this.setState({
      openedFilmId: id
    });
  };

  handleRateFilm = (filmId, newPersonalRating) => {
    this.setState(state =>
      handlePersonalRate(state, filmId, newPersonalRating)
    );
  };

  handleTabSwitching = type => {
    this.setState({ tabType: type });
  };

  handleAddComment = (filmId, newComment) => {
    this.setState(state => handleCommentAddingState(state, filmId, newComment));
  };

  handleDeleteComment = (filmId, commentId) => {
    this.setState(state => onCommentDelete(state, filmId, commentId));
  };

  handleAddToWatchlist = filmId => {
    this.setState(state => toggleFilmProperty(state, filmId, "watchlist"));
  };

  handleAddToHistory = filmId => {
    this.setState(state =>
      toggleFilmProperty(state, filmId, `already_watched`)
    );
  };

  handleAddToFavourite = filmId => {
    this.setState(state => toggleFilmProperty(state, filmId, `favorite`));
  };

  onSortTypeChange = sortType => {
    this.setState({ sortType });
  };

  onPopupClose = () => {
    this.setState({ openedFilmId: null });
  };

  getSearchQuery = query => {
    if (query.length >= SEARCH_QUERY_LENGTH) {
      this.setState({ query });
    } else {
      this.setState({ query: undefined });
    }
  };

  handleCancelSearch = () => {
    this.setState({ query: undefined });
  };

  onClickShowMore = () => {
    if (this.state.amountOfFilmsShown <= this.state.films.length) {
      this.setState({
        amountOfFilmsShown: this.state.amountOfFilmsShown + PER_PAGE
      });
    }
  };
  // TODO: after query is empty active tab is stats.tabType
  render() {
    const { query, tabType, films, openedFilmId } = this.state;

    const filmsToDisplay = getSortedFilms(
      this.state.sortType,
      this.state.tabType,
      this.state.films
    ).slice(0, this.state.amountOfFilmsShown);

    const mostCommentedFilms = sortFilmsBySection(films, `comments`, `length`);
    const topRatedFilms = sortFilmsBySection(
      films,
      `film_info`,
      `total_rating`
    );
    return (
      <div>
        <Header
          films={films}
          getSearchQuery={this.getSearchQuery}
          handleCancelSearchButton={this.handleCancelSearch}
        />
        {!query && (
          <Tabs
            handleTabSwitching={this.handleTabSwitching}
            activeTab={tabType}
            watchlist={getAmountOfFilmsIn(`watchlist`, films)}
            watched={getAmountOfFilmsIn(`history`, films)}
            favorites={getAmountOfFilmsIn(`favorites`, films)}
          />
        )}
        {tabType !== "stats" && !query && (
          <div>
            <Sorting onSortTypeChange={this.onSortTypeChange} />
            <section className="films">
              <FilmList
                type={"regular"}
                text={FilmListHeading.ALL}
                films={filmsToDisplay}
                onFilmClick={this.onFilmClick}
                handleClickWatchlist={this.handleAddToWatchlist}
                handleClickWatched={this.handleAddToHistory}
                handleClickFavorite={this.handleAddToFavourite}
              />
              {this.state.amountOfFilmsShown < films.length && (
                <ShowMoreButton onClickShowMore={this.onClickShowMore} />
              )}
              {topRatedFilms.length > 0 && (
                <FilmList
                  type={"extra"}
                  text={FilmListHeading.RATED}
                  films={topRatedFilms}
                  onFilmClick={this.onFilmClick}
                  handleClickWatchlist={this.handleAddToWatchlist}
                  handleClickWatched={this.handleAddToHistory}
                  handleClickFavorite={this.handleAddToFavourite}
                />
              )}
              {mostCommentedFilms.length > 0 && (
                <FilmList
                  type={"extra"}
                  text={FilmListHeading.COMMENTED}
                  films={mostCommentedFilms}
                  onFilmClick={this.onFilmClick}
                  handleClickWatchlist={this.handleAddToWatchlist}
                  handleClickWatched={this.handleAddToHistory}
                  handleClickFavorite={this.handleAddToFavourite}
                />
              )}
            </section>
          </div>
        )}
        {openedFilmId && (
          <Popup
            film={getFilmById(openedFilmId, films)}
            onPopupClose={this.onPopupClose}
            handleClickWatchlist={this.handleAddToWatchlist}
            handleClickWatched={this.handleAddToHistory}
            handleClickFavorite={this.handleAddToFavourite}
            handleCommentDeleting={this.handleDeleteComment}
            handleAddComment={this.handleAddComment}
            handlePersonalRating={this.handleRateFilm}
          />
        )}

        {query && (
          <SearchResultContainer
            films={getFilmsByQuery(films, query)}
            onFilmClick={this.onFilmClick}
            handleClickWatchlist={this.handleAddToWatchlist}
            handleClickWatched={this.handleAddToHistory}
            handleClickFavorite={this.handleAddToFavourite}
          />
        )}
        {!query && tabType === "stats" && <Stats films={films} />}
        <Footer amount={films.length} />
      </div>
    );
  }
}
