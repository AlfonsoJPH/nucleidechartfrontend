import React, { useState } from 'react';
import { generateSvg } from '../services/api';

function FileUploader({ onSvgGenerated }) {
  const [jsonFile, setJsonFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [type, setType] = useState('generator');

  const handleJsonChange = (e) => setJsonFile(e.target.files[0]);
  const handleCsvChange = (e) => setCsvFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jsonFile || !csvFile) {
      alert('Please upload both JSON and CSV files.');
      return;
    }

    try {
      const svg = await generateSvg(jsonFile, csvFile);
      console.log('Uploaded SVG:', svg);
      onSvgGenerated(svg);
      if (!type.includes('bar')) setType(type+'_bar');
    } catch (error) {
      console.error('Error generating SVG:', error);
      alert('Failed to generate SVG. Please try again.');
    }
  };

  return (
    <div className={type}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="json-upload">Upload JSON</label>
        <input id="json-upload" type="file" accept=".json" onChange={handleJsonChange} />
        <label htmlFor="csv-upload">Upload CSV</label>
        <input id="csv-upload" type="file" accept=".csv" onChange={handleCsvChange} />
        <label htmlFor="submit">Generate SVG</label>
        <button id="submit" type="submit">Generate SVG</button>
      </form>
    </div>
  );
}

export default FileUploader;
