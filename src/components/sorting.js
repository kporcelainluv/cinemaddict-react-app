import React from "react";

export const Sorting = ({ onSortingTypeChange }) => {
  const onSortButtonClick = type => {
    onSortingTypeChange(type);
  };

  return (
    <ul className="sort">
      <li>
        <a
          href="#"
          className="sort__button sort__button--active"
          onClick={() => {
            onSortButtonClick("default");
          }}
        >
          Sort by default
        </a>
      </li>
      <li>
        <a
          href="#"
          className="sort__button"
          onClick={() => {
            onSortButtonClick("date");
          }}
        >
          Sort by date
        </a>
      </li>
      <li>
        <a
          href="#"
          className="sort__button"
          onClick={() => {
            onSortButtonClick("rating");
          }}
        >
          Sort by rating
        </a>
      </li>
    </ul>
  );
};
