import React from "react";
import { SortType } from "../consts";
import { SortingButton } from "./SortingButton";

export class Sorting extends React.Component {
  // TODO: should not store state here, move it higher
  state = { type: "default" };

  onSortButtonClick = type => {
    this.props.onSortTypeChange(type);
    this.setState({ type });
  };

  getActiveButton(type) {
    if (this.state.type === type) {
      return `sort__button sort__button--active`;
    } else {
      return `sort__button`;
    }
  }
  // TODO: should be function outside component

  render() {
    return (
      <ul className="sort">
        <SortingButton
          name={SortType.DEFAULT}
          onSortButtonClick={this.onSortButtonClick}
          heading={"Sort by default"}
          state={this.state.type}
        />

        <SortingButton
          name={SortType.DATE}
          onSortButtonClick={this.onSortButtonClick}
          heading={"Sort by date"}
          state={this.state.type}
        />
        <SortingButton
          name={SortType.RATING}
          onSortButtonClick={this.onSortButtonClick}
          heading={"Sort by rating"}
          state={this.state.type}
        />
      </ul>
    );
  }
}
