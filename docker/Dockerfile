# Usa la imagen base de Node.js
FROM node:20.14.0

# Crear directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Configurar las credenciales para GitLab usando ARG
ARG GITLAB_TOKEN
# Clonar el repositorio
RUN git clone https://alfonsojph786:${GITLAB_TOKEN}@git.granasat.space/alfonsojph786/nucleidechartfrontend.git .

ARG API_URL
RUN sed -i "s|process.env.API_URL|\"${API_URL}\"|g" ./src/services/api.js

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Exponer el puerto que utiliza la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
