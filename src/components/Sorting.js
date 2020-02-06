import React from "react";
import { SortType } from "../consts";
import classNames from "classnames";

const heading = {
  [SortType.RATING]: "Sort by rating",
  [SortType.DEFAULT]: "Sort by default",
  [SortType.DATE]: "Sort by date"
};

const SortingButton = ({ sortType, onSortTypeChange, activeSortType }) => {
  return (
    <li>
      <a
        href="#"
        className={classNames(
          "sort__button",
          sortType === activeSortType && "sort__button--active"
        )}
        onClick={event => {
          event.preventDefault();
          onSortTypeChange(sortType);
        }}
      >
        {heading[sortType]}
      </a>
    </li>
  );
};

export const Sorting = ({ onSortTypeChange, activeSortType }) => {
  return (
    <ul className="sort">
      {[SortType.DEFAULT, SortType.RATING, SortType.DATE].map(sortType => {
        return (
          <SortingButton
            key={sortType}
            onSortTypeChange={onSortTypeChange}
            activeSortType={activeSortType}
            sortType={sortType}
          />
        );
      })}
    </ul>
  );
};
