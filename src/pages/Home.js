import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// import example_svg from '../assets/sample.json'
// import example_csv from '../assets/sample.csv'

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
          <img src="assets/ugr.png" alt="ugr logo" id="ugr" />
              <h1>Nucleidechart</h1>
          <img src="assets/granasat.png" alt="granasat logo" id="granasat" />
      </header>

      <nav className="sticky-navbar">
        <ul>
          <li>
            <a href="#examples">See some Examples</a>
          </li>
          <li>
            <a href="#download-examples">Download Data Examples</a>
          </li>
          <li>
            <a href="#generate">Generate Your Own</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </nav>

      <section id="examples" className="section">
        <h2>See some Examples</h2>
        <div className="examples-grid">
          <div className="example-item">
            <img src="assets/example1.png" alt="Example 1" />
            <div className="download-buttons">
              <a href="assets/example1.svg" download>
                Download SVG Example
              </a>
              <a href="assets/example1.json" download>
                Download JSON Example
              </a>
            </div>
          </div>
          <div className="example-item">
            <img src="assets/example2.png" alt="Example 2" />
            <div className="download-buttons">
              <a href="assets/example2.svg" download>
                Download SVG Example
              </a>
              <a href="assets/example2.json" download>
                Download JSON Example
              </a>
            </div>
          </div>
          <div className="example-item">
            <img src="assets/example3.png" alt="Example 3" />
            <div className="download-buttons">
              <a href="assets/example3.svg" download>
                Download SVG Example
              </a>
              <a href="assets/example3.json" download>
                Download JSON Example
              </a>
            </div>
          </div>
          <div className="example-item">
            <img src="assets/example4.png" alt="Example 4" />
            <div className="download-buttons">
              <a href="assets/example4.svg" download>
                Download SVG Example
              </a>
              <a href="assets/example4.json" download>
                Download JSON Example
              </a>
            </div>
          </div>
          <div className="example-item">
            <img src="assets/example5.png" alt="Example 5" />
            <div className="download-buttons">
              <a href="assets/example5.svg" download>
                Download SVG Example
              </a>
              <a href="assets/example5.json" download>
                Download JSON Example
              </a>
            </div>
          </div>
          {/* Add more example items as needed */}
        </div>
      </section>

      <section id="download-examples" className="section">
        <h2>Download Data Examples</h2>
        <div className="download-buttons">
          <a href="assets/sample.csv" download>
            Download CSV Example
          </a>
          <a href="assets/sample.json" download>
            Download JSON Example
          </a>
        </div>
      </section>

      <section id="generate" className="section">
        <h2>Generate Your Own</h2>
        <Link to="/generate" className="generate-link">
          Go to Generator
        </Link>
      </section>

      <section id="about" className="section">
        <h2>About</h2>
        <p>The Nucleide Chart Generator is a final degree project (TFG) designed to generate detailed visual representations of nucleide charts. These charts are used to display the properties of isotopes, aiding researchers and students in understanding nuclear decay and reactions.</p>
        <section>
            <h3>Project Details</h3>
            <p><strong>Author:</strong> Alfonso Jesús Piñera Herrera</p>
            <p><strong>Tutor:</strong> Andrés María Roldán Aranda</p>
            <p><strong>Email:</strong> <a href="mailto:alfonsojph786@gmail.com">alfonsojph786@gmail.com</a></p>
            <p><strong>Made in collaboration with:</strong> GranaSAT</p>
            <p><strong>GranaSAT Location:</strong> Av. de Madrid, 28, Beiro, 18012 Granada</p>
            <p><strong>GranaSAT Email:</strong> <a href="mailto:granasat@ugr.es">granasat@ugr.es</a></p>
            <p><strong>Credits:</strong> University of Granada (UGR - ETSIIT)</p>
            <p><strong>Version:</strong> 1.0</p>
        </section>
        <section class="license">
            <h3>License</h3>
            <p>This work is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)</a> license.</p>
        </section>
      </section>
    </div>
  );
}

export default Home;
