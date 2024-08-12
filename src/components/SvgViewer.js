import React, { useEffect, useRef } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import SvgEditor from '../components/SvgEditor';

function SvgViewer({ svgContent, svgConfig }) {
  const svgContainerRef = useRef(null);

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
        console.error("No se encontró un elemento <svg> en svgContent.");
      }
    }
  }, [svgContent]);

  return (
    <div className="svg-container">
      <div className="svg-viewer"
        ref={svgContainerRef}
        dangerouslySetInnerHTML={{ __html: svgContent }}

      />
      {svgContent && <SvgEditor svgConfig={svgConfig} />}
    </div>
  );
}

export default SvgViewer;
