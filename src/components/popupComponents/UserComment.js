import React from "react";
import { getDistanceInWords } from "../../utils";

export const UserComment = ({
  film,
  emoji,
  text,
  author,
  date,
  handleDeleteComment,
  id
}) => {
  return (
    <li className="film-details__comment">
      <span className="film-details__comment-emoji">
        <img
          src={`./images/emoji/${emoji}.png`}
          width="55"
          height="55"
          alt="emoji"
        />
      </span>
      <div>
        <p className="film-details__comment-text">{text}</p>
        <p className="film-details__comment-info">
          <span className="film-details__comment-author">{author}</span>
          <span className="film-details__comment-day">
            {getDistanceInWords(new Date(date), Date.now())}
          </span>
          <button
            className="film-details__comment-delete"
            type={"button"}
            onClick={() => {
              handleDeleteComment(film.id, id);
            }}
          >
            Delete
          </button>
        </p>
      </div>
    </li>
  );
};
