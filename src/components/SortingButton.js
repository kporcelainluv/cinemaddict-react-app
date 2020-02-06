import React from "react";

export const SortingButton = ({
  type,
  onSortTypeChange,
  heading,
  currentType
}) => {
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
        className={getActiveButton(currentType, type)}
        onClick={event => {
          event.preventDefault();
          onSortTypeChange(type);
        }}
      >
        {heading}
      </a>
    </li>
  );
};
