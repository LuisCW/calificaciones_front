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


---

⭐ Si este proyecto te fue útil, no olvides darle una estrella en GitHub!

---

## Detener
`docker compose down`
