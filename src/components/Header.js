import React from "react";
import { HeaderSearch } from "./header/HeaderSearch";
import { ProfileStatus } from "./header/ProfileStatus";
import { countWatchedFilms, getStatsRank } from "../utils";

export const Header = ({ films, getSearchQuery, handleCancelSearchButton }) => {
  const watchedFilmsAmount = countWatchedFilms(films);
  const status = getStatsRank(watchedFilmsAmount);
  return (
    <header className="header">
      <h1 className="header__logo logo">Cinemaddict</h1>

      <HeaderSearch
        getSearchQuery={getSearchQuery}
        handleCancelSearchButton={handleCancelSearchButton}
      />
      <ProfileStatus status={status} />
    </header>
  );
};
