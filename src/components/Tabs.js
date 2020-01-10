import React from "react";
import { NavTab } from "../consts";

export class Tabs extends React.Component {
  state = { type: `all` };

  onTabClick(type) {
    this.setState({ type });
    this.props.onTabChange(type);
  }

  getTabActive(type) {
    if (this.state.type === type) {
      if (type === `stats`) {
        return `main-navigation__item main-navigation__item--additional main-navigation__item--active`;
      }
      return `main-navigation__item main-navigation__item--active`;
    } else {
      if (type === `stats`) {
        return `main-navigation__item main-navigation__item--additional`;
      }
      return `main-navigation__item`;
    }
  }
  render() {
    return (
      <nav className="main-navigation">
        <a
          href="#all"
          className={this.getTabActive(NavTab.ALL)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(NavTab.ALL);
          }}
        >
          All movies
        </a>
        <a
          href="#watchlist"
          className={this.getTabActive(NavTab.WATCHLIST)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(NavTab.WATCHLIST);
          }}
        >
          Watchlist
          <span className="main-navigation__item-count">
            {this.props.watchlist}
          </span>
        </a>
        <a
          href="#history"
          className={this.getTabActive(NavTab.HISTORY)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(NavTab.HISTORY);
          }}
        >
          History
          <span className="main-navigation__item-count">
            {this.props.watched}
          </span>
        </a>
        <a
          href="#favorites"
          className={this.getTabActive(NavTab.FAVORITES)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(NavTab.FAVORITES);
          }}
        >
          Favorites
          <span className="main-navigation__item-count">
            {this.props.favorites}
          </span>
        </a>
        <a
          href="#stats"
          className={this.getTabActive(NavTab.STATS)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(NavTab.STATS);
          }}
        >
          Stats
        </a>
      </nav>
    );
  }
}
