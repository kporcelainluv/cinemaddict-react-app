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
  onTabChangeState,
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
    query: undefined
  };

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

  onTabChange = tabType => {
    this.setState(state => onTabChangeState(state, tabType));
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
            onTabChange={this.onTabChange}
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
        {tabType === "stats" && <Stats films={films} />}
        <Footer amount={films.length} />
      </div>
    );
  }
}
