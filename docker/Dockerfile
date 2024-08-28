# Usa la imagen base de Node.js
FROM node:20.14.0

# Crear directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Clonar el repositorio
RUN git clone https://github.com/AlfonsoJPH/nucleidechartfrontend.git .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Exponer el puerto que utiliza la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
