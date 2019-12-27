import React from "react";

export const StatsSummary = ({ watched, hours, minutes, topGenre }) => {
  return (
    <ul className="statistic__text-list">
      <li className="statistic__text-item">
        <h4 className="statistic__item-title">You watched</h4>
        <p className="statistic__item-text">
          {watched}
          <span className="statistic__item-description">movies</span>
        </p>
      </li>
      <li className="statistic__text-item">
        <h4 className="statistic__item-title">Total duration</h4>
        <p className="statistic__item-text">
          {hours}
          <span className="statistic__item-description">h</span> {minutes}
          <span className="statistic__item-description">m</span>
        </p>
      </li>
      <li className="statistic__text-item">
        <h4 className="statistic__item-title">Top genre</h4>
        <p className="statistic__item-text">{topGenre}</p>
      </li>
    </ul>
  );
};
