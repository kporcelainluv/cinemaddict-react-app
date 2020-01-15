import React from "react";
import { UserComment } from "./UserComment";

export const CommentsList = ({ film, handleDeleteComment }) => {
  const comments = film.comments;

  return (
    <ul className="film-details__comments-list">
      {comments.map(comment => {
        return (
          <UserComment
            film={film}
            emoji={comment.emotion}
            text={comment.comment}
            author={comment.author}
            date={comment.date}
            key={comment.id}
            id={comment.id}
            handleDeleteComment={handleDeleteComment}
          />
        );
      })}
    </ul>
  );
};
