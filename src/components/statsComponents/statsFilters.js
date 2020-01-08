import React from "react";

export class StatsFilters extends React.Component {
  state = {
    filterType: "all-time"
  };

  render() {
    return (
      <form
        action="https://echo.htmlacademy.ru/"
        method="get"
        className="statistic__filters"
      >
        <p className="statistic__filters-description">Show stats:</p>

        <input
          onChange={() =>
            this.setState(
              { filterType: "all-time" },
              this.props.onChangeFilter("all-time")
            )
          }
          type="radio"
          className="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-all-time"
          value="all-time"
          checked={this.state.filterType === "all-time"}
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
          onChange={() =>
            this.setState(
              { filterType: "today" },
              this.props.onChangeFilter("today")
            )
          }
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
          onChange={() =>
            this.setState(
              { filterType: "week" },
              this.props.onChangeFilter("week")
            )
          }
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
          onChange={() =>
            this.setState(
              { filterType: "month" },
              this.props.onChangeFilter("month")
            )
          }
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
          onChange={() =>
            this.setState(
              { filterType: "year" },
              this.props.onChangeFilter("year")
            )
          }
        />
        <label htmlFor="statistic-year" className="statistic__filters-label">
          Year
        </label>
      </form>
    );
  }
}
