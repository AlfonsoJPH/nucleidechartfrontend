import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import example_img_1 from '../img/example1.png'
import example_img_2 from '../img/example2.png'
import example_img_3 from '../img/example3.png'
import example_img_4 from '../img/example4.png'
import example_img_5 from '../img/example5.png'

// import example_svg from '../assets/sample.json'
// import example_csv from '../assets/sample.csv'

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
            <img src={example_img_1} alt="Example 1" />
            <div className="download-buttons">
              <a href="assets/example1.svg" download>Download SVG Example</a>
              <a href="assets/example1.json" download>Download JSON Example</a>
            </div>
          </div>
          <div className="example-item">
            <img src={example_img_2} alt="Example 2" />
            <div className="download-buttons">
              <a href="assets/example2.svg" download>Download SVG Example</a>
              <a href="assets/example2.json" download>Download JSON Example</a>
            </div>
          </div>
          <div className="example-item">
            <img src={example_img_3} alt="Example 3" />
            <div className="download-buttons">
              <a href="assets/example3.svg" download>Download SVG Example</a>
              <a href="assets/example3.json" download>Download JSON Example</a>
            </div>
          </div>
          <div className="example-item">
            <img src={example_img_4} alt="Example 4" />
            <div className="download-buttons">
              <a href="assets/example4.svg" download>Download SVG Example</a>
              <a href="assets/example4.json" download>Download JSON Example</a>
            </div>
          </div>
          <div className="example-item">
            <img src={example_img_5} alt="Example 5" />
            <div className="download-buttons">
              <a href="assets/example5.svg" download>Download SVG Example</a>
              <a href="assets/example5.json" download>Download JSON Example</a>
            </div>
          </div>
          {/* Add more example items as needed */}
        </div>
      </section>

      <section id="download-examples" className="section">
        <h2>Download Data Examples</h2>
        <div className="download-buttons">
          <a href="assets/sample.csv" download>Download CSV Example</a>
          <a href="assets/sample.json" download>Download JSON Example</a>
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
