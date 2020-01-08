import React from "react";

export const Footer = ({ amount }) => {
  return (
    <footer className="footer">
      <section className="footer__logo logo logo--smaller">Cinemaddict</section>
      <section className="footer__statistics">
        <p>{amount} movies inside</p>
      </section>
    </footer>
  );
};
