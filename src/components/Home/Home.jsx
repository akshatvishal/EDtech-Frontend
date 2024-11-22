import React from "react";
import "./Home.css"; // Assuming you have a CSS file for styling
import plane from "./PlaneLoop.gif"

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="team-name">Welcome to Version Control Squad</h1>
        <p className="tagline">
          A passionate team working together to build incredible projects!
        </p>
      </header>

      <main className="hola">
        <section className="team-intro">
          <h2>Meet Our Team</h2>
          <p>
            We are a team of enthusiastic developers and problem solvers, striving to
            create impactful solutions. Each of us brings unique strengths and
            perspectives to the table, making us stronger together.
          </p>
        </section>

        <section className="team-members">
          <h3>Our Team Members</h3>
          <ul>
            <li>Pranay Srivastava</li>
            <li>Akshat Vishal</li>
            <li>Ankit Kumar</li>
            <li>Rachit Daksh</li>
          </ul>
        </section>
      </main>
      <img src={plane} alt="" className="hand"/>
    </div>
  );
}

export default Home;
