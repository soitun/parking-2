import React from "react";

const Landing = () => {
  return (
    <div id="jumbotron" style={{ textAlign: "center" }}>
      <div className="overlay" />

      <h2>Pocket Park</h2>

      <h3>Parking on Demand</h3>

      <a
        href="/auth/google"
        className="waves-effect waves-light btn-large landing-btn-color"
      >
        Sign Up
      </a>
    </div>
  );
};

export default Landing;
