import React from "react";
export const TabButton = ({
  name,
  classname,
  handleTabSwitching,
  heading,
  activeTab,
  amount = 0
}) => {
  const getTabClassname = (type, activeTab) => {
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

  const addAmountOfFilms = (type, amount) => {
    if (type !== "#all" && type !== "#stats") {
      return <span className="main-navigation__item-count">{amount}</span>;
    }
  };

  return (
    <a
      href={name}
      className={getTabClassname(classname, activeTab)}
      onClick={event => {
        event.preventDefault();
        handleTabSwitching(classname);
      }}
    >
      {heading}
      {addAmountOfFilms(name, amount)}
    </a>
  );
};
