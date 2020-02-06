import React from "react";

export const SortingButton = ({ name, onSortButtonClick, heading, state }) => {
  const getActiveButton = (state, type) => {
    if (state === type) {
      return `sort__button sort__button--active`;
    } else {
      return `sort__button`;
    }
  };

  return (
    <li>
      <a
        href="#"
        className={getActiveButton(state, name)}
        onClick={event => {
          event.preventDefault();
          onSortButtonClick(name);
        }}
      >
        {heading}
      </a>
    </li>
  );
};
