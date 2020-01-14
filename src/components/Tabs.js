import React from "react";
import { NavTab } from "../consts";

export const Tabs = ({
  handleTabSwitching,
  activeTab,
  watchlist,
  watched,
  favorites
}) => {
  const getTabActive = type => {
    if (activeTab === type) {
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
  };

  return (
    <nav className="main-navigation">
      <a
        href="#all"
        className={getTabActive(NavTab.ALL)}
        onClick={event => {
          event.preventDefault();
          handleTabSwitching(NavTab.ALL);
        }}
      >
        All movies
      </a>
      <a
        href="#watchlist"
        className={getTabActive(NavTab.WATCHLIST)}
        onClick={event => {
          event.preventDefault();
          handleTabSwitching(NavTab.WATCHLIST);
        }}
      >
        Watchlist
        <span className="main-navigation__item-count">{watchlist}</span>
      </a>
      <a
        href="#history"
        className={getTabActive(NavTab.HISTORY)}
        onClick={event => {
          event.preventDefault();
          handleTabSwitching(NavTab.HISTORY);
        }}
      >
        History
        <span className="main-navigation__item-count">{watched}</span>
      </a>
      <a
        href="#favorites"
        className={getTabActive(NavTab.FAVORITES)}
        onClick={event => {
          event.preventDefault();
          handleTabSwitching(NavTab.FAVORITES);
        }}
      >
        Favorites
        <span className="main-navigation__item-count">{favorites}</span>
      </a>
      <a
        href="#stats"
        className={getTabActive(NavTab.STATS)}
        onClick={event => {
          event.preventDefault();
          handleTabSwitching(NavTab.STATS);
        }}
      >
        Stats
      </a>
    </nav>
  );
};
