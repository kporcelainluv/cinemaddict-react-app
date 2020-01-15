import React from "react";
import { AUTHORIZATION, END_POINT } from "./consts";
import { toggleFilmWatchlist } from "./utils";

export const getComment = (filmId, newComment) => {
  return fetch(`${END_POINT}comments/${filmId}`, {
    method: "POST",
    headers: new Headers({
      Authorization: AUTHORIZATION,
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(newComment)
  });
};

export const deleteComment = commentId => {
  return fetch(`${END_POINT}comments/${commentId}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: AUTHORIZATION,
      "Content-Type": "application/json"
    })
  });
};

export const getFilms = () => {
  return fetch(`${END_POINT}movies`, {
    method: "GET",
    headers: new Headers({
      Authorization: AUTHORIZATION,
      "Content-Type": "application/json"
    }),
    body: null
  });
};
export const getComments = filmId => {
  return fetch(`${END_POINT}comments/${filmId}`, {
    method: "GET",
    headers: new Headers({
      Authorization: AUTHORIZATION,
      "Content-Type": "application/json"
    }),
    body: null
  });
};

export const updateFilms = (filmId, film, type) => {
  return fetch(`${END_POINT}movies/${filmId}`, {
    method: "PUT",
    headers: new Headers({
      Authorization: AUTHORIZATION,
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(toggleFilmWatchlist(film, type))
  });
};
