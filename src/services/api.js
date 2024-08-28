import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// TODO Make environment variable
const API_URL = process.env.API_URL || 'https://nucleidechart.vaelico.es/API/';
const sessionID = uuidv4();

export const generateTable = async (jsonFile, csvFile, csvChanged) => {
  const formData = new FormData();
  formData.append('config', jsonFile);
  if (csvChanged) {
    formData.append('source', csvFile);
  }
  formData.append('sessionID', sessionID);

  try {
    const response = await axios.post((API_URL+"gen_table/"), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Verifica el contenido de la respuesta
    const svg = response.data;
    console.log('API Response/nSVG:', svg);


    // Asegúrate de que la respuesta contiene el SVG como un string


    const formConfigData = new FormData();
    formConfigData.append('config', jsonFile);
    formConfigData.append('sessionID', sessionID);

    const responseConfig = await axios.post((API_URL+"get_config/"), formConfigData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const config = responseConfig.data;
    console.log('API Response/nConfig:', config);
    return { svg, config };

  } catch (error) {
    console.error('Error generating SVG:', error);
    throw error; // Re-lanza el error para que pueda ser manejado en el componente
  }
};

export const generateElementBox = async (jsonFile, element_box) => {
  const formData = new FormData();
  formData.append('config', jsonFile);
  formData.append('element_box', element_box);
  formData.append('sessionID', sessionID);

  try {
    const response = await axios.post((API_URL+"gen_element_box/"), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Verifica el contenido de la respuesta
    const svg = response.data;
    console.log('API Response/nSVG:', svg);


    return  svg ;

  } catch (error) {
    console.error('Error generating SVG:', error);
    throw error; // Re-lanza el error para que pueda ser manejado en el componente
  }
};
