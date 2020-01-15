import React from "react";
import { RATING_LENGTH } from "../../consts";
import { PersonalRatingInput } from "./PersonalRatingInput";

export const PersonalRating = ({
  film,
  poster,
  title,
  personalRating,
  handlePersonalRating,
  filmId,
  handlePersonalRatingOpening
}) => {
  return (
    <section className="film-details__user-rating-wrap">
      <div className="film-details__user-rating-controls">
        <button
          className="film-details__watched-reset"
          type="button"
          onClick={() => {
            handlePersonalRating(filmId, null);
            handlePersonalRatingOpening(filmId);
          }}
        >
          Undo
        </button>
      </div>

      <div className="film-details__user-score">
        <div className="film-details__user-rating-poster">
          <img
            src={poster}
            alt="film-poster"
            className="film-details__user-rating-img"
          />
        </div>

        <section className="film-details__user-rating-inner">
          <h3 className="film-details__user-rating-title">{title}</h3>

          <p className="film-details__user-rating-feelings">How you feel it?</p>
          <div className="film-details__user-rating-score">
            {new Array(RATING_LENGTH).fill(0).map((_, id) => {
              const v = id + 1;
              return (
                <PersonalRatingInput
                  film={film}
                  personalRating={personalRating}
                  filmId={filmId}
                  handlePersonalRating={handlePersonalRating}
                  v={v}
                  key={v}
                />
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};
