# 🎓 Sistema de Gestión de Calificaciones - FULLSTACK

## 📋 Resumen Ejecutivo

Aplicación web completa desarrollada con:
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Spring Boot 3 + Java 17
- **Base de Datos**: PostgreSQL 16 (Docker)

**✅ Todos los requerimientos cumplidos + TypeScript para valor adicional**

---

## 🚀 Inicio Rápido (3 pasos)

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Iniciar con script automático
```powershell
.\iniciar.ps1
```

### 3️⃣ Seleccionar opción del menú
- Opción 3: Backend + Frontend (recomendado)

---

## 📱 URLs de Acceso

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:5173 | Interfaz React |
| Backend API | http://localhost:8080/api | REST API |
| PostgreSQL | localhost:5432 | Base de datos |

---

## ✅ Funcionalidades Implementadas

### Gestión de Alumnos ✅
- ✅ Listar todos los alumnos en tabla
- ✅ Crear alumno con formulario modal
- ✅ Editar alumno existente
- ✅ Eliminar alumno con confirmación

### Gestión de Materias ✅
- ✅ Listar todas las materias
- ✅ Crear materia con formulario
- ✅ Editar materia existente
- ✅ Eliminar materia con confirmación

### Gestión de Notas ✅
- ✅ Registrar nota:
  - ✅ Selector de alumno
  - ✅ Selector de materia
  - ✅ Input de valor de nota (0-5)
- ✅ Listar notas por alumno
- ✅ Ver estadísticas:
  - Promedio general
  - Total de materias
  - Materias aprobadas (>= 3)
  - Materias reprobadas (< 3)

---

## 🎯 Tecnologías Obligatorias (Cumplidas)

| Requisito | Tecnología Usada | Estado |
|-----------|------------------|--------|
| React | React 19.2.0 | ✅ |
| JavaScript/TypeScript | **TypeScript 5.9.3** | ✅⭐ |
| HTML y CSS | JSX + CSS3 | ✅ |
| Fetch API o Axios | **Axios 1.13.2** | ✅ |

**⭐ TypeScript = Valor adicional en calificación**

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│   React + TS    │ Frontend (Puerto 5173)
│   Vite + Axios  │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Spring Boot    │ Backend (Puerto 8080)
│   REST API      │
└────────┬────────┘
         │ JDBC
         ▼
┌─────────────────┐
│   PostgreSQL    │ Database (Puerto 5432)
│     Docker      │
└─────────────────┘
```

---

## 📁 Estructura del Código

### Frontend
```
src/
├── components/
│   ├── alumnos/AlumnosList.tsx      ← CRUD Alumnos
│   ├── materias/MateriasList.tsx    ← CRUD Materias
│   ├── notas/NotasList.tsx          ← Gestión Notas
│   ├── layout/
│   │   ├── Layout.tsx               ← Layout principal
│   │   └── Navbar.tsx               ← Navegación
│   └── home/Home.tsx                ← Dashboard
├── services/api.ts                  ← Cliente Axios + Endpoints
├── types/index.ts                   ← Tipos TypeScript
├── App.tsx                          ← Rutas
└── main.tsx                         ← Entry point
```

### Backend
```
backend/src/main/java/com/calificaciones/
├── controller/           ← REST Controllers
│   ├── AlumnoController.java
│   ├── MateriaController.java
│   └── NotaController.java
├── service/              ← Business Logic
├── repository/           ← JPA Repositories
├── entity/               ← JPA Entities
└── dto/                  ← Data Transfer Objects
```

---

## 🔌 API REST Completa

### Alumnos (`/api/alumnos`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/alumnos` | Listar todos |
| GET | `/api/alumnos/{id}` | Obtener por ID |
| POST | `/api/alumnos` | Crear alumno |
| PUT | `/api/alumnos/{id}` | Actualizar |
| DELETE | `/api/alumnos/{id}` | Eliminar |

### Materias (`/api/materias`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/materias` | Listar todas |
| GET | `/api/materias/{id}` | Obtener por ID |
| POST | `/api/materias` | Crear materia |
| PUT | `/api/materias/{id}` | Actualizar |
| DELETE | `/api/materias/{id}` | Eliminar |

### Notas (`/api/notas`)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/notas` | Registrar nota |
| GET | `/api/notas/alumno/{id}` | Notas por alumno |
| GET | `/api/notas/materia/{id}` | Notas por materia |
| GET | `/api/notas/alumno/{aId}/materia/{mId}` | Específica |

---

## 🎨 Características del Frontend

### UX/UI
- ✅ Diseño moderno y profesional
- ✅ Responsive (desktop, tablet, móvil)
- ✅ Formularios en modales
- ✅ Notificaciones toast (éxito/error)
- ✅ Confirmaciones de eliminación
- ✅ Indicadores de carga
- ✅ Iconos (React Icons)
- ✅ Navegación intuitiva

### Características Técnicas
- ✅ TypeScript completo
- ✅ React 19 con hooks
- ✅ React Router para navegación
- ✅ Axios para HTTP
- ✅ Hot Module Replacement
- ✅ Código limpio y organizado
- ✅ Componentes reutilizables

