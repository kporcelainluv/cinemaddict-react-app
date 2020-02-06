import React from "react";
import { SortType } from "../consts";
import { SortingButton } from "./SortingButton";

// TODO: add sorting button component here (sorting or sort?)
// TODO: rename component
export const Sort = ({ onSortTypeChange, activeSort }) => {
  return (
    <ul className="sort">
      {/* TODO: Add array of objects*/}
      <SortingButton
        sortType={SortType.DEFAULT}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by default"}
        activeSort={activeSort}
      />
      <SortingButton
        sortType={SortType.DATE}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by date"}
        activeSort={activeSort}
      />
      <SortingButton
        sortType={SortType.RATING}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by rating"}
        activeSort={activeSort}
      />
    </ul>
  );
};
