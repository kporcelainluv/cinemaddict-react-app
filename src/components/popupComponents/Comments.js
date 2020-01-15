import React from "react";
import { CommentsList } from "./CommentsList";
import { CommentInput } from "./CommentInput";

export const Comments = ({
  film,
  handleDeleteComment,
  getCurrentComment,
  getCurrentEmoji,
  emoji,
  comment
}) => {
  return (
    <div className="form-details__bottom-container">
      <section className="film-details__comments-wrap">
        <h3 className="film-details__comments-title">
          Comments
          <span className="film-details__comments-count">{` ${film.comments.length}`}</span>
        </h3>

        <CommentsList film={film} handleDeleteComment={handleDeleteComment} />
        <CommentInput
          comment={comment}
          emoji={emoji}
          getCurrentComment={getCurrentComment}
          getCurrentEmoji={getCurrentEmoji}
        />
      </section>
    </div>
  );
};
