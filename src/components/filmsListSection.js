import React from "react";

export const FilmsList = props => {
  if (props === "extra") {
    return <section className="films-list--extra"></section>;
  }
  return <section className="films-list"></section>;
};
