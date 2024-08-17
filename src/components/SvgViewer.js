import React, { useEffect, useRef, useState } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import SvgEditor from '../components/SvgEditor';
import { generateElementBox } from '../services/api';

function SvgViewer({ svgTable, svgConfig }) {
  const svgContainerRef = useRef(null);
  const [svgBox, setSvgBox] = useState('');
  const [svgContent, setSvgContent] = useState(svgTable);


  const getSvgBox = async () => {
  if (svgBox === '') {
    try {
      const box = await generateElementBox(svgConfig, '1H'); // Esperar a que la promesa se resuelva
      console.log(box); // Ahora debería mostrar el SVG correctamente
      setSvgBox(box);
      setSvgContent(box); // También debes actualizar svgContent con el valor de box
    } catch (error) {
      console.error("Error generating SVG box:", error);
    }
  } else {
    setSvgContent(svgBox); // Si svgBox ya tiene un valor, lo usamos directamente
  }
};


  useEffect(() => {
    if (svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        const panZoomInstance = svgPanZoom(svgElement, {
          zoomEnabled: true,
          controlIconsEnabled: true,
          contain: true,
          center: false,
        });

        return () => {
          panZoomInstance.destroy(); // Desmontar la instancia al salir del componente
        };
      } else {
        console.error("No se encontró un elemento <svg> en svgTable.");
      }
    }
  }, [svgContent]);

  return (
    <div className="svg-zone">
      <div className="menu">
        <div onClick={() => setSvgContent(svgTable)} >Table</div>
        <div onClick={() => getSvgBox()} >Element Box</div>
      </div>
      <div className="svg-container">
        <div className="svg-viewer"
          ref={svgContainerRef}
          dangerouslySetInnerHTML={{ __html: svgContent }}

        />
        {svgContent && <SvgEditor svgConfig={svgConfig} />}
      </div>
    </div>
  );
}

export default SvgViewer;
