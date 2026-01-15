# Sistema de Gestión de Calificaciones - Frontend

Aplicación frontend en React + TypeScript + Vite que consume la API REST del backend de Spring Boot para gestionar alumnos, materias y notas.

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP para consumir API
- **React Hot Toast** - Notificaciones
- **React Icons** - Iconos

## 📋 Características

### Gestión de Alumnos
- ✅ Listar todos los alumnos
- ✅ Crear nuevo alumno mediante formulario
- ✅ Editar alumno existente
- ✅ Eliminar alumno

### Gestión de Materias
- ✅ Listar todas las materias
- ✅ Crear nueva materia
- ✅ Editar materia existente
- ✅ Eliminar materia

### Gestión de Notas
- ✅ Registrar nota (seleccionar alumno, materia y valor 0-5)
- ✅ Listar notas por alumno en cada materia
- ✅ Visualizar estadísticas (promedio, aprobadas >= 3, reprobadas < 3)

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Backend de Spring Boot ejecutándose

### Pasos de Instalación

1. **Clonar el repositorio** (si aún no lo has hecho)
```bash
cd calificaciones
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

El archivo `.env` ya está configurado con:
```
VITE_API_URL=http://localhost:8080/api
```

Si tu backend corre en otra URL, modifica este archivo.

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Preview de la build de producción
npm run lint     # Ejecuta el linter
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── alumnos/
│   │   └── AlumnosList.tsx      # CRUD de alumnos
│   ├── materias/
│   │   └── MateriasList.tsx     # CRUD de materias
│   ├── notas/
│   │   └── NotasList.tsx        # Gestión de notas
│   ├── layout/
│   │   ├── Layout.tsx           # Layout principal
│   │   └── Navbar.tsx           # Barra de navegación
│   └── home/
│       └── Home.tsx             # Página de inicio
├── services/
│   └── api.ts                   # Configuración de Axios y endpoints
├── types/
│   └── index.ts                 # Tipos TypeScript
├── App.tsx                      # Configuración de rutas
├── App.css                      # Estilos globales
└── main.tsx                     # Punto de entrada
```

## 🔌 API Endpoints Consumidos

### Alumnos
- `GET /api/alumnos` - Listar todos
- `GET /api/alumnos/{id}` - Obtener por ID
- `POST /api/alumnos` - Crear
- `PUT /api/alumnos/{id}` - Actualizar
- `DELETE /api/alumnos/{id}` - Eliminar

### Materias
- `GET /api/materias` - Listar todas
- `GET /api/materias/{id}` - Obtener por ID
- `POST /api/materias` - Crear
- `PUT /api/materias/{id}` - Actualizar
- `DELETE /api/materias/{id}` - Eliminar

### Notas
- `POST /api/notas` - Registrar nota
- `GET /api/notas/alumno/{alumnoId}` - Listar notas por alumno
- `GET /api/notas/materia/{materiaId}` - Listar notas por materia
- `GET /api/notas/alumno/{alumnoId}/materia/{materiaId}` - Notas por alumno y materia

## 🎨 Características de la UI

- **Diseño Responsivo**: Funciona en desktop, tablet y móvil
- **Modales**: Formularios en modales para crear/editar
- **Notificaciones**: Toast notifications para feedback del usuario
- **Validaciones**: Validación de formularios
- **Estadísticas**: Dashboard con promedio y estadísticas de notas
- **Iconos**: Interfaz moderna con React Icons

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos de producción se generarán en el directorio `dist/`.

### Variables de Entorno en Producción

Asegúrate de configurar `VITE_API_URL` con la URL de tu backend en producción.

## 📱 Uso de la Aplicación

1. **Página Principal**: Dashboard con accesos rápidos a las 3 secciones

2. **Alumnos**: 
   - Click en "Nuevo Alumno" para crear
   - Click en el icono de editar para modificar
   - Click en el icono de eliminar para borrar

3. **Materias**: 
   - Click en "Nueva Materia" para crear
   - Gestión similar a alumnos

4. **Notas**:
   - Click en "Registrar Nota" y selecciona alumno, materia y valor
   - Usa el buscador para ver todas las notas de un alumno
   - Visualiza estadísticas (promedio, aprobadas, reprobadas)

## ⚙️ Configuración del Backend

Asegúrate de que tu backend Spring Boot tenga habilitado CORS:

```java
@CrossOrigin(origins = "*")
```

Ya está configurado en los controladores del backend.

## 🐛 Solución de Problemas

### Error de conexión con el backend

1. Verifica que el backend esté ejecutándose en `http://localhost:8080`
2. Verifica la configuración de CORS en el backend
3. Revisa el archivo `.env` para la URL correcta

### Dependencias no instaladas

```bash
rm -rf node_modules package-lock.json
npm install
```

## 👨‍💻 Desarrollo

El proyecto está configurado con:
- **ESLint** para linting
- **TypeScript** para type-checking
- **Hot Module Replacement (HMR)** para desarrollo rápido

## 📄 Licencia

Este proyecto es parte de una prueba técnica.
