import React from "react";

export const Comments = () => {
  return (
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
            <span className="film-details__comment-author">Tim Macoveev</span>
            <span className="film-details__comment-day">3 days ago</span>
            <button className="film-details__comment-delete">Delete</button>
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
            <span className="film-details__comment-author">John Doe</span>
            <span className="film-details__comment-day">2 days ago</span>
            <button className="film-details__comment-delete">Delete</button>
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
          <p className="film-details__comment-text">Very very old. Meh</p>
          <p className="film-details__comment-info">
            <span className="film-details__comment-author">John Doe</span>
            <span className="film-details__comment-day">2 days ago</span>
            <button className="film-details__comment-delete">Delete</button>
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
            <span className="film-details__comment-author">John Doe</span>
            <span className="film-details__comment-day">Today</span>
            <button className="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    </ul>
  );
};
