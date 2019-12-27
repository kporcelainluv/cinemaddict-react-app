import React from "react";

export class StatsFilters extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeFilter = props.onChangeFilter;
  }
  state = {
    filterType: "all-time"
  };
  onFilterClick = filterType => {
    console.log(filterType);
    this.setState({ filterType });
    this.onChangeFilter(filterType);
  };
  // TODO: add active (checked) to filter tabs
  getFilterChecked = type => {};
  render() {
    return (
      <form
        action="https://echo.htmlacademy.ru/"
        method="get"
        className="statistic__filters"
      >
        <p className="statistic__filters-description">Show stats:</p>

        <input
          type="radio"
          className="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-all-time"
          value="all-time"
          checked={this.state.filterType === "all-time"}
          onClick={event => {
            event.preventDefault();
            this.onFilterClick(`all-time`);
          }}
        />
        <label
          htmlFor="statistic-all-time"
          className="statistic__filters-label"
        >
          All time
        </label>

        <input
          type="radio"
          className="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-today"
          value="today"
          checked={this.state.filterType === "today"}
          onClick={event => {
            event.preventDefault();
            this.onFilterClick(`today`);
          }}
        />
        <label htmlFor="statistic-today" className="statistic__filters-label">
          Today
        </label>

        <input
          type="radio"
          className="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-week"
          value="week"
          checked={this.state.filterType === "week"}
          onClick={event => {
            event.preventDefault();
            this.onFilterClick(`week`);
          }}
        />
        <label htmlFor="statistic-week" className="statistic__filters-label">
          Week
        </label>

        <input
          type="radio"
          className="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-month"
          value="month"
          checked={this.state.filterType === "month"}
          onClick={event => {
            event.preventDefault();
            this.onFilterClick(`month`);
          }}
        />
        <label htmlFor="statistic-month" className="statistic__filters-label">
          Month
        </label>

        <input
          type="radio"
          className="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-year"
          value="year"
          checked={this.state.filterType === "year"}
          onClick={event => {
            event.preventDefault();
            this.onFilterClick(`year`);
          }}
        />
        <label htmlFor="statistic-year" className="statistic__filters-label">
          Year
        </label>
      </form>
    );
  }
}
