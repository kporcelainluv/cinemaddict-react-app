import { sort } from "ramda";
import { NavTab, Position, StatsFilterType, StatsRank } from "./consts";
import { addMonths, addWeeks, addYears, isAfter, startOfToday } from "date-fns";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays
} from "date-fns";
import moment from "moment";
import React from "react";
const Movie = undefined;

export const createElement = template => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    default:
      container.append(element);
      break;
  }
};

export const unrender = element => {
  if (element) {
    element.remove();
  }
};

export const countHoursAndMins = initialMinutes => {
  const hours = Math.floor(initialMinutes / 60);
  const minutes = initialMinutes - hours * 60;
  return [hours, minutes];
};

export const getDateByFilterType = filterType => {
  const today = new Date();

  if (filterType === StatsFilterType.ALL) {
    return addYears(today, -100);
  } else if (filterType === StatsFilterType.YEAR) {
    return addYears(today, -1);
  } else if (filterType === StatsFilterType.MONTH) {
    return addMonths(today, -1);
  } else if (filterType === StatsFilterType.WEEK) {
    return addWeeks(today, -1);
  } else if (filterType === StatsFilterType.TODAY) {
    return startOfToday();
  }
  return false;
};

export const getFilmsByFilter = (films, filterType) => {
  const date = getDateByFilterType(filterType);
  return films.filter(film => {
    const watchDate = film.user_details.watching_date;
    return isAfter(watchDate, date);
  });
};

export const getWatchedFilms = films => {
  return films.length;
};

export const getHoursAndMins = films => {
  const duration = films.reduce((acc, elm) => {
    return acc + elm.film_info.runtime;
  }, 0);
  const [hours, minutes] = countHoursAndMins(duration);
  return [hours, minutes];
};

const getSortedGenres = films => {
  const genres = films.reduce((acc, elm) => {
    const genresList = elm.film_info.genre;
    genresList.forEach(genre => {
      if (genre in acc) {
        acc[genre] += 1;
      } else {
        acc[genre] = 1;
      }
    });

    return acc;
  }, {});

  return Object.entries(genres).sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    }
    return 0;
  });
};

export const getGenresByKeysVals = films => {
  const genres = getSortedGenres(films);

  const keys = genres.map(elm => elm[0]);
  const values = genres.map(elm => elm[1]);
  return [keys, values];
};

export const getTopGenre = films => {
  const genres = getSortedGenres(films);
  // TODO: ADD ON CURRENT PROPJECT
  if (genres.length === 0) {
    return " ";
  }
  return genres[0][0];
};

export const getTopRatedFilms = films => {
  if (films.every(film => Movie.getRating(film) === 0)) {
    return 0;
  }
  return sort((a, b) => {
    if (Movie.getRating(a) > Movie.getRating(b)) {
      return -1;
    }
    if (Movie.getRating(a) < Movie.getRating(b)) {
      return 1;
    }
    return 0;
  }, films);
};

export const getMostCommentedFilms = films => {
  if (films.every(film => Movie.getCommentsLength(film) === 0)) {
    return false;
  }
  return sort((a, b) => {
    if (Movie.getCommentsLength(a) > Movie.getCommentsLength(b)) {
      return -1;
    }
    if (Movie.getCommentsLength(a) < Movie.getCommentsLength(b)) {
      return 1;
    }
    return 0;
  }, films);
};

export const sortByDefault = films => {
  return films
    .sort((a, b) => {
      if (parseInt(a.id) > parseInt(b.id)) {
        return 1;
      } else if (parseInt(a.id) < parseInt(b.id)) {
        return -1;
      }
      return 0;
    })
    .slice(0);
};

export const sortByDate = films => {
  return films
    .sort((a, b) => {
      return (
        parseInt(b.film_info.release.date, 10) -
        parseInt(a.film_info.release.date, 10)
      );
    })
    .slice(0);
};

export const sortByRating = films => {
  return films
    .sort((a, b) => {
      return (
        parseInt(b.film_info.total_rating, 10) -
        parseInt(a.film_info.total_rating, 10)
      );
    })
    .slice(0);
};

