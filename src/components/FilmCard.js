import React from "react";
import moment from "moment";
import { countHoursAndMins } from "../utils";

const getClassname = classname => {
  return `film-card__controls-item button film-card__controls-item--${classname}`;
};

const getClassnameActive = classname => {
  return `film-card__controls-item button film-card__controls-item--${classname} film-card__controls-item--active`;
};

const FilmCardForm = ({
  film,
  handleClickWatchlist,
  handleClickWatched,
  handleClickFavorite
}) => {
  const userDetails = film.user_details;

  return (
    <form className="film-card__controls">
      <button
        className={
          userDetails.watchlist
            ? getClassnameActive("add-to-watchlist")
            : getClassname("add-to-watchlist")
        }
        type={"button"}
        onClick={() => handleClickWatchlist(film.id)}
      >
        Add to watchlist
      </button>
      <button
        className={
          userDetails.already_watched
            ? getClassnameActive("mark-as-watched")
            : getClassname("mark-as-watched")
        }
        type={"button"}
        onClick={() => handleClickWatched(film.id)}
      >
        Mark as watched
      </button>
      <button
        className={
          userDetails.favorite
            ? getClassnameActive("favorite")
            : getClassname("favorite")
        }
        type={"button"}
        onClick={() => handleClickFavorite(film.id)}
      >
        Mark as favorite
      </button>
    </form>
  );
};

export class FilmCard extends React.Component {
  state = { isOpen: false };
  onHandleTitleClick = film => {
    this.setState({ isOpen: true });
    // TODO: ask why I can't pass this.state.isOpen instead of true
    this.props.onFilmClick(film.id, true);
  };

  render() {
    const film = this.props.film;
    const year = moment(film.film_info.release.date).format("YYYY");
    const [hours, minutes] = countHoursAndMins(film.film_info.runtime);
    const description =
      film.film_info.description.length > 139
        ? film.film_info.description.slice(0, 139) + `...`
        : film.film_info.description;
    return (
      <article className="film-card">
        <h3
          className="film-card__title"
          onClick={event => {
            event.preventDefault();
            this.onHandleTitleClick(film);
          }}
        >
          {film.film_info.title}
        </h3>
        <p className="film-card__rating">{film.film_info.total_rating}</p>
        <p className="film-card__info">
          <span className="film-card__year">{year}</span>
          <span className="film-card__duration">
            {hours}h {minutes}m
          </span>
          <span className="film-card__genre">
            {film.film_info.genre[0] || ""}
          </span>
        </p>
        <img
          src={film.film_info.poster}
          alt=""
          className="film-card__poster"
          onClick={event => {
            event.preventDefault();
            this.onHandleTitleClick(film);
          }}
        />
        <p className="film-card__description">{description}</p>
        <a
          className="film-card__comments"
          onClick={event => {
            event.preventDefault();
            this.onHandleTitleClick(film);
          }}
        >
          {film.comments.length} comments
        </a>
        <FilmCardForm
          film={film}
          handleClickWatchlist={this.props.handleClickWatchlist}
          handleClickWatched={this.props.handleClickWatched}
          handleClickFavorite={this.props.handleClickFavorite}
        />
      </article>
    );
  }
}
