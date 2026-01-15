# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Argumentos de build para variables de entorno
ARG VITE_API_URL=http://localhost:8081/api
ENV VITE_API_URL=$VITE_API_URL

# Build de la aplicación
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar archivos compilados desde el builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Etiquetas
LABEL maintainer="Luis Cepeda"
LABEL description="Sistema de Gestión de Calificaciones - Frontend React + TypeScript"

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
