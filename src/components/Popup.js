import React from "react";

import { Controls } from "./popupComponents/Controls";
import { Comments } from "./popupComponents/Comments";
import { FilmInfo } from "./popupComponents/FilmInfo";
import { PersonalRating } from "./popupComponents/PersonalRating";

export class Popup extends React.Component {
  state = {
    watched: undefined,
    favorite: undefined,
    watchlist: undefined,
    newComment: {}
  };

  updatePopupState = stateName => {
    switch (stateName) {
      case `watchlist`:
        this.setState({ watchlist: !this.state.watchlist });
        break;
      case `watched`:
        this.setState({ watched: !this.state.watched });
        break;
      case `favorite`:
        this.setState({ favorite: !this.state.favorite });
        break;
      default:
        return ``;
    }
  };
  componentDidMount() {
    window.addEventListener("keydown", evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.props.onPopupClose();
      }
    });
    this.setState({
      watched: this.props.film.user_details.already_watched,
      favorite: this.props.film.user_details.favorite,
      watchlist: this.props.film.user_details.watchlist
    });
  }

  handleSubmit = e => {
    if (e.key === "Enter") {
      console.log("submitting");
      e.preventDefault();
      this.props.handleCommentAdding(this.props.film.id, this.state.newComment);
      this.myFormRef.submit();
    }
  };

  getCurrentComment = (comment, emoji) => {
    const newComment = {
      emotion: emoji,
      comment: comment,
      author: `X`,
      date: new Date()
    };
    console.log(newComment);
    this.setState({ newComment });
  };

  render() {
    const film = this.props.film;
    return (
      <section className="film-details">
        <form
          className="film-details__inner"
          action=""
          method="get"
          ref={el => {
            this.myFormRef = el;
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
                name={`watchlist`}
                updateState={this.updatePopupState}
                handleClick={this.props.handleClickWatchlist}
                checked={this.state.watchlist}
                text={`Add to watchlist`}
              />
              <Controls
                film={film}
                name={`watched`}
                updateState={this.updatePopupState}
                handleClick={this.props.handleClickWatched}
                checked={this.state.watched}
                text={`Already watched`}
              />
              <Controls
                film={film}
                name={`favorite`}
                updateState={this.updatePopupState}
                handleClick={this.props.handleClickFavorite}
                checked={this.state.favorite}
                text={`Add to favorites`}
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
            />
          </div>
          <Comments
            film={film}
            handleCommentDeleting={this.props.handleCommentDeleting}
            getCurrentComment={this.getCurrentComment}
            handleSubmit={this.handleSubmit}
          />
        </form>
      </section>
    );
  }
}