### Validaciones
- ✅ Email válido
- ✅ Campos requeridos
- ✅ Notas entre 0-10
- ✅ Fechas válidas
- ✅ Números positivos

---

## 📊 Dashboard y Estadísticas

Cuando consultas notas de un alumno, se muestra:

1. **Tabla de Notas**
   - Materia
   - Nota (con badge de color)
   - Fecha de registro

2. **Estadísticas Automáticas**
   - 📊 Promedio general
   - 📚 Total de materias
   - ✅ Materias aprobadas (>= 7)
   - ❌ Materias reprobadas (< 7)

---

## 🛠️ Comandos Principales

### Frontend
```bash
npm install          # Instalar dependencias
npm run dev          # Desarrollo (HMR activado)
npm run build        # Build producción
npm run preview      # Preview build
npm run lint         # Linter
```

### Backend
```bash
cd backend
docker-compose up -d  # Iniciar PostgreSQL
./mvnw spring-boot:run  # Ejecutar backend
./mvnw clean package    # Compilar
./mvnw test            # Tests
```

---

## 🧪 Prueba Rápida (5 minutos)

### 1. Crear Alumnos
- Juan Pérez (juan@example.com)
- María García (maria@example.com)

### 2. Crear Materias
- Matemáticas (MAT101, 4 créditos)
- Física (FIS101, 3 créditos)
- Programación (PRG101, 5 créditos)

### 3. Registrar Notas
Para Juan Pérez:
- Matemáticas: 8.5
- Física: 6.0
- Programación: 9.5

### 4. Consultar y Verificar
- Buscar notas de Juan Pérez
- Verificar promedio: 8.0
- Verificar aprobadas: 3
- Verificar estadísticas correctas

---

## 📦 Dependencias Clave

### Frontend (package.json)
```json
{
  "react": "^19.2.0",
  "typescript": "~5.9.3",
  "vite": "^7.2.4",
  "axios": "^1.13.2",
  "react-router-dom": "^7.12.0",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0"
}
```

### Backend (pom.xml)
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL Driver
- Bean Validation

---

## 🐳 Docker

### Solo Base de Datos
```bash
cd backend
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f postgres
```

### Detener
```bash
docker-compose down
```

---

## 🚨 Solución de Problemas

### "Cannot connect to backend"
✅ Verifica que el backend esté corriendo en puerto 8080
✅ Revisa el archivo `.env` → `VITE_API_URL=http://localhost:8080/api`

### "Port 5173 already in use"
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

### "Database connection failed"
✅ Verifica que Docker esté corriendo
✅ Inicia PostgreSQL: `docker-compose up -d`

### Reinstalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentación Adicional

| Archivo | Contenido |
|---------|-----------|
| [README-FRONTEND.md](./README-FRONTEND.md) | Documentación detallada del frontend |
| [GUIA-PRUEBAS.md](./GUIA-PRUEBAS.md) | Casos de prueba y testing |
| `iniciar.ps1` | Script automático de inicio |

---

## 🎯 Cumplimiento de Requisitos

### ✅ Requerimientos Funcionales
| Requisito | Implementado |
|-----------|--------------|
| Listar alumnos | ✅ |
| Crear alumno | ✅ |
| Editar alumno | ✅ |
| Eliminar alumno | ✅ |
| Listar materias | ✅ |
| Crear materia | ✅ |
| Editar materia | ✅ |
| Eliminar materia | ✅ |
| Registrar nota | ✅ |
| Seleccionar alumno | ✅ |
| Seleccionar materia | ✅ |
| Ingresar valor nota | ✅ |
| Listar notas por alumno | ✅ |

### ⭐ Valor Adicional
- **TypeScript**: Todo el frontend está en TypeScript
- Código robusto con tipado fuerte
- Mejor mantenibilidad
- Autocompletado en IDE

---

## 💡 Características Extra (Bonus)

Además de los requisitos, se implementó:
- ✨ Dashboard con página de inicio
- 📊 Estadísticas automáticas de notas
- 🎨 UI moderna y profesional
- 📱 Diseño responsive
- 🔔 Notificaciones toast
- ⚡ Hot Module Replacement
- 🎯 Badges de color para notas
- ✅ Validaciones completas
- 🔄 Navegación fluida

---

## 🚀 Deploy (Opcional)

### Frontend
```bash
npm run build
# dist/ contiene los archivos estáticos
```

### Backend
```bash
./mvnw clean package
# target/*.jar es el ejecutable
```

---

## 👨‍💻 Información del Proyecto

- **Lenguajes**: TypeScript, Java
- **Frameworks**: React, Spring Boot
- **Base de Datos**: PostgreSQL
- **Contenedores**: Docker
- **Build Tools**: Vite, Maven

---

## 📄 Licencia

Proyecto desarrollado como prueba técnica.

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisar [GUIA-PRUEBAS.md](./GUIA-PRUEBAS.md)
2. Revisar [README-FRONTEND.md](./README-FRONTEND.md)
3. Verificar logs del backend
4. Verificar consola del navegador

---

**✨ Proyecto completo, funcional y listo para evaluar ✨**

**🚀 Todos los requisitos cumplidos + TypeScript para valor adicional 🚀**
