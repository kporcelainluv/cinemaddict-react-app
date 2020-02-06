import React from "react";
import { NavTab } from "../consts";
import { TabButton } from "./TabButton";

export const Tabs = ({
  handleTabSwitching,
  activeTab,
  watchlist,
  watched,
  favorites
}) => {
  return (
    <nav className="main-navigation">
      <TabButton
        heading={"All movies"}
        name={"#all"}
        activeTab={activeTab}
        classname={NavTab.ALL}
        handleTabSwitching={handleTabSwitching}
      />

      <TabButton
        heading={"Watchlist"}
        name={"#watchlist"}
        activeTab={activeTab}
        classname={NavTab.WATCHLIST}
        handleTabSwitching={handleTabSwitching}
        amount={watchlist}
      />

      <TabButton
        heading={"History"}
        name={"#history"}
        activeTab={activeTab}
        classname={NavTab.HISTORY}
        handleTabSwitching={handleTabSwitching}
        amount={watched}
      />

      <TabButton
        heading={"Favorites"}
        name={"#favorites"}
        activeTab={activeTab}
        classname={NavTab.FAVORITES}
        handleTabSwitching={handleTabSwitching}
        amount={favorites}
      />

      <TabButton
        heading={"Stats"}
        name={"#stats"}
        activeTab={activeTab}
        classname={NavTab.STATS}
        handleTabSwitching={handleTabSwitching}
      />
    </nav>
  );
};
