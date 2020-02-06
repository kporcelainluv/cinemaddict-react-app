import React from "react";

import { Tabs } from "./Tabs";
import { Sorting } from "./Sorting";
import { FilmList } from "./FilmList";
import { ShowMoreButton } from "./ShowMoreButton";
import { Popup } from "./Popup";
import {
  getAmountOfFilmsIn,
  getSortedFilms,
  getFilmById,
  getFilmsByQuery,
  sortFilmsBySection,
  handleCommentAddingState,
  onCommentDelete,
  checkStatus,
  updateFilm
} from "../utils";
import { Stats } from "./Stats";
import { Header } from "./Header";
import { SearchResultContainer } from "./SearchResultContainer";
import { Footer } from "./statsComponents/Footer";
import { PER_PAGE, SEARCH_QUERY_LENGTH, FilmListHeading } from "../consts";
import {
  deleteComment,
  getComment,
  getComments,
  getFilms,
  updateFilmRating,
  updateFilms
} from "../api";

const mergeFilmsAndComments = (films, comments) => {
  return films.map((film, index) => {
    return {
      ...film,
      comments: comments[index]
    };
  });
};

export class App extends React.Component {
  state = {
    amountOfFilmsShown: PER_PAGE,
    films: [],
    openedFilmId: null,
    sortType: "default",
    tabType: `all`,
    query: undefined,
    error: false
  };

  componentDidMount() {
    getFilms()
      .then(checkStatus)
      .then(res => res.json())
      .then(films =>
        Promise.all(
          films.map(film => {
            return getComments(film.id)
              .then(checkStatus)
              .then(res => res.json());
          })
        ).then(comments => {
          return mergeFilmsAndComments(films, comments);
        })
      )
      .then(films => this.setState({ films }));
  }

  onFilmClick = id => {
    this.setState({
      openedFilmId: id
    });
  };

  handleRateFilm = (filmId, film, newPersonalRating) => {
    updateFilmRating(filmId, film, newPersonalRating)
      .then(checkStatus)
      .then(res => res.json())
      .then(film =>
        this.setState({ films: updateFilm(this.state.films, film) })
      );
  };

  handleTabSwitching = type => {
    this.setState({ tabType: type });
  };

  handleAddComment = (filmId, newComment) => {
    getComment(filmId, newComment)
      .then(checkStatus)
      .then(res => res.json())
      .then(newFilm =>
        this.setState(state => handleCommentAddingState(state, filmId, newFilm))
      );
  };

  handleDeleteComment = (filmId, commentId) => {
    deleteComment(commentId).then(checkStatus);
    this.setState(state => onCommentDelete(state, filmId, commentId));
  };

  handleAddToWatchlist = (filmId, film) => {
    updateFilms(filmId, film, "watchlist")
      .then(checkStatus)
      .then(res => res.json())
      .then(film =>
        this.setState({ films: updateFilm(this.state.films, film) })
      );
  };

  handleAddToHistory = (filmId, film) => {
    updateFilms(filmId, film, "already_watched")
      .then(checkStatus)
      .then(res => res.json())
      .then(film =>
        this.setState({ films: updateFilm(this.state.films, film) })
      );
  };

  handleAddToFavorite = (filmId, film) => {
    updateFilms(filmId, film, "favorite")
      .then(checkStatus)
      .then(res => res.json())
      .then(film =>
        this.setState({ films: updateFilm(this.state.films, film) })
      );
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
            <Sorting
              onSortTypeChange={this.onSortTypeChange}
              currentState={this.state.sortType}
            />
            <section className="films">
              <FilmList
                type={"regular"}
                text={FilmListHeading.ALL}
                films={filmsToDisplay}
                onFilmClick={this.onFilmClick}
                handleClickWatchlist={this.handleAddToWatchlist}
                handleClickWatched={this.handleAddToHistory}
                handleClickFavorite={this.handleAddToFavorite}
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
                  handleClickFavorite={this.handleAddToFavorite}
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
                  handleClickFavorite={this.handleAddToFavorite}
                />
              )}
            </section>
          </div>
        )}

        {query && (
          <SearchResultContainer
            films={getFilmsByQuery(films, query)}
            onFilmClick={this.onFilmClick}
            handleClickWatchlist={this.handleAddToWatchlist}
            handleClickWatched={this.handleAddToHistory}
            handleClickFavorite={this.handleAddToFavorite}
          />
        )}
        {openedFilmId && (
          <Popup
            film={getFilmById(openedFilmId, films)}
            onPopupClose={this.onPopupClose}
            handleClickWatchlist={this.handleAddToWatchlist}
            handleClickWatched={this.handleAddToHistory}
            handleClickFavorite={this.handleAddToFavorite}
            handleDeleteComment={this.handleDeleteComment}
            handleAddComment={this.handleAddComment}
            handlePersonalRating={this.handleRateFilm}
          />
        )}
        {!query && tabType === "stats" && <Stats films={films} />}
        <Footer amount={films.length} />
      </div>
    );
  }
}
