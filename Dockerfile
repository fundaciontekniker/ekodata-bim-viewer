# Usa una imagen base de Python
FROM python:3.8-slim

# Crea un directorio de trabajo
WORKDIR /viewer

# Copia los archivos de tu aplicación al contenedor
COPY /app /viewer/app
COPY /dist /viewer/dist

# Expone el puerto 8000
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD [ "python", "-m", "http.server", "8000" ]