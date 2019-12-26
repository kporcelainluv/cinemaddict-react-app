import React from "react";
import moment from "moment";
import { countHoursAndMins } from "../utils";

const getGenreHeading = genres => {
  if (genres.length > 1) {
    return "Genres";
  } else {
    return "Genre";
  }
};

export const Popup = ({ film }) => {
  const [hours, minutes] = countHoursAndMins(film.film_info.runtime);
  return (
    <section className="film-details">
      <form className="film-details__inner" action="" method="get">
        <div className="form-details__top-container">
          <div className="film-details__close">
            <button className="film-details__close-btn" type="button">
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

              <p className="film-details__age">{film.film_info.age_rating}+</p>
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
                <tr className="film-details__row">
                  <td className="film-details__term">Director</td>
                  <td className="film-details__cell">
                    {film.film_info.director}
                  </td>
                </tr>
                <tr className="film-details__row">
                  <td className="film-details__term">Writers</td>
                  <td className="film-details__cell">
                    {film.film_info.writers.reduce((str, elm) => {
                      str += `${elm}, `;
                      return str;
                    }, ``)}
                  </td>
                </tr>
                <tr className="film-details__row">
                  <td className="film-details__term">Actors</td>
                  <td className="film-details__cell">
                    {film.film_info.actors.reduce((str, elm) => {
                      str += `${elm}, `;
                      return str;
                    }, ``)}
                  </td>
                </tr>
                <tr className="film-details__row">
                  <td className="film-details__term">Release Date</td>
                  <td className="film-details__cell">
                    {moment(film.film_info.release.date).format(`DD MMMM YYYY`)}
                  </td>
                </tr>
                <tr className="film-details__row">
                  <td className="film-details__term">Runtime</td>
                  <td className="film-details__cell">
                    {hours}h {minutes}m
                  </td>
                </tr>
                <tr className="film-details__row">
                  <td className="film-details__term">Country</td>
                  <td className="film-details__cell">
                    {film.film_info.release.release_country}
                  </td>
                </tr>
                <tr className="film-details__row">
                  <td className="film-details__term">
                    {getGenreHeading(film.film_info.genre)}
                  </td>
                  <td className="film-details__cell">
                    {film.film_info.genre.map(genre => {
                      return (
                        <span className="film-details__genre">{genre}</span>
                      );
                    })}
                  </td>
                </tr>
              </table>

              <p className="film-details__film-description">
                {film.film_info.description}
              </p>
            </div>
          </div>

          <section className="film-details__controls">
            <input
              type="checkbox"
              className="film-details__control-input visually-hidden"
              id="watchlist"
              name="watchlist"
            />
            <label
              htmlFor="watchlist"
              className="film-details__control-label film-details__control-label--watchlist"
            >
              Add to watchlist
            </label>

            <input
              type="checkbox"
              className="film-details__control-input visually-hidden"
              id="watched"
              name="watched"
            />
            <label
              htmlFor="watched"
              className="film-details__control-label film-details__control-label--watched"
            >
              Already watched
            </label>

            <input
              type="checkbox"
              className="film-details__control-input visually-hidden"
              id="favorite"
              name="favorite"
            />
            <label
              htmlFor="favorite"
              className="film-details__control-label film-details__control-label--favorite"
            >
              Add to favorites
            </label>
          </section>
        </div>

        <div className="form-details__bottom-container">
          <section className="film-details__comments-wrap">
            <h3 className="film-details__comments-title">
              Comments{" "}
              <span className="film-details__comments-count">
                {film.comments.length}
              </span>
            </h3>

            <ul className="film-details__comments-list">
              <li className="film-details__comment">
                <span className="film-details__comment-emoji">
                  <img
                    src="./images/emoji/smile.png"
                    width="55"
                    height="55"
                    alt="emoji"
                  />
                </span>
                <div>
                  <p className="film-details__comment-text">
                    Interesting setting and a good cast
                  </p>
                  <p className="film-details__comment-info">
                    <span className="film-details__comment-author">
                      Tim Macoveev
                    </span>
                    <span className="film-details__comment-day">
                      3 days ago
                    </span>
                    <button className="film-details__comment-delete">
                      Delete
                    </button>
                  </p>
                </div>
              </li>
              <li className="film-details__comment">
                <span className="film-details__comment-emoji">
                  <img
                    src="./images/emoji/sleeping.png"
                    width="55"
                    height="55"
                    alt="emoji"
                  />
                </span>
                <div>
                  <p className="film-details__comment-text">Booooooooooring</p>
                  <p className="film-details__comment-info">
                    <span className="film-details__comment-author">
                      John Doe
                    </span>
                    <span className="film-details__comment-day">
                      2 days ago
                    </span>
                    <button className="film-details__comment-delete">
                      Delete
                    </button>
                  </p>
                </div>
              </li>
              <li className="film-details__comment">
                <span className="film-details__comment-emoji">
                  <img
                    src="./images/emoji/puke.png"
                    width="55"
                    height="55"
                    alt="emoji"
                  />
                </span>
                <div>
                  <p className="film-details__comment-text">
                    Very very old. Meh
                  </p>
                  <p className="film-details__comment-info">
                    <span className="film-details__comment-author">
                      John Doe
                    </span>
                    <span className="film-details__comment-day">
                      2 days ago
                    </span>
                    <button className="film-details__comment-delete">
                      Delete
                    </button>
                  </p>
                </div>
              </li>
              <li className="film-details__comment">
                <span className="film-details__comment-emoji">
                  <img
                    src="./images/emoji/angry.png"
                    width="55"
                    height="55"
                    alt="emoji"
                  />
                </span>
                <div>
                  <p className="film-details__comment-text">
                    Almost two hours? Seriously?
                  </p>
                  <p className="film-details__comment-info">
                    <span className="film-details__comment-author">
                      John Doe
                    </span>
                    <span className="film-details__comment-day">Today</span>
                    <button className="film-details__comment-delete">
                      Delete
                    </button>
                  </p>
                </div>
              </li>
            </ul>

            <div className="film-details__new-comment">
              <div
                htmlFor="add-emoji"
                className="film-details__add-emoji-label"
              ></div>

              <label className="film-details__comment-label">
                <textarea
                  className="film-details__comment-input"
                  placeholder="Select reaction below and write comment here"
                  name="comment"
                ></textarea>
              </label>

              <div className="film-details__emoji-list">
                <input
                  className="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-smile"
                  value="sleeping"
                />
                <label
                  className="film-details__emoji-label"
                  htmlFor="emoji-smile"
                >
                  <img
                    src="./images/emoji/smile.png"
                    width="30"
                    height="30"
                    alt="emoji"
                  />
                </label>

                <input
                  className="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-sleeping"
                  value="neutral-face"
                />
                <label
                  className="film-details__emoji-label"
                  htmlFor="emoji-sleeping"
                >
                  <img
                    src="./images/emoji/sleeping.png"
                    width="30"
                    height="30"
                    alt="emoji"
                  />
                </label>

                <input
                  className="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-gpuke"
                  value="grinning"
                />
                <label
                  className="film-details__emoji-label"
                  htmlFor="emoji-gpuke"
                >
                  <img
                    src="./images/emoji/puke.png"
                    width="30"
                    height="30"
                    alt="emoji"
                  />
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  );
};
