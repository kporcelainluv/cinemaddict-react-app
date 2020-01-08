import React from "react";
import { StatsSummary } from "./statsComponents/statsSummary";
import { StatsRank } from "./statsComponents/statsRank";
import { StatsFilters } from "./statsComponents/statsFilters";
import {
  getTopGenre,
  getWatchedFilms,
  getHoursAndMins,
  getStatsRank,
  getFilmsByFilter
} from "../utils";

export class Stats extends React.Component {
  state = { filterType: "all-time" };

  onChangeFilter = filterType => {
    this.setState({ filterType });
  };
  render() {
    const films = this.props.films;
    const filteredFilms = getFilmsByFilter(films, this.state.filterType);
    const topGenre = getTopGenre(filteredFilms);
    const watchedFilms = getWatchedFilms(filteredFilms);
    const [hours, minutes] = getHoursAndMins(filteredFilms);
    const statsRank = getStatsRank(filteredFilms.length);

    return (
      <section className="statistic">
        <StatsRank rank={statsRank} />
        <StatsFilters onChangeFilter={this.onChangeFilter} />
        {
          <StatsSummary
            watched={watchedFilms}
            hours={hours}
            minutes={minutes}
            topGenre={topGenre}
          />
        }
        {/*// TODO: add stats chart*/}
      </section>
    );
  }
}
