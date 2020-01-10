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
  filterFilms,
  getTopRatedFilms,
  getMostCommentedFilms
} from "../utils";
import { Stats } from "./Stats";
import { Header } from "./Header";
import { SearchResultContainer } from "./SearchResultContainer";
import { Footer } from "./statsComponents/Footer";
import {
  NavTab,
  PER_PAGE,
  SEARCH_QUERY_LENGTH,
  SortType,
  FilmListHeading
} from "../consts";

export class App extends React.Component {
  state = {
    amountOfFilmsShown: PER_PAGE,
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

  handlePersonalRating = (filmId, newPersonalRating) => {
    this.setState(state => ({
      ...state,
      films: state.films.map(film => {
        if (film.id === filmId) {
          return {
            ...film,
            user_details: {
              ...film.user_details,
              personal_rating: newPersonalRating
            }
          };
        }
        return film;
      })
    }));
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
    if (type === SortType.DEFAULT) {
      this.setState({ sortingType: SortType.DEFAULT });
    } else if (type === SortType.DATE) {
      this.setState({ sortingType: SortType.DATE });
    } else if (type === SortType.RATING) {
      this.setState({ sortingType: SortType.RATING });
    }
  };

  onTabChange = type => {
    if (type === NavTab.ALL) {
      this.setState({
        ...this.state,
        tabType: NavTab.ALL,
        amountOfFilmsShown: 5
      });
    } else if (type === NavTab.WATCHLIST) {
      this.setState({
        ...this.state,
        tabType: NavTab.WATCHLIST,
        amountOfFilmsShown: 5
      });
    } else if (type === NavTab.HISTORY) {
      this.setState({
        ...this.state,
        tabType: NavTab.HISTORY,
        amountOfFilmsShown: 5
      });
    } else if (type === NavTab.FAVORITES) {
      this.setState({
        ...this.state,
        tabType: NavTab.FAVORITES,
        amountOfFilmsShown: 5
      });
    } else if (type === NavTab.STATS) {
      this.setState({
        ...this.state,
        tabType: NavTab.STATS,
        amountOfFilmsShown: 5
      });
    }
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

  handleCancelSearchButton = () => {
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
    const films = getSortedFilms(
      this.state.sortingType,
      this.state.tabType,
      this.state.films
    ).slice(0, this.state.amountOfFilmsShown);

    const mostCommentedFilms = getMostCommentedFilms(this.state.films);
    const topRatedFilms = getTopRatedFilms(this.state.films);
    return (
      <div>
        <Header
          films={this.state.films}
          getSearchQuery={this.getSearchQuery}
          handleCancelSearchButton={this.handleCancelSearchButton}
        />
        {!this.state.query && (
          <Tabs
            onTabChange={this.onTabChange}
            watchlist={getTabsFilmsLength(`watchlist`, this.state.films)}
            watched={getTabsFilmsLength(`history`, this.state.films)}
            favorites={getTabsFilmsLength(`favorites`, this.state.films)}
          />
        )}
        {this.state.tabType !== "stats" && !this.state.query && (
          <div>
            <Sorting onSortingTypeChange={this.onSortingTypeChange} />
            <section className="films">
              <FilmList
                type={"regular"}
                text={FilmListHeading.ALL}
                films={films}
                onFilmClick={this.onFilmClick}
                handleClickWatchlist={this.handleClickWatchlist}
                handleClickWatched={this.handleClickWatched}
                handleClickFavorite={this.handleClickFavorite}
              />
              {this.state.amountOfFilmsShown < this.state.films.length ? (
                <ShowMoreButton onClickShowMore={this.onClickShowMore} />
              ) : (
                ``
              )}
              (topRatedFilms &&
              <FilmList
                type={"extra"}
                text={FilmListHeading.RATED}
                films={topRatedFilms}
                onFilmClick={this.onFilmClick}
                handleClickWatchlist={this.handleClickWatchlist}
                handleClickWatched={this.handleClickWatched}
                handleClickFavorite={this.handleClickFavorite}
              />
              ) (mostCommentedFilms &&
              <FilmList
                type={"extra"}
                text={FilmListHeading.COMMENTED}
                films={mostCommentedFilms}
                onFilmClick={this.onFilmClick}
                handleClickWatchlist={this.handleClickWatchlist}
                handleClickWatched={this.handleClickWatched}
                handleClickFavorite={this.handleClickFavorite}
              />
              )
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
            handlePersonalRating={this.handlePersonalRating}
          />
        )}

        {this.state.query && (
          <SearchResultContainer
            films={filterFilms(this.state.films, this.state.query)}
            onFilmClick={this.onFilmClick}
            handleClickWatchlist={this.handleClickWatchlist}
            handleClickWatched={this.handleClickWatched}
            handleClickFavorite={this.handleClickFavorite}
          />
        )}
        {this.state.tabType === "stats" && <Stats films={this.state.films} />}
        <Footer amount={this.state.films.length} />
      </div>
    );
  }
}
