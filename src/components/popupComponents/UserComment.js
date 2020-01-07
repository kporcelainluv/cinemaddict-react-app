import React from "react";

export const UserComment = ({ emoji, text, author, date }) => {
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
          <span className="film-details__comment-day">{date}</span>
          <button className="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  );
};
