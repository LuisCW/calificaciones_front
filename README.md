# Sistema de Gestión de Calificaciones

Sistema completo de gestión de calificaciones para instituciones educativas, desarrollado con React + TypeScript (Frontend) y Spring Boot (Backend).


### Escala de Calificaciones
- **Rango:** 0.0 - 5.0
- **Nota aprobatoria:** ≥ 3.0
- **Precisión:** 1 decimal

## Arquitectura

### Frontend
- **Framework:** React 19.2.0
- **Lenguaje:** TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **HTTP Client:** Axios 1.13.2
- **Routing:** React Router DOM 7.12.0
- **UI:** React Icons + Custom CSS
- **Notificaciones:** React Hot Toast 2.6.0

### Backend (vease https://github.com/LuisCW/Calificaciones_back)
- **Framework:** Spring Boot 3.x
- **Lenguaje:** Java 17, Python 3.14 (Lineas de comando para el Backend sin frontend)
- **Base de Datos:** PostgreSQL 15
- **ORM:** Spring Data JPA
- **Build Tool:** Maven

## Inicio Rápido

### Opción 1: Docker Hub (Sin compilar)

Usa las imágenes ya compiladas desde Docker Hub:

```bash
# Descargar archivo de configuración
curl -O https://raw.githubusercontent.com/LuisCW/calificaciones_front/main/docker-compose.hub.yml

# Iniciar todos los servicios
docker compose -f docker-compose.hub.yml up -d

Acceder a la url de frontend para ver la ejecución
```

**URLs de acceso:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8081/api
- Base de datos: localhost:5433

### Opción 2: Clonar y Construir

Clona el repositorio y construye localmente:

```bash
# Clonar repositorio
git clone https://github.com/LuisCW/calificaciones_front.git
cd calificaciones_front

# Iniciar todos los servicios (construye frontend automáticamente)
docker compose up -d --build

Acceder a la url de frontend para ver la ejecución
```

**URLs de acceso:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8081/api
- Base de datos: localhost:5433

## Imágenes Docker

### Frontend
```bash
docker pull luiscepeda7/calificaciones-frontend:latest
```

### Backend
```bash
docker pull luiscepeda7/calificaciones-backend:latest
```

### Base de Datos
```bash
docker pull luiscepeda7/calificaciones-db:latest
```

### Detener servicios
```bash
docker compose down
```

### Reiniciar servicios
```bash
docker compose restart
```

### Limpiar todo (incluyendo volúmenes)
```bash
docker compose down -v
```

## Estructura del Proyecto

```
calificaciones_front/
├── src/
│   ├── components/
│   │   ├── alumnos/          # Componentes de gestión de alumnos
│   │   ├── materias/          # Componentes de gestión de materias
│   │   ├── notas/             # Componentes de gestión de notas
│   │   ├── layout/            # Layout y navegación
│   │   └── home/              # Página de inicio
│   ├── services/
│   │   └── api.ts             # Configuración de Axios y endpoints
│   ├── types/
│   │   └── index.ts           # Definiciones TypeScript
│   ├── App.tsx                # Configuración de rutas
│   └── main.tsx               # Punto de entrada
├── public/
│   └── favicon.svg            # Favicon personalizado
├── backend/                   # Backend Spring Boot (opcional)
├── Dockerfile                 # Dockerfile multi-stage
├── nginx.conf                 # Configuración Nginx
├── docker-compose.yml         # Compose completo (build local)
├── docker-compose.hub.yml     # Compose con imágenes de Docker Hub
└── README.md                  # Este archivo
```

## Detener
`docker compose down`

### Variables de Entorno

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8081/api
```

**Backend (application.properties):**
```properties
spring.datasource.url=jdbc:postgresql://db:5432/calificaciones
spring.datasource.username=postgres
spring.datasource.password=postgres
server.port=8081
```

### Puertos Configurados

| Servicio | Puerto Host | Puerto Contenedor |
|----------|------------|-------------------|
| Frontend | 3000 | 80 |
| Backend | 8081 | 8081 |
| PostgreSQL | 5433 | 5432 |

## API Endpoints

### Alumnos
- `GET /api/alumnos` - Listar todos
- `POST /api/alumnos` - Crear alumno
- `PUT /api/alumnos/{id}` - Actualizar alumno
- `DELETE /api/alumnos/{id}` - Eliminar alumno

### Materias
- `GET /api/materias` - Listar todas
- `POST /api/materias` - Crear materia
- `PUT /api/materias/{id}` - Actualizar materia
- `DELETE /api/materias/{id}` - Eliminar materia

### Notas
- `GET /api/notas` - Listar todas
- `GET /api/notas/alumno/{id}` - Notas por alumno
- `POST /api/notas` - Registrar nota
- `PUT /api/notas/{id}` - Actualizar nota
- `DELETE /api/notas/{id}` - Eliminar nota

## Construcción Manual

### Construir imagen del frontend
```bash
docker build -t luiscepeda7/calificaciones-frontend:latest \
  --build-arg VITE_API_URL=http://localhost:8081/api .
```

### Construir solo el frontend (sin Docker)
```bash
npm run build
```

Los archivos compilados estarán en `dist/`

## Características Técnicas

### Frontend
- Componentes funcionales con React Hooks
- TypeScript para type-safety
- Routing con React Router v7
- Estado local con useState
- Manejo de formularios con validación
- Notificaciones toast
- Modales para CRUD
- Diseño responsive
- Variables CSS para temas

### Backend
- API RESTful
- Spring Data JPA
- Validación de datos
- CORS configurado
- Arquitectura en capas (Controller → Service → Repository)
- DTOs para transferencia de datos

### Docker
- Multi-stage build (Node + Nginx)
- Imágenes optimizadas (Alpine)
- Configuración Nginx para SPA
- Red Docker compartida
- Volúmenes persistentes para PostgreSQL
- Health checks

##  Solución de Problemas

### El frontend no se conecta al backend

**Problema:** Error de conexión o CORS

**Solución:**
```bash
# Verificar que el backend está corriendo
docker compose ps

# Ver logs del backend
docker compose logs backend

# Reiniciar servicios
docker compose restart
```

### La base de datos no tiene datos

**Problema:** Base de datos vacía

**Solución:**
```bash
# Ejecutar script de inserción de datos
cd backend
docker compose exec backend bash
# Dentro del contenedor, ejecutar script de datos
```

### Puerto ya en uso

**Problema:** `port is already allocated`

**Solución:**
```bash
# Cambiar puertos en docker-compose.yml
# O detener el servicio que usa el puerto
```

### Error al construir la imagen

**Problema:** Falla en `npm ci` o `npm run build`

**Solución:**
```bash
# Limpiar caché de Docker
docker builder prune -a

# Reconstruir
docker compose build --no-cache
```
