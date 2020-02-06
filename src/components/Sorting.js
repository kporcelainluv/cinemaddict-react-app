import React from "react";
import { SortType } from "../consts";
import { SortingButton } from "./SortingButton";

// TODO: Rename currentState
// TODO: add sorting button component here (sorting or sort?)
// TODO: rename component
export const Sorting = ({ onSortTypeChange, currentState }) => {
  return (
    <ul className="sort">
      {/* TODO: Add array of objects*/}
      <SortingButton
        type={SortType.DEFAULT}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by default"}
        currentType={currentState}
      />
      <SortingButton
        type={SortType.DATE}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by date"}
        currentType={currentState}
      />
      <SortingButton
        type={SortType.RATING}
        onSortTypeChange={onSortTypeChange}
        heading={"Sort by rating"}
        currentType={currentState}
      />
    </ul>
  );
};
