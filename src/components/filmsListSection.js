import React from "react";

export const FilmsList = props => {
  return (
    <section className="films-list">
      <h2 className="films-list__title visually-hidden">
        All movies. Upcoming
      </h2>
      {props.children}
    </section>
  );
};
