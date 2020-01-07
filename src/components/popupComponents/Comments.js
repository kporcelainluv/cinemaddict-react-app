import React from "react";
import { UserComments } from "./UserComments";
import { AddComment } from "./AddComment";

export const Comments = ({ amount }) => {
  return (
    <div className="form-details__bottom-container">
      <section className="film-details__comments-wrap">
        <h3 className="film-details__comments-title">
          Comments
          <span className="film-details__comments-count">{` ${amount}`}</span>
        </h3>

        <UserComments />
        <AddComment />
      </section>
    </div>
  );
};
