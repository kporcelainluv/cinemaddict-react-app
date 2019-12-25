import React from "react";

import { FilmCard } from "./film-card";
import { mockFilms } from "../mockData";

export class App extends React.Component {
  render() {
    return (
      <div>
        <nav class="main-navigation">
          <a
            href="#all"
            class="main-navigation__item main-navigation__item--active"
          >
            All movies
          </a>
          <a href="#watchlist" class="main-navigation__item">
            Watchlist <span class="main-navigation__item-count">13</span>
          </a>
          <a href="#history" class="main-navigation__item">
            History <span class="main-navigation__item-count">4</span>
          </a>
          <a href="#favorites" class="main-navigation__item">
            Favorites <span class="main-navigation__item-count">8</span>
          </a>
          <a
            href="#stats"
            class="main-navigation__item main-navigation__item--additional"
          >
            Stats
          </a>
        </nav>{" "}
        <ul class="sort">
          <li>
            <a href="#" class="sort__button sort__button--active">
              Sort by default
            </a>
          </li>
          <li>
            <a href="#" class="sort__button">
              Sort by date
            </a>
          </li>
          <li>
            <a href="#" class="sort__button">
              Sort by rating
            </a>
          </li>
        </ul>{" "}
        <section class="films">
          <section class="films-list">
            <h2 class="films-list__title visually-hidden">
              All movies. Upcoming
            </h2>

            <div class="films-list__container">
              {mockFilms.map(film => {
                return <FilmCard props={film} key={film.id} />;
              })}
            </div>

            <button class="films-list__show-more">Show more</button>
          </section>

          <section class="films-list--extra">
            <h2 class="films-list__title">Top rated</h2>

            <div class="films-list__container">
              <article class="film-card">
                <h3 class="film-card__title">The Man with the Golden Arm</h3>
                <p class="film-card__rating">9.0</p>
                <p class="film-card__info">
                  <span class="film-card__year">1955</span>
                  <span class="film-card__duration">1h 59m</span>
                  <span class="film-card__genre">Drama</span>
                </p>
                <img
                  src="./images/posters/the-man-with-the-golden-arm.jpg"
                  alt=""
                  class="film-card__poster"
                />
                <p class="film-card__description">
                  Frankie Machine (Frank Sinatra) is released from the federal
                  Narcotic Farm in Lexington, Kentucky with a set of drums and a
                  new outlook on…
                </p>
                <a class="film-card__comments">18 comments</a>
                <form class="film-card__controls">
                  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
                    Add to watchlist
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">
                    Mark as watched
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--favorite">
                    Mark as favorite
                  </button>
                </form>
              </article>

              <article class="film-card">
                <h3 class="film-card__title">The Great Flamarion</h3>
                <p class="film-card__rating">8.9</p>
                <p class="film-card__info">
                  <span class="film-card__year">1945</span>
                  <span class="film-card__duration">1h 18m</span>
                  <span class="film-card__genre">Mystery</span>
                </p>
                <img
                  src="./images/posters/the-great-flamarion.jpg"
                  alt=""
                  class="film-card__poster"
                />
                <p class="film-card__description">
                  The film opens following a murder at a cabaret in Mexico City
                  in 1936, and then presents the events leading up to it in
                  flashback. The Grea…
                </p>
                <a class="film-card__comments">12 comments</a>
                <form class="film-card__controls">
                  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
                    Add to watchlist
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">
                    Mark as watched
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--favorite">
                    Mark as favorite
                  </button>
                </form>
              </article>
            </div>
          </section>

          <section class="films-list--extra">
            <h2 class="films-list__title">Most commented</h2>

            <div class="films-list__container">
              <article class="film-card">
                <h3 class="film-card__title">
                  Santa Claus Conquers the Martians
                </h3>
                <p class="film-card__rating">2.3</p>
                <p class="film-card__info">
                  <span class="film-card__year">1964</span>
                  <span class="film-card__duration">1h 21m</span>
                  <span class="film-card__genre">Comedy</span>
                </p>
                <img
                  src="./images/posters/santa-claus-conquers-the-martians.jpg"
                  alt=""
                  class="film-card__poster"
                />
                <p class="film-card__description">
                  The Martians Momar ("Mom Martian") and Kimar ("King Martian")
                  are worried that their children Girmar ("Girl Martian") and
                  Bomar ("Boy Marti…
                </p>
                <a class="film-card__comments">465 comments</a>
                <form class="film-card__controls">
                  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
                    Add to watchlist
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">
                    Mark as watched
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">
                    Mark as favorite
                  </button>
                </form>
              </article>

              <article class="film-card">
                <h3 class="film-card__title">Made for Each Other</h3>
                <p class="film-card__rating">5.8</p>
                <p class="film-card__info">
                  <span class="film-card__year">1939</span>
                  <span class="film-card__duration">1h 32m</span>
                  <span class="film-card__genre">Comedy</span>
                </p>
                <img
                  src="./images/posters/made-for-each-other.png"
                  alt=""
                  class="film-card__poster"
                />
                <p class="film-card__description">
                  John Mason (James Stewart) is a young, somewhat timid attorney
                  in New York City. He has been doing his job well, and he has a
                  chance of bei…
                </p>
                <a class="film-card__comments">56 comments</a>
                <form class="film-card__controls">
                  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
                    Add to watchlist
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">
                    Mark as watched
                  </button>
                  <button class="film-card__controls-item button film-card__controls-item--favorite">
                    Mark as favorite
                  </button>
                </form>
              </article>
            </div>
          </section>
        </section>
      </div>
    );
  }
}
