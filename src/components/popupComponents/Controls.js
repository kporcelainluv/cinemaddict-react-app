import React from "react";

export const Controls = ({
  film,
  name,
  updateState,
  handleClick,
  checked,
  text
}) => {
  return (
    <div>
      <input
        type="checkbox"
        className="film-details__control-input visually-hidden"
        id={name}
        name={name}
        checked={checked}
        onChange={() => {
          handleClick(film.id);
          updateState(name);
        }}
      />
      <label
        htmlFor={name}
        className={`film-details__control-label film-details__control-label--${name}`}
      >
        {text}
      </label>
    </div>
  );
};
