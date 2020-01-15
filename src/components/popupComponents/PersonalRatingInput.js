import React from "react";

export const PersonalRatingInput = ({
  film,
  v,
  personalRating,
  handlePersonalRating,
  filmId
}) => {
  return (
    <div style={{ display: `flex`, marginLeft: `5px`, marginRight: `5px` }}>
      <input
        type="radio"
        name="score"
        className="film-details__user-rating-input visually-hidden"
        checked={v === personalRating}
        value={v}
        id={`rating-${v}`}
        onChange={() => {
          handlePersonalRating(filmId, film, v);
        }}
      />
      <label
        className="film-details__user-rating-label"
        htmlFor={`rating-${v}`}
      >
        {v}
      </label>
    </div>
  );
};
