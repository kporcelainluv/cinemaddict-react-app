import React from "react";

export const StatsRank = ({ rank }) => {
  return (
    <p className="statistic__rank">
      Your rank
      <img
        className="statistic__img"
        src="images/bitmap@2x.png"
        alt="Avatar"
        width="35"
        height="35"
      />
      <span className="statistic__rank-label">{rank}</span>
    </p>
  );
};
