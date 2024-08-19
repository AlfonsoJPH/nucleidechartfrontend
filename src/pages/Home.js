import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import SvgViewer from '../components/SvgViewer';

function Home() {
  const [svgTable, setSvgTable] = useState('');
  const [svgConfig, setSvgConfig] = useState('{     "Table": {         "color": "#FFFFFF",         "Text": "black",         "Z color": "darkgrey",         "N color": "darkgrey",         "font1": 30,         "font2": 20,         "font3": 10,         "Z font size": 20,         "N font size": 20,         "sizes": { "width": 4989.6 , "height": 3528},         "border_offset": [80, 80],         "border_width": 1,         "border_color": "black",         "base_h_offset": 120,         "base_v_offset": -720,         "number_of_divisions": 2,         "div_h_offsets": [120, -80],         "div_v_offsets": [320, -360],         "div_ranges": [[0, 58], [59, 118]]     },     "Element_Box": {         "sizes": {             "width": 40,             "height": 40         },         "stroke_width": 0,         "border_width": 1,         "max_number_of_nucleides": 0,         "symbol_and_weight": false,         "name": true,         "name_font": 7,         "name_offset": [20, 20],         "show_symbol": true,         "show_weight": true,         "symbol_font": 18,         "weight_font": 10,         "symbol_offset": [20, 22],         "weight_offset": [20, 36]     },     "Nucleide_Sect": {         "sizes": {             "width": 40,             "height": 30         },         "stroke_width": 0,         "border_width": 0.2,         "show_half_life": true,         "half_life_font": 4,         "half_life_offset": [0.5, 4],         "show_energy": true,         "energy_font": 4,         "energy_offset": [0, 40]     },     "Legend": {         "sizes": {             "width": 320,             "height": 480         },         "offset": [80, 80],         "stroke_width": 0,         "border_width": 1,         "border_color": "black",         "panel_background": "none",         "show_title": true,         "title_font": 18,         "title_font_color": "black",         "title_offset": [160, 40],         "show_decays_examples": true,         "show_decays_examples_text": true,         "decays_examples_font": 10,         "decays_examples_offset": [20, 60],         "decays_examples_font_offset": [60, 22.5],         "decays_examples_font_color": "black",         "show_nucleides_examples": true,         "show_nucleides_examples_text": true,         "nucleides_examples_font": 10,         "nucleides_examples_offset": [20, 460],         "nucleides_examples_font_offset": [60, 422.5],         "nucleides_examples_font_color": "black"     },     "colors": {         "Stroke": "black",         "Element_Box": "#FFFFFF",         "Nucleide_Sect": "#FFFFFF",         "DecayModes": {             "ALPHA": {                 "fill": "#B3A60A",                 "text": "black"             },             "BETA_MINUS": {                 "fill": "#548088",                 "text": "black"             },             "STABLE": {                 "fill": "black",                 "text": "white"             },             "PROTON": {                 "fill": "#AD8516",                 "text": "black"             },             "SF": {                 "fill": "#295F2D",                 "text": "black"             },             "BETA_PLUS": {                 "fill": "#AF5E5B",                 "text": "black"             },             "IT": {                 "fill": "#C1BAB4",                 "text": "black"             },             "ELECTRON_CAPTURE": {                 "fill": "#646293",                 "text": "black"             },             "NEUTRON": {                 "fill": "#869898",                 "text": "black"             }         }     } } ');

  const handleSvgGenerated = (svg, config) => {
    setSvgTable(svg['svg']);
    console.log('Generated SVG:', {svg});
    setSvgConfig(svg['config']);
    console.log('Config:', config);
  };

  const downloadSVG = () => {
    const svgBlob = new Blob([svgTable], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'table.svg';
    downloadLink.click();
  }

  return (
    <div className="Home">
      <FileUploader onSvgGenerated={handleSvgGenerated} />
      {svgTable && <SvgViewer svgTable={svgTable} svgConfig={svgConfig}  />}
      <button onClick={downloadSVG}>Download SVG</button>

    </div>
  );
}

export default Home;
