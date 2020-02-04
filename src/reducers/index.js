import { combineReducers } from "redux";

import { getAmountOfFilmsIn } from "../utils.js";
export const tabsReducer = (films, tabType) => {
  return [
    { type: "TYPE_SELECTED_ALL", films: null },
    { type: "TYPE_SELECTED_WATCHLIST", films },
    { type: "TYPE_SELECTED_WATCHED", films },
    { type: "TYPE_SELECTED_FAVORITE", films },
    { type: "TYPE_SELECTED_STATS", films }
  ];
};

const selectedTabsReducer = (selectedTab = "ALL", action) => {
  if (action.type === "TYPE_SELECTED_ALL") {
    return null;
  } else if (action.type === "TYPE_SELECTED_WATCHLIST") {
    return getAmountOfFilmsIn(`watchlist`, action.films);
  } else if (action.type === "TYPE_SELECTED_WATCHED") {
    return getAmountOfFilmsIn(`watched`, action.films);
  } else if (action.type === "TYPE_SELECTED_FAVORITE") {
    return getAmountOfFilmsIn(`favorite`, action.films);
  } else if (action.type === "TYPE_SELECTED_STATS") {
    return action.films;
  }
  return null;
};

export default combineReducers({
  tabsReducer,
  selectedTabsReducer
});
