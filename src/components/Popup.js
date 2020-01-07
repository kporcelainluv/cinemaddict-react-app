import React from "react";
import {
  countHoursAndMins,
  getGenreHeading,
  getActors,
  getWriters,
  getreleaseDate,
  getGenresTemplate
} from "../utils";
import { Controls } from "./popupComponents/Controls";
import { Comments } from "./popupComponents/Comments";
import { FilmDetails } from "./popupComponents/FilmDetails";

export class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.film = props.film;
    this.onPopupClose = props.onPopupClose;
    this.handleClickWatchlist = props.handleClickWatchlist;
    this.handleClickWatched = props.handleClickWatched;
    this.handleClickFavorite = props.handleClickFavorite;
  }
  state = { watched: false, favorite: false, watchlist: false };

  updatePopupState = stateName => {
    if (stateName === `watchlist`) {
      this.setState({ watchlist: !this.state.watchlist });
    } else if (stateName === `watched`) {
      this.setState({ watched: !this.state.watched });
    } else if (stateName === `favorite`) {
      this.setState({ favorite: !this.state.favorite });
    }
  };
  componentDidMount() {
    window.addEventListener("keydown", evt => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this.onPopupClose();
      }
    });
    this.setState({
      watched: this.film.user_details.already_watched,
      favorite: this.film.user_details.favorite,
      watchlist: this.film.user_details.watchlist
    });
  }

  render() {
    const film = this.film;
    const [hours, minutes] = countHoursAndMins(film.film_info.runtime);
    const actors = getActors(film);
    const writers = getWriters(film);
    const releaseDate = getreleaseDate(film);
    const genres = getGenresTemplate(film);

    return (
      <section className="film-details">
        <form className="film-details__inner" action="" method="get">
          <div className="form-details__top-container">
            <div className="film-details__close">
              <button
                className="film-details__close-btn"
                type="button"
                onClick={this.onPopupClose}
              >
                close
              </button>
            </div>
            <div className="film-details__info-wrap">
              <div className="film-details__poster">
                <img
                  className="film-details__poster-img"
                  src={film.film_info.poster}
                  alt=""
                />

                <p className="film-details__age">
                  {film.film_info.age_rating}+
                </p>
              </div>

              <div className="film-details__info">
                <div className="film-details__info-head">
                  <div className="film-details__title-wrap">
                    <h3 className="film-details__title">
                      {film.film_info.title}
                    </h3>
                    <p className="film-details__title-original">
                      Original: {film.film_info.alternative_title}
                    </p>
                  </div>

                  <div className="film-details__rating">
                    <p className="film-details__total-rating">
                      {film.film_info.total_rating}
                    </p>
                  </div>
                </div>

                <table className="film-details__table">
                  <tbody>
                    <FilmDetails
                      heading={`Director`}
                      text={film.film_info.director}
                    />
                    <FilmDetails heading={`Writers`} text={writers} />
                    <FilmDetails heading={`Actors`} text={actors} />
                    <FilmDetails heading={`Release Date`} text={releaseDate} />
                    <FilmDetails
                      heading={`Runtime`}
                      text={`${hours}h ${minutes}m}`}
                    />
                    <FilmDetails
                      heading={`Country`}
                      text={film.film_info.release.release_country}
                    />
                    <FilmDetails
                      heading={getGenreHeading(film.film_info.genre)}
                      text={genres}
                    />
                  </tbody>
                </table>

                <p className="film-details__film-description">
                  {film.film_info.description}
                </p>
              </div>
            </div>

            <section
              className="film-details__controls"
              style={{ justifyContent: `space-between` }}
            >
              <Controls
                film={film}
                name={`watchlist`}
                updateState={this.updatePopupState}
                handleClick={this.handleClickWatchlist}
                checked={this.state.watchlist}
              />
              <Controls
                film={film}
                name={`watched`}
                updateState={this.updatePopupState}
                handleClick={this.handleClickWatched}
                checked={this.state.watched}
              />
              <Controls
                film={film}
                name={`favorite`}
                updateState={this.updatePopupState}
                handleClick={this.handleClickFavorite}
                checked={this.state.favorite}
              />
            </section>
          </div>

          <Comments film={film} />
        </form>
      </section>
    );
  }
}
