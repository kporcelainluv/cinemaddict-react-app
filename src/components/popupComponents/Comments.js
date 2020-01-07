import React from "react";
import { CommentsList } from "./CommentsList";
import { AddComment } from "./AddComment";

export const Comments = ({ film, handleCommentDeleting }) => {
  return (
    <div className="form-details__bottom-container">
      <section className="film-details__comments-wrap">
        <h3 className="film-details__comments-title">
          Comments
          <span className="film-details__comments-count">{` ${film.comments.length}`}</span>
        </h3>

        <CommentsList
          film={film}
          handleCommentDeleting={handleCommentDeleting}
        />
        <AddComment />
      </section>
    </div>
  );
};
