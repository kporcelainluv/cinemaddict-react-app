import React from "react";

export const PersonalRatingInput = ({ v, personalRating }) => {
  return (
    <div style={{ display: `flex`, marginLeft: `5px`, marginRight: `5px` }}>
      <input
        type="radio"
        name="score"
        className="film-details__user-rating-input visually-hidden"
        checked={v === personalRating}
        value={v}
        id={`rating-${v}`}
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
