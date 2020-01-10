import React from "react";
import { StatsFilterType } from "../../consts";

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
              { filterType: StatsFilterType.ALL },
              this.props.onChangeFilter(StatsFilterType.ALL)
            )
          }
          type="radio"
          className="statistic__filters-input visually-hidden"
          name="statistic-filter"
          id="statistic-all-time"
          value="all-time"
          checked={this.state.filterType === StatsFilterType.ALL}
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
          checked={this.state.filterType === StatsFilterType.TODAY}
          onChange={() =>
            this.setState(
              { filterType: StatsFilterType.TODAY },
              this.props.onChangeFilter(StatsFilterType.TODAY)
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
          checked={this.state.filterType === StatsFilterType.WEEK}
          onChange={() =>
            this.setState(
              { filterType: StatsFilterType.WEEK },
              this.props.onChangeFilter(StatsFilterType.WEEK)
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
          checked={this.state.filterType === StatsFilterType.MONTH}
          onChange={() =>
            this.setState(
              { filterType: StatsFilterType.MONTH },
              this.props.onChangeFilter(StatsFilterType.MONTH)
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
          checked={this.state.filterType === StatsFilterType.YEAR}
          onChange={() =>
            this.setState(
              { filterType: StatsFilterType.YEAR },
              this.props.onChangeFilter(StatsFilterType.YEAR)
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
