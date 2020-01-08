import React from "react";

export class Sorting extends React.Component {
  state = { type: "default" };

  onSortButtonClick = type => {
    this.props.onSortingTypeChange(type);
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
            className={this.getActiveButton("default")}
            onClick={event => {
              event.preventDefault();
              this.onSortButtonClick("default");
            }}
          >
            Sort by default
          </a>
        </li>
        <li>
          <a
            href="#"
            className={this.getActiveButton("date")}
            onClick={event => {
              event.preventDefault();
              this.onSortButtonClick("date");
            }}
          >
            Sort by date
          </a>
        </li>
        <li>
          <a
            href="#"
            className={this.getActiveButton("rating")}
            onClick={event => {
              event.preventDefault();
              this.onSortButtonClick("rating");
            }}
          >
            Sort by rating
          </a>
        </li>
      </ul>
    );
  }
}
