import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home () {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Nucleidechart</h1>
        <img src="nucleidechart.svg" alt="Nucleidechart Background" className="header-bg" />
      </header>

      <nav className="sticky-navbar">
        <ul>
          <li><a href="#examples">See some Examples</a></li>
          <li><a href="#download-examples">Download Data Examples</a></li>
          <li><a href="#generate">Generate Your Own</a></li>
          <li><a href="#about">About Me</a></li>
        </ul>
      </nav>

      <section id="examples" className="section">
        <h2>See some Examples</h2>
        <div className="examples-grid">
          <div className="example-item">
            <img src="/path/to/example1.svg" alt="Example 1" />
            <a href="/path/to/example1.svg" download>Download SVG</a>
            <a href="/path/to/example1.json" download>Download JSON</a>
          </div>
          <div className="example-item">
            <img src="/path/to/example2.svg" alt="Example 2" />
            <a href="/path/to/example2.svg" download>Download SVG</a>
            <a href="/path/to/example2.json" download>Download JSON</a>
          </div>
          {/* Add more example items as needed */}
        </div>
      </section>

      <section id="download-examples" className="section">
        <h2>Download Data Examples</h2>
        <div className="download-buttons">
          <a href="/path/to/sample.csv" download>Download CSV Example</a>
          <a href="/path/to/sample.json" download>Download JSON Example</a>
        </div>
      </section>

      <section id="generate" className="section">
        <h2>Generate Your Own</h2>
        <Link to="/generate" className="generate-link">Go to Generator</Link>
      </section>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          {/* Add a brief bio about yourself */}
        </p>
      </section>
    </div>
  );
};

export default Home;
