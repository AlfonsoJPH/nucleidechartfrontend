import React, { useEffect, useRef, useState } from 'react';
import svgPanZoom from 'svg-pan-zoom';
import SvgEditor from '../components/SvgEditor';
import { generateElementBox, generateTable } from '../services/api';

function SvgViewer({ svgTable, svgConfig, onUpdateSvgTable }) {
  const svgContainerRef = useRef(null);
  const svgEditorRef = useRef(null); // Añadir la referencia para SvgEditor
  const [svgBox, setSvgBox] = useState('');
  const [svgContent, setSvgContent] = useState(svgTable);
  const [data, setData] = useState(svgConfig);

    useEffect(() => {
      onUpdateSvgTable(svgTable);  // Llama al callback cada vez que `data` cambie
    }, [svgTable, onUpdateSvgTable]);
  const getSvgBox = async () => {
    try {
      if (svgBox === '') {
        const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const box = await generateElementBox(jsonBlob, svgEditorRef.current.getSelectedElementBox());
        setSvgBox(box);
        setSvgContent(box); // Actualiza `svgContent` con el nuevo SVG
      } else {
        setSvgContent(svgBox);
      }
    } catch (error) {
      console.error("Error generating SVG box:", error);
    }
  };

  const resetDynamicStyles = () => {
    // Reset the dynamic styles in SvgEditor
    if (svgEditorRef.current) {
      svgEditorRef.current.resetStyles();
    }
  };

  const reloadTableSvg = async () => {
    try {
      resetDynamicStyles(); // Reset the styles before reloading
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const updatedSvgTable = await generateTable(jsonBlob, '', false); // Usa el estado actual de `data`
      onUpdateSvgTable(updatedSvgTable['svg']);  // Llama al callback cada vez que `data` cambie
        // Actualiza la variable global
      setSvgContent(updatedSvgTable['svg']);
    } catch (error) {
      console.error("Error reloading SVG Table:", error);
    }
  };

  const reloadBoxSvg = async () => {
    try {
      resetDynamicStyles(); // Reset the styles before reloading
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const updatedSvgBox = await generateElementBox(jsonBlob, svgEditorRef.current.getSelectedElementBox());
      setSvgBox(updatedSvgBox);
      setSvgContent(updatedSvgBox); // Actualiza `svgContent` con el nuevo SVG
    } catch (error) {
      console.error("Error reloading SVG Box:", error);
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
        console.error("No se encontró un elemento <svg> en svgContent.");
      }
    }
  }, [svgContent]);

  return (
    <div className="svg-zone">
      <div className="menu">
        <div className="selector">
          <div onClick={() => setSvgContent(svgTable)}>Table</div>
          <div onClick={() => getSvgBox()}>Element Box</div>
        </div>
        <div className="reload">
          <div onClick={reloadTableSvg}>Reload Table</div>
          <div onClick={reloadBoxSvg}>Reload Box</div>
        </div>
      </div>
      <div className="svg-container">
        <div
          className="svg-viewer"
          ref={svgContainerRef}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        {svgContent && <SvgEditor ref={svgEditorRef} svgConfig={data} onUpdateData={setData} onResetStyles={resetDynamicStyles} />}
      </div>
    </div>
  );
}

export default SvgViewer;
