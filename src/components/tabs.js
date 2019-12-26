import React from "react";

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.onTabChange = props.onTabChange;
    this.watchlistLength = props.watchlist;
    this.watchedLength = props.watched;
    this.favoritesLength = props.favorites;
  }
  state = { type: `all` };

  onTabClick(type) {
    this.setState({ type });
    this.onTabChange(type);
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
          className={this.getTabActive(`all`)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(`all`);
          }}
        >
          All movies
        </a>
        <a
          href="#watchlist"
          className={this.getTabActive(`watchlist`)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(`watchlist`);
          }}
        >
          Watchlist{" "}
          <span className="main-navigation__item-count">
            {this.watchlistLength}
          </span>
        </a>
        <a
          href="#history"
          className={this.getTabActive(`history`)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(`history`);
          }}
        >
          History{" "}
          <span className="main-navigation__item-count">
            {this.watchedLength}
          </span>
        </a>
        <a
          href="#favorites"
          className={this.getTabActive(`favorites`)}
          onClick={event => {
            event.preventDefault();
            this.onTabClick(`favorites`);
          }}
        >
          Favorites
          <span className="main-navigation__item-count">
            {this.favoritesLength}
          </span>
        </a>
        <a
          href="#stats"
          className={this.getTabActive(`stats`)}
          onClick={event => {
            console.log("clicked on stats");
            event.preventDefault();
            this.onTabClick(`stats`);
          }}
        >
          Stats
        </a>
      </nav>
    );
  }
}
