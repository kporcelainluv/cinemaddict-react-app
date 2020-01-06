import React from "react";
import moment from "moment";
import { countHoursAndMins } from "../utils";

export class FilmCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.film = props.film;
    this.onFilmClick = props.onFilmClick;
    this.updateFilmHandler = props.updateFilmHandler;
  }
  state = { isOpen: false, watched: false, watchlist: false, favorite: false };
  onHandleTitleClick = film => {
    this.setState({ isOpen: true });
    // TODO: ask why I can't pass this.state.isOpen instead of true
    this.onFilmClick(film.id, true);
  };

  getClassName(classname, stateName) {
    if (this.state[stateName] === true) {
      return `film-card__controls-item button film-card__controls-item--${classname} film-card__controls-item--active`;
    } else {
      return `film-card__controls-item button film-card__controls-item--${classname}`;
    }
  }
  componentDidMount() {
    this.setState({
      isOpen: true,
      watched: this.film.user_details.already_watched,
      watchlist: this.film.user_details.watchlist,
      favorite: this.film.user_details.favorite
    });
  }

  render() {
    // TODO: fix this.film
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
        <form className="film-card__controls">
          <button
            className={this.getClassName(`add-to-watchlist`, `watchlist`)}
            onClick={e => {
              e.preventDefault();
              this.setState({ watchlist: !this.state.watchlist });
              const updatedFilm = {
                ...film,
                user_details: { watchlist: !film.user_details.watchlist }
              };
              this.updateFilmHandler(updatedFilm);
            }}
          >
            Add to watchlist
          </button>
          <button
            className={this.getClassName(`mark-as-watched`, `watched`)}
            onClick={e => {
              e.preventDefault();
              this.setState({ watched: !this.state.watched });
              const updatedFilm = {
                ...film,
                user_details: {
                  already_watched: !film.user_details.already_watched
                }
              };
              this.updateFilmHandler(updatedFilm);
            }}
          >
            Mark as watched
          </button>
          <button
            className={this.getClassName(`favorite`, `favorite`)}
            onClick={e => {
              e.preventDefault();
              this.setState({ favorite: !this.state.favorite });
              const updatedFilm = {
                ...film,
                user_details: {
                  favorite: !film.user_details.favorite
                }
              };
              this.updateFilmHandler(updatedFilm);
            }}
          >
            Mark as favorite
          </button>
        </form>
      </article>
    );
  }
}
