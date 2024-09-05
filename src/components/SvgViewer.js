import React, { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import svgPanZoom from "svg-pan-zoom";
import SvgEditor from "../components/SvgEditor";
import { generateElementBox, generateTable } from "../services/api";

function SvgViewer({
  svgTable,
  svgConfig,
  onUpdateSvgTable,
  onUpdateSvgConfig,
}) {
  const svgContainerRef = useRef(null);
  const svgEditorRef = useRef(null);
  const [svgBox, setSvgBox] = useState("");
  const [svgContent, setSvgContent] = useState(svgTable);
  const [data, setData] = useState(svgConfig);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onUpdateSvgTable(svgTable);
    setSvgContent(svgTable);
  }, [svgTable, onUpdateSvgTable]);
  useEffect(() => {
    onUpdateSvgConfig(svgConfig);
  }, [data, onUpdateSvgConfig]);
  const getSvgBox = async () => {
    try {
      if (svgBox === "") {
        const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        setLoading(true);
        const box = await generateElementBox(
          jsonBlob,
          svgEditorRef.current.getSelectedElementBox(),
        );
        setSvgBox(box);
        setSvgContent(box);
      } else {
        setSvgContent(svgBox);
      }
    } catch (error) {
      console.error("Error generating SVG box:", error);
    } finally {
      setLoading(false);
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
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      setLoading(true);

      const updatedSvgTable = await generateTable(jsonBlob, "", false); // Usa el estado actual de `data`
      onUpdateSvgTable(updatedSvgTable["svg"]); // Llama al callback cada vez que `data` cambie
      // Actualiza la variable global
      setSvgContent(updatedSvgTable["svg"]);
    } catch (error) {
      console.error("Error reloading SVG Table:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadBoxSvg = async () => {
    try {
      resetDynamicStyles(); // Reset the styles before reloading
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      setLoading(true);
      const updatedSvgBox = await generateElementBox(
        jsonBlob,
        svgEditorRef.current.getSelectedElementBox(),
      );
      setSvgBox(updatedSvgBox);
      setSvgContent(updatedSvgBox); // Actualiza `svgContent` con el nuevo SVG
    } catch (error) {
      console.error("Error reloading SVG Box:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector("svg");
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

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={150} color={"#2498db"} loading={loading} />
      </div>
    );
  }
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
        {svgContent && (
          <SvgEditor
            ref={svgEditorRef}
            svgConfig={data}
            onUpdateData={setData}
            onResetStyles={resetDynamicStyles}
          />
        )}
      </div>
    </div>
  );
}

export default SvgViewer;
