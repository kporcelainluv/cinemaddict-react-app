import React from "react";
import moment from "moment";
import { countHoursAndMins } from "../utils";

export class FilmCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.onFilmClick = props.onFilmClick;
  }
  state = { isOpen: false };

  onHandleTitleClick = film => {
    this.setState({ isOpen: true });
    // TODO: ask why I can't pass this.state.isOpen instead of true
    this.onFilmClick(film.id, true);
    console.log("in filmcard", film.id, true);
  };

  render() {
    // TODO: fix this.props
    const props = this.props.film;
    const year = moment(props.film_info.release.date).format("YYYY");
    const [hours, minutes] = countHoursAndMins(props.film_info.runtime);
    return (
      <article className="film-card">
        <h3
          className="film-card__title"
          onClick={event => {
            event.preventDefault();
            this.onHandleTitleClick(props);
          }}
        >
          {props.film_info.title}
        </h3>
        <p className="film-card__rating">{props.film_info.total_rating}</p>
        <p className="film-card__info">
          <span className="film-card__year">{year}</span>
          <span className="film-card__duration">
            {hours}h {minutes}m
          </span>
          <span className="film-card__genre">
            {props.film_info.genre[0] || ""}
          </span>
        </p>
        <img
          src={props.film_info.poster}
          alt=""
          className="film-card__poster"
          onClick={event => {
            event.preventDefault();
            this.onHandleTitleClick(props);
          }}
        />
        <p className="film-card__description">{props.film_info.description}</p>
        <a
          className="film-card__comments"
          onClick={event => {
            event.preventDefault();
            this.onHandleTitleClick(props);
          }}
        >
          {props.comments.length} comments
        </a>
        <form className="film-card__controls">
          <button className="film-card__controls-item button film-card__controls-item--add-to-watchlist">
            Add to watchlist
          </button>
          <button className="film-card__controls-item button film-card__controls-item--mark-as-watched">
            Mark as watched
          </button>
          <button className="film-card__controls-item button film-card__controls-item--favorite">
            Mark as favorite
          </button>
        </form>
      </article>
    );
  }
}
