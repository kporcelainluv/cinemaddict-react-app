import React from "react";

export const ProfileStatus = ({ status }) => {
  return (
    <section className="header__profile profile">
      <p className="profile__rating">{status}</p>
      <img
        className="profile__avatar"
        src="images/bitmap@2x.png"
        alt="Avatar"
        width="35"
        height="35"
      />
    </section>
  );
};
