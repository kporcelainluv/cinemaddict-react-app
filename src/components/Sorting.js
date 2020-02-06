import React from "react";
import { SortType } from "../consts";
import { SortingButton } from "./SortingButton";

export const Sorting = ({ onSortTypeChange, currentState }) => {
  return (
    <ul className="sort">
      <SortingButton
        name={SortType.DEFAULT}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by default"}
        state={currentState}
      />

      <SortingButton
        name={SortType.DATE}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by date"}
        state={currentState}
      />
      <SortingButton
        name={SortType.RATING}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by rating"}
        state={currentState}
      />
    </ul>
  );
};
