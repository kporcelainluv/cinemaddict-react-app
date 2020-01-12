import React from "react";

import { Controls } from "./popupComponents/Controls";
import { Comments } from "./popupComponents/Comments";
import { FilmInfo } from "./popupComponents/FilmInfo";
import { PersonalRating } from "./popupComponents/PersonalRating";
import {
  ControlTabs,
  EVENT_KEY_ESC,
  EVENT_KEY_ESCAPE,
  ControlsText
} from "../consts";

export class Popup extends React.Component {
  state = {
    watched: false,
    favorite: false,
    watchlist: false,
    newComment: {},
    emoji: `smile`,
    comment: ""
  };

  getCurrentEmoji = emoji => {
    this.setState({ emoji });
  };

  getCurrentComment = comment => {
    this.setState({ comment });
  };

  updatePopupState = stateName => {
    switch (stateName) {
      case ControlTabs.WATCHLIST:
        this.setState({ watchlist: !this.state.watchlist });
        break;
      case ControlTabs.HISTORY:
        this.setState({ watched: !this.state.watched });
        break;
      case ControlTabs.FAVORITE:
        this.setState({ favorite: !this.state.favorite });
        break;
      default:
        return ``;
    }
  };
  handlePersonalRatingOpening = filmId => {
    this.setState({ watched: false });
    this.props.handleClickWatched(filmId);
  };
  componentDidMount() {
    window.addEventListener("keydown", evt => {
      if (evt.key === EVENT_KEY_ESC || evt.key === EVENT_KEY_ESCAPE) {
        this.props.onPopupClose();
      }
    });
    this.setState({
      watched: this.props.film.user_details.already_watched,
      favorite: this.props.film.user_details.favorite,
      watchlist: this.props.film.user_details.watchlist
    });
  }

  render() {
    const film = this.props.film;

    return (
      <section className="film-details">
        <form
          className="film-details__inner"
          action=""
          method="get"
          id={"hello"}
          onSubmit={e => {
            e.preventDefault();
            const newComment = {
              id: Math.random()
                .toString(36)
                .substr(2, 9),
              emotion: this.state.emoji,
              comment: this.state.comment,
              author: `X`,
              date: new Date()
            };
            this.props.handleAddComment(film.id, newComment);
            this.setState({ comment: "" });
          }}
        >
          <div className="form-details__top-container">
            <div className="film-details__close">
              <button
                className="film-details__close-btn"
                type="button"
                onClick={this.props.onPopupClose}
              >
                close
              </button>
            </div>

            <FilmInfo film={film} />
            <section
              className="film-details__controls"
              style={{ justifyContent: `space-between` }}
            >
              <Controls
                film={film}
                name={ControlTabs.WATCHLIST}
                updateState={this.updatePopupState}
                handleClick={this.props.handleClickWatchlist}
                checked={this.state.watchlist}
                text={ControlsText.WATCHLIST}
              />
              <Controls
                film={film}
                name={ControlTabs.HISTORY}
                updateState={this.updatePopupState}
                handleClick={this.props.handleClickWatched}
                checked={this.state.watched}
                text={ControlsText.HISTORY}
              />
              <Controls
                film={film}
                name={ControlTabs.FAVORITE}
                updateState={this.updatePopupState}
                handleClick={this.props.handleClickFavorite}
                checked={this.state.favorite}
                text={ControlsText.FAVORITES}
              />
            </section>
          </div>
          <div
            className={`form-details__middle-container ${
              this.state.watched ? `` : `visually-hidden`
            }`}
          >
            <PersonalRating
              personalRating={film.user_details.personal_rating}
              filmId={film.id}
              poster={film.film_info.poster}
              title={film.film_info.title}
              handlePersonalRating={this.props.handlePersonalRating}
              handlePersonalRatingOpening={this.handlePersonalRatingOpening}
            />
          </div>
          <Comments
            film={film}
            comment={this.state.comment}
            emoji={this.state.emoji}
            handleCommentDeleting={this.props.handleCommentDeleting}
            getCurrentComment={this.getCurrentComment}
            getCurrentEmoji={this.getCurrentEmoji}
          />
        </form>
      </section>
    );
  }
}
