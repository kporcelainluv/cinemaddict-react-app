import { NavTab, StatsFilterType, StatsRank } from "./consts";
import { addMonths, addWeeks, addYears, isAfter, startOfToday } from "date-fns";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  parseISO
} from "date-fns";
import moment from "moment";
import React from "react";

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
  return films.slice(0).filter(film => {
    const watchDate = film.user_details.watching_date;
    return isAfter(parseISO(watchDate), date);
  });
};

export const getWatchedFilms = films => {
  return films.length;
};

export const getHoursAndMins = films => {
  const duration = films.slice(0).reduce((acc, elm) => {
    return acc + elm.film_info.runtime;
  }, 0);
  const [hours, minutes] = countHoursAndMins(duration);
  return [hours, minutes];
};

const getSortedGenres = films => {
  const genres = films.slice(0).reduce((acc, elm) => {
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

// export const getGenresByKeysVals = films => {
//   const genres = getSortedGenres(films);
//
//   const keys = genres.map(elm => elm[0]);
//   const values = genres.map(elm => elm[1]);
//   return [keys, values];
// };

export const getTopGenre = films => {
  const genres = getSortedGenres(films);
  if (genres.length === 0) {
    return " ";
  }
  return genres[0][0];
};

export const sortFilmsBySection = (films, section, prop) => {
  if (films.slice(0).every(film => film[section][prop] === 0)) {
    return [];
  }
  return films.slice(0).sort((a, b) => {
    if (a[section][prop] > b[section][prop]) {
      return -1;
    }
    if (a[section][prop] < b[section][prop]) {
      return 1;
    }
    return 0;
  });
};

export const sortByDefault = films => {
  return films.slice(0).sort((a, b) => {
    if (parseInt(a.id) > parseInt(b.id)) {
      return 1;
    } else if (parseInt(a.id) < parseInt(b.id)) {
      return -1;
    }
    return 0;
  });
};

export const sortByDate = films => {
  return films.slice(0).sort((a, b) => {
    return (
      parseInt(b.film_info.release.date, 10) -
      parseInt(a.film_info.release.date, 10)
    );
  });
};

export const sortByRating = films => {
  return films.slice(0).sort((a, b) => {
    return (
      parseInt(b.film_info.total_rating, 10) -
      parseInt(a.film_info.total_rating, 10)
    );
  });
};

export const getFilmsByQuery = (films, query) => {
  const formattedQuery = query.toLowerCase().replace(/[^A-Z0-9]+/gi, ``);
  return films.filter(film =>
    film.film_info.title.toLowerCase().includes(formattedQuery)
  );
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
  return films
    .slice(0)
    .filter(film => film.user_details.already_watched === true).length;
};

export const getWatched = films => {
  return films.slice(0).filter(film => film.user_details.already_watched);
};
export const getWatchlist = films => {
  return films.slice(0).filter(film => film.user_details.watchlist);
};
export const getFavorite = films => {
  return films.slice(0).filter(film => film.user_details.favorite);
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
  return film.film_info.actors.reduce((str, elm) => {
    str += `${elm}, `;
    return str;
  }, ``);
};
export const getWriters = film => {
  return film.film_info.writers.reduce((str, elm) => {
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

export const getAmountOfFilmsIn = (tabType, films) => {
  const tabbedFilms = tabFilms(tabType, films);
  return tabbedFilms.length;
};
export const getSortedFilms = (sortType, tabType, films) => {
  return tabFilms(tabType, getSortedFilmsByType(sortType, films));
};
export const getFilmById = (id, films) => {
  return films.slice(0).filter(elm => elm.id === id)[0];
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

export const toggleFilmProperty = (state, filmId, prop) => {
  return {
    ...state,
    films: state.films.map(film => {
      if (film.id === filmId) {
        return {
          ...film,
          user_details: {
            ...film.user_details,
            [prop]: !film.user_details[prop]
          }
        };
      }
      return film;
    })
  };
};

export const onCommentDelete = (state, filmId, commentId) => {
  return {
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
  };
};

export const handleCommentAddingState = (state, filmId, newFilm) => {
  return {
    ...state,
    films: state.films.map(film => {
      if (film.id === filmId) {
        return {
          ...newFilm.movie,
          comments: newFilm.comments
        };
      }
      return film;
    })
  };
};

export const handlePersonalRate = (state, filmId, personalRating) => {
  return {
    ...state,
    films: state.films.map(film => {
      if (film.id === filmId) {
        return {
          ...film,
          user_details: {
            ...film.user_details,
            personal_rating: personalRating
          }
        };
      }
      return film;
    })
  };
};
export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const updateFilm = (films, newFilm) => {
  return films.map(film => {
    if (film.id === newFilm.id) {
      return {
        ...newFilm,
        comments: film.comments
      };
    }
    return film;
  });
};

export const toggleFilmControls = (film, type) => {
  return {
    ...film,
    user_details: {
      ...film.user_details,
      [type]: !film.user_details[type]
    },
    comments: film.comments.map(elm => elm.id)
  };
};

export const updateRating = (film, rating) => {
  return {
    ...film,
    user_details: {
      ...film.user_details,
      personal_rating: rating,
      watching_date: new Date()
    },
    comments: film.comments.map(elm => elm.id)
  };
};
