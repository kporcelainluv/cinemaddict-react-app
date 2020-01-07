import React from "react";

export const FilmDetails = ({ heading, text }) => {
  return (
    <tr className="film-details__row">
      <td className="film-details__term">{heading}</td>
      <td className="film-details__cell">{text}</td>
    </tr>
  );
};
