import React from "react";

export const ShowMoreButton = ({ onClickShowMore }) => {
  return (
    <button
      className="films-list__show-more"
      onClick={() => {
        onClickShowMore();
      }}
    >
      Show more
    </button>
  );
};
