import React, { useState, useEffect } from 'react';

const SvgEditor = ({ svgConfig }) => {
    const [data, setData] = useState(svgConfig);
    const [collapsedSections, setCollapsedSections] = useState({});
    const [dynamicStyles, setDynamicStyles] = useState({});

    const handleInputChange = (sectionPath, field, value) => {
        const sectionKeys = sectionPath.split(' - ');

        setData(prevData => {
            const newData = { ...prevData };
            let currentSection = newData;

            for (let i = 0; i < sectionKeys.length - 1; i++) {
                currentSection = currentSection[sectionKeys[i]];
            }

            currentSection[sectionKeys[sectionKeys.length - 1]][field] = value;

            if (field.toLowerCase().includes('color') || sectionPath.toLowerCase().includes('color')) {
                updateDynamicStyles(sectionKeys, field, value);
            }

            return newData;
        });
    };

    const updateDynamicStyles = (className, field, value) => {
        const section = className[className.length - 1];
        setDynamicStyles(prevStyles => {
            const existingRules = prevStyles[`.${section}`] || "";

            let newRules;
            if (className.length > 2 && className[1] === 'DecayModes') {
                if (field === 'fill') {
                    newRules = `${existingRules} fill: ${value}; .box { fill: ${value}; }`;
                } else if (field === 'text') {
                    newRules = `${existingRules} text { fill: ${value}; }`;
                }
            } else {
                newRules = `${existingRules} ${field}: ${value};`;
            }

            return {
                ...prevStyles,
                [`.${section}`]: newRules
            };
        });
    };

    useEffect(() => {
        const styleElement = document.getElementById('dynamic-styles');
        if (styleElement) {
            styleElement.innerHTML = Object.entries(dynamicStyles)
                .map(([selector, rules]) => `${selector} { ${rules} }`)
                .join(' ');
        }
    }, [dynamicStyles]);

    const handleDownload = () => {
        const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(jsonBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'config.json';
        link.click();
    };

    const toggleSection = (sectionName) => {
        setCollapsedSections(prevState => ({
            ...prevState,
            [sectionName]: !prevState[sectionName]
        }));
    };

    const renderInputField = (sectionPath, key, value) => {
        const inputType = key.toLowerCase().includes('color') || sectionPath.toLowerCase().includes('color') ? 'color' : (typeof value === 'number' ? 'number' : 'text');

        return (
            <div key={key} className="field">
                <label>{key}</label>
                <input
                    type={inputType}
                    value={value}
                    onChange={(e) => handleInputChange(sectionPath, key, e.target.value)}
                />
            </div>
        );
    };

    const renderSection = (sectionPath, sectionData) => {
        const isCollapsed = collapsedSections[sectionPath];
        const sectionKeyName = sectionPath.split(' - ').pop();

        return (
            <div key={sectionPath} className="section">
                <h3 onClick={() => toggleSection(sectionPath)} style={{ cursor: 'pointer' }}>
                    {sectionKeyName}
                </h3>
                {!isCollapsed && (
                    <div className="section-fields">
                        {Object.entries(sectionData).map(([key, value]) =>
                            typeof value === 'object' && !Array.isArray(value) ? (
                                renderSection(`${sectionPath} - ${key}`, value)
                            ) : (
                                renderInputField(sectionPath, key, value)
                            )
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
                {Object.entries(data).map(([sectionPath, sectionData]) =>
                    renderSection(sectionPath, sectionData)
                )}
                <button onClick={handleDownload}>Download JSON</button>
            </aside>
        </div>
    );
};

export default SvgEditor;
