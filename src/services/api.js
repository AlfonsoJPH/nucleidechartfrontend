import axios from 'axios';

// TODO Make environment variable
const API_URL = 'https://nucleidechart.vaelico.es/API/';

export const generateSvg = async (jsonFile, csvFile) => {
  const formData = new FormData();
  formData.append('config', jsonFile);
  formData.append('source', csvFile);

  try {
    const response = await axios.post((API_URL+"gen_svg/"), formData, {
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
