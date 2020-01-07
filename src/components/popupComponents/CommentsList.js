import React from "react";
import { UserComment } from "./UserComment";

export const CommentsList = ({ comments }) => {
  return (
    <ul className="film-details__comments-list">
      {comments.map(comment => {
        return (
          <UserComment
            emoji={comment.emotion}
            text={comment.comment}
            author={comment.author}
            date={comment.date}
            key={comment.id}
          />
        );
      })}
    </ul>
  );
};