export const filterFilms = (films, query) => {
  const formattedQuery = query.toLowerCase().replace(/[^A-Z0-9]+/gi, ``);
  return films.filter(film =>
    Movie.getTitle(film)
      .toLowerCase()
      .includes(formattedQuery)
  );
};
export const filterFilmsbyTab = (navTab, allFilms) => {
  const f = (() => {
    if (navTab === NavTab.WATCHLIST) {
      return getWatchlist;
    } else if (navTab === NavTab.HISTORY) {
      return getWatched;
    } else if (navTab === NavTab.FAVORITES) {
      return getFavorite;
    } else {
      return x => x;
    }
  })();

  return f(allFilms);
};

export const updateFilms = (films, updatedFilm) => {
  return films.reduce((newFilms, film) => {
    if (film.id === updatedFilm.id) {
      return [...newFilms, updatedFilm];
    }
    return [...newFilms, film];
  }, []);
};

export const getStatsRank = watchedAmount => {
  if (watchedAmount < 10) {
    return StatsRank.NOVICE;
  } else if (watchedAmount < 20) {
    return StatsRank.FAN;
  } else if (watchedAmount >= 20) {
    return StatsRank.MOVIEBUFF;
  }
};
export const countWatchedFilms = films => {
  return films.filter(film => film.user_details.already_watched === true)
    .length;
};

export const getWatched = films => {
  return films.filter(film => film.user_details.already_watched).slice(0);
};
export const getWatchlist = films => {
  return films.filter(film => film.user_details.watchlist).slice(0);
};
export const getFavorite = films => {
  return films.filter(film => film.user_details.favorite).slice(0);
};

export const getDistanceInWords = (dateLeft, dateRight) => {
  const differenceinSeconds = differenceInSeconds(dateRight, dateLeft);
  const differenceinMinutes = differenceInMinutes(dateRight, dateLeft);
  const differenceinHours = differenceInHours(dateRight, dateLeft);
  const differenceinDays = differenceInDays(dateRight, dateLeft);

  if (differenceinDays >= 1) {
    return `${differenceinDays} days ago`;
  } else if (differenceinHours >= 2) {
    return `a few hours ago`;
  } else if (differenceinHours >= 1) {
    return `an hour ago`;
  } else if (differenceinMinutes >= 4) {
    return `a few minutes ago`;
  } else if (differenceinMinutes >= 1) {
    return `a minute ago`;
  } else if (differenceinSeconds >= 0 && differenceinSeconds < 60) {
    return `now`;
  }
};

export const getGenreHeading = genres => {
  if (genres.length > 1) {
    return "Genres";
  } else {
    return "Genre";
  }
};

export const getActors = film => {
  film.film_info.actors.reduce((str, elm) => {
    str += `${elm}, `;
    return str;
  }, ``);
};
export const getWriters = film => {
  film.film_info.writers.reduce((str, elm) => {
    str += `${elm}, `;
    return str;
  }, ``);
};

export const getreleaseDate = film => {
  return moment(film.film_info.release.date).format(`DD MMMM YYYY`);
};

export const getGenresTemplate = film => {
  return film.film_info.genre.map(genre => {
    return (
      <span className="film-details__genre" key={genre}>
        {genre}
      </span>
    );
  });
};
export const tabFilms = (tabType, films) => {
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
export const getTabsFilmsLength = (tabType, films) => {
  const tabbedFilms = tabFilms(tabType, films);
  return tabbedFilms.length;
};
export const getSortedFilms = (sortType, tabType, films) => {
  return tabFilms(tabType, getSortedFilmsByType(sortType, films));
};
export const getFilmById = (id, films) => {
  return films.filter(elm => elm.id === id)[0];
};
export const getSortedFilmsByType = (type, films) => {
  if (type === "default") {
    return sortByDefault(films);
  } else if (type === "date") {
    return sortByDate(films);
  } else if (type === "rating") {
    return sortByRating(films);
  }
};
