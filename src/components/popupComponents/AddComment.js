import React from "react";

export const AddComment = () => {
  return (
    <div className="film-details__new-comment">
      <div htmlFor="add-emoji" className="film-details__add-emoji-label"></div>

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
        <label className="film-details__emoji-label" htmlFor="emoji-smile">
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
        <label className="film-details__emoji-label" htmlFor="emoji-sleeping">
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
        <label className="film-details__emoji-label" htmlFor="emoji-gpuke">
          <img
            src="./images/emoji/puke.png"
            width="30"
            height="30"
            alt="emoji"
          />
        </label>
      </div>
    </div>
  );
};
