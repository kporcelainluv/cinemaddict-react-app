import React from "react";
export const Header = () => {
  return (
    <header className="header">
      <h1 className="header__logo logo">Cinemaddict</h1>

      <form className="header__search search">
        <input
          type="text"
          name="search"
          className="search__field"
          placeholder="Search movies"
        />
        <svg
          fill="#7171D8"
          className="search__film-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="19"
          viewBox="0 0 20 19"
        >
          <path
            fill-rule="nonzero"
            d="M2 0v4.524h2.833V0h11.334v4.524H19V0h1v19h-1v-4.524h-2.833V19H4.833v-4.524H2V19H0V0h2zm0 7.238v4.524h2.833V7.238H2zm14.167 0v4.524H19V7.238h-2.833z"
          />
        </svg>
        <button type="submit" className="visually-hidden">
          Search
        </button>
        <button className="search__reset" type="reset">
          Reset
        </button>
      </form>
      <section className="header__profile profile">
        <p className="profile__rating">Movie Buff</p>
        <img
          className="profile__avatar"
          src="images/bitmap@2x.png"
          alt="Avatar"
          width="35"
          height="35"
        />
      </section>
    </header>
  );
};
