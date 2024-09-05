import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

const SvgEditor = forwardRef(({ svgConfig, onUpdateData }, ref) => {
  const [data, setData] = useState(svgConfig);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [dynamicStyles, setDynamicStyles] = useState({});
  const [selectedElementBox, setSelectedElementBox] = useState("3H");

  useImperativeHandle(ref, () => ({
    resetStyles() {
      setDynamicStyles({});
    },
    getSelectedElementBox() {
      return selectedElementBox;
    },
  }));

  const handleInputChange = (sectionPath, key, value) => {
    const sectionKeys = sectionPath.split(" - ");

    setData((prevData) => {
      const newData = { ...prevData };
      let currentSection = newData;

      for (let i = 0; i < sectionKeys.length - 1; i++) {
        currentSection = currentSection[sectionKeys[i]];
      }

      const originalValue =
        currentSection[sectionKeys[sectionKeys.length - 1]][key];
      let parsedValue;

      if (Array.isArray(originalValue)) {
        if (Array.isArray(originalValue[0])) {
          parsedValue = value.map((subArray) =>
            subArray.map((v) => {
              const num = parseFloat(v);
              return isNaN(num) ? v : num;
            }),
          );
        } else {
          parsedValue = value.split(",").map((v) => {
            const num = parseFloat(v.trim());
            return isNaN(num) ? v.trim() : num;
          });
        }
      } else if (!isNaN(parseFloat(originalValue)) && isFinite(originalValue)) {
        parsedValue = parseFloat(value);
      } else if (typeof originalValue === "boolean") {
        parsedValue = value === "true" || value === "1" || value === "t";
      } else {
        parsedValue = value;
      }

      currentSection[sectionKeys[sectionKeys.length - 1]][key] = parsedValue;

      updateDynamicStyles(sectionKeys, key, parsedValue);

      return newData;
    });
  };

  useEffect(() => {
    onUpdateData(data);
  }, [data, onUpdateData]);

  function updateStyleRule(existingRules, property, value) {
    let rules = existingRules || "";
    const regex = new RegExp(`${property}:\\s?[^;]+;`, "g");
    if (rules.match(regex)) {
      rules = rules.replace(regex, `${property}: ${value};`);
    } else {
      rules += ` ${property}: ${value};`;
    }
    return rules.trim();
  }

  const updateDynamicStyles = (className, field, value) => {
    if (className[0] === "Table") handleTableChange(className, field, value);
    else if (className[0] === "Element_Box")
      handleElementBoxChange(className, field, value);
    else if (className[0] === "colors")
      handleColorChange(className, field, value);

    console.log(className, field, value);
  };

  const handleTableChange = (section, field, value) => {
    section = section[section.length - 1];
    setDynamicStyles((prevStyles) => {
      let newStyles = { ...prevStyles };
      if (field.toLowerCase() === "color")
        newStyles[`#border`] = updateStyleRule(
          newStyles[`#border`],
          "fill",
          value,
        );
      if (field.toLowerCase().includes("z color")) {
        newStyles[`.z_index`] = updateStyleRule(
          newStyles[`.z_index`],
          "fill",
          value,
        );
      }
      if (field.toLowerCase().includes("n color")) {
        newStyles[`.n_index`] = updateStyleRule(
          newStyles[`.n_index`],
          "fill",
          value,
        );
      }
      if (field.toLowerCase().includes("z font size")) {
        newStyles[`.z_index`] = updateStyleRule(
          newStyles[`.z_index`],
          "font-size",
          value,
        );
      }
      if (field.toLowerCase().includes("n font size")) {
        newStyles[`.n_index`] = updateStyleRule(
          newStyles[`.n_index`],
          "font-size",
          value,
        );
      }
      if (field.toLowerCase().includes("border_width")) {
        newStyles[`#border`] = updateStyleRule(
          newStyles[`#border`],
          "stroke-width",
          value,
        );
      }
      if (field.toLowerCase().includes("border_color")) {
        newStyles[`#border`] = updateStyleRule(
          newStyles[`#border`],
          "stroke",
          value,
        );
      }
      return newStyles;
    });
  };

  const handleElementBoxChange = (section, field, value) => {
    setDynamicStyles((prevStyles) => {
      let newStyles = { ...prevStyles };
      if (field.toLowerCase().includes("border_width")) {
        newStyles[`.border`] = updateStyleRule(
          newStyles[`.border`],
          "stroke-width",
          value,
        );
      }
      if (field.toLowerCase().includes("border_color")) {
        newStyles[`.border`] = updateStyleRule(
          newStyles[`#border`],
          "stroke",
          value,
        );
      }
      if (field.toLowerCase().includes("name_font")) {
        newStyles[`.name`] = updateStyleRule(
          newStyles[`.name`],
          "font-size",
          value,
        );
      }
      return newStyles;
    });
  };

  const handleColorChange = (section, field, value) => {
    section = section[section.length - 1];
    setDynamicStyles((prevStyles) => {
      let newStyles = { ...prevStyles };

      if (field.toLowerCase().includes("fill")) {
        newStyles[`.${section} > rect:not(.border)`] = `fill: ${value};`;
        newStyles[`polygon.${section}`] = `fill: ${value};`;
      }

      if (field.toLowerCase().includes("text")) {
        newStyles[`.${section} > text`] = `fill: ${value};`;
      }

      return newStyles;
    });
  };

  useEffect(() => {
    const styleElement = document.getElementById("dynamic-styles");
    if (styleElement) {
      styleElement.innerHTML = Object.entries(dynamicStyles)
        .map(([selector, rules]) => `${selector} { ${rules} }`)
        .join(" ");
    }
  }, [dynamicStyles]);

  const handleDownload = () => {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "config.json";
    link.click();
  };

  const toggleSection = (sectionName) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  const renderInputField = (sectionPath, key, value) => {
    let values = [];

    if (Array.isArray(value) && Array.isArray(value[0])) {
      return value.map((subArray, subIndex) => (
        <div key={`${key}-${subIndex}`} className="field">
          <label>
            {key} {subIndex + 1}
          </label>
          {subArray.map((subValue, subValueIndex) => (
            <input
              key={`${key}-${subIndex}-${subValueIndex}`}
              type="number"
              value={subValue}
              onChange={(e) => {
                const updatedSubArray = [...subArray];
                updatedSubArray[subValueIndex] = parseFloat(e.target.value);
                const updatedValue = [...value];
                updatedValue[subIndex] = updatedSubArray;
                handleInputChange(sectionPath, key, updatedValue);
              }}
            />
          ))}
        </div>
      ));
    }

    if (Array.isArray(value)) {
      values = value;
    } else if (typeof value === "string") {
      values = value.split(",").map((v) => v.trim());
    } else {
      values = [value];
    }

    return values.map((val, index) => {
      const inputType =
        key.toLowerCase().includes("color") ||
        sectionPath.toLowerCase().includes("color")
          ? "color"
          : typeof val === "number"
            ? "number"
            : "text";

      return (
        <div key={`${key}-${index}`} className="field">
          <label>{index === 0 ? key : `${key} ${index + 1}`}</label>
          <input
            type={inputType}
            value={val}
            onChange={(e) => {
              const updatedValues = [...values];
              updatedValues[index] = e.target.value;
              const updatedValue = updatedValues.join(",").trim();
              handleInputChange(sectionPath, key, updatedValue);
            }}
          />
        </div>
      );
    });
  };

  const renderSection = (sectionPath, sectionData) => {
    const isExpanded = collapsedSections[sectionPath];
    const sectionKeyName = sectionPath.split(" - ").pop();
    const sectionClass = isExpanded ? "section collapsed" : "section";

    return (
      <div key={sectionPath} className={sectionClass}>
        <div
          className="title"
          onClick={() => toggleSection(sectionPath)}
          style={{ cursor: "pointer" }}
        >
          <h3>{sectionKeyName}</h3>
          <h3 className="expand">{!isExpanded ? " +" : " -"}</h3>
        </div>
        {isExpanded && (
          <div className="section-fields">
            {Object.entries(sectionData).map(([key, value]) =>
              typeof value === "object" && !Array.isArray(value)
                ? renderSection(`${sectionPath} - ${key}`, value)
                : renderInputField(sectionPath, key, value),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="svg-editor-container">
      <style id="dynamic-styles"></style>
      <aside className="editor-aside">
        <div className="element-box-selector">
          <label>Element Box</label>
          <input
            type="text"
            value={selectedElementBox}
            onChange={(e) => setSelectedElementBox(e.target.value)}
          />
        </div>

        {Object.entries(data).map(([sectionPath, sectionData]) =>
          renderSection(sectionPath, sectionData),
        )}
      </aside>
      <button onClick={handleDownload}>Download JSON</button>
    </div>
  );
});

export default SvgEditor;
