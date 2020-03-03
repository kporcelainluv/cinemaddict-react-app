import React from "react";
import { SortType } from "../consts";

export class Sorting extends React.Component {
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

  render() {
    return (
      <ul className="sort">
        <li>
          <a
            href="#"
            className={this.getActiveButton(SortType.DEFAULT)}
            onClick={event => {
              event.preventDefault();
              this.onSortButtonClick(SortType.DEFAULT);
            }}
          >
            Sort by default
          </a>
        </li>
        <li>
          <a
            href="#"
            className={this.getActiveButton(SortType.DATE)}
            onClick={event => {
              event.preventDefault();
              this.onSortButtonClick(SortType.DATE);
            }}
          >
            Sort by date
          </a>
        </li>
        <li>
          <a
            href="#"
            className={this.getActiveButton(SortType.RATING)}
            onClick={event => {
              event.preventDefault();
              this.onSortButtonClick(SortType.RATING);
            }}
          >
            Sort by rating
          </a>
        </li>
      </ul>
    );
  }
}
