# Guía de Pruebas - Sistema de Calificaciones

## 🧪 Pruebas Funcionales

### 1. Probar Gestión de Alumnos

#### Crear un Alumno
1. Navega a la sección "Alumnos"
2. Click en "Nuevo Alumno"
3. Completa el formulario:
   - Nombre: Juan
   - Apellido: Pérez
   - Email: juan.perez@example.com
   - Fecha de Nacimiento: 2000-01-15
4. Click en "Guardar"
5. **Resultado esperado**: Mensaje de éxito y alumno aparece en la lista

#### Editar un Alumno
1. Click en el icono de editar (lápiz) del alumno creado
2. Modifica el email: juan.perez.nuevo@example.com
3. Click en "Guardar"
4. **Resultado esperado**: Mensaje de éxito y datos actualizados en la tabla

#### Eliminar un Alumno
1. Click en el icono de eliminar (basura)
2. Confirmar en el diálogo
3. **Resultado esperado**: Mensaje de éxito y alumno removido de la lista

### 2. Probar Gestión de Materias

#### Crear una Materia
1. Navega a la sección "Materias"
2. Click en "Nueva Materia"
3. Completa el formulario:
   - Nombre: Matemáticas
   - Código: MAT101
   - Créditos: 4
4. Click en "Guardar"
5. **Resultado esperado**: Mensaje de éxito y materia aparece en la lista

#### Crear más Materias (para pruebas)
- Física (FIS101, 3 créditos)
- Programación (PRG101, 5 créditos)
- Historia (HIS101, 2 créditos)

### 3. Probar Gestión de Notas

#### Registrar Notas
1. Navega a la sección "Notas"
2. Click en "Registrar Nota"
3. Completa el formulario:
   - Alumno: Selecciona Juan Pérez
   - Materia: Matemáticas
   - Nota: 4.2
   - Fecha: Fecha actual
4. Click en "Registrar"
5. **Resultado esperado**: Mensaje de éxito

#### Registrar más notas para el mismo alumno
- Física: 2.5
- Programación: 4.5
- Historia: 3.8

#### Consultar Notas por Alumno
1. En la sección "Notas"
2. Selecciona "Juan Pérez" en el selector
3. Click en "Buscar"
4. **Resultado esperado**: 
   - Tabla con todas las notas del alumno
   - Estadísticas:
     - Promedio: 3.7
     - Total Materias: 4
     - Aprobadas: 3 (nota badge verde para notas >= 3)
     - Reprobadas: 1 (nota badge rojo para notas < 3)

## 🔍 Casos de Prueba Adicionales

### Validaciones de Formulario

#### Alumno
- [ ] Email inválido muestra error
- [ ] Campos vacíos no permiten envío
- [ ] Fecha de nacimiento futura muestra error

#### Materia
- [ ] Créditos negativos o cero muestran error
- [ ] Código duplicado muestra error del backend

#### Nota
- [ ] Nota menor a 0 muestra error
- [ ] Nota mayor a 5 muestra error
- [ ] Debe seleccionar alumno y materia

### Pruebas de UI/UX

- [ ] Modal se cierra al hacer click fuera
- [ ] Modal se cierra con el botón X
- [ ] Modal se cierra con el botón Cancelar
- [ ] Botón Guardar muestra loading mientras procesa
- [ ] Navegación entre secciones funciona correctamente
- [ ] Página responsive en móvil
- [ ] Iconos se muestran correctamente

### Pruebas de API

#### Verificar Conectividad
```bash
# Verificar que el backend esté corriendo
curl http://localhost:8080/api/alumnos
```

#### Respuesta esperada:
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@example.com",
    "fechaNacimiento": "2000-01-15"
  }
]
```

## 🐛 Problemas Comunes y Soluciones

### 1. Error: "Network Error" o "Failed to fetch"

**Causa**: Backend no está corriendo o URL incorrecta

**Solución**:
- Verifica que el backend esté en http://localhost:8080
- Revisa el archivo `.env` y confirma la URL
- Verifica la consola del navegador para más detalles

### 2. CORS Error

**Causa**: Backend no tiene CORS habilitado

**Solución**:
- Verifica que los controladores tengan `@CrossOrigin(origins = "*")`
- Reinicia el backend después de hacer cambios

### 3. 404 Not Found en las rutas

**Causa**: Navegación directa a una ruta en modo producción

**Solución**:
- En desarrollo, Vite maneja esto automáticamente
- En producción, configura el servidor para redireccionar a index.html

### 4. Las dependencias no se instalan

**Solución**:
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### 5. Puerto 5173 ya en uso

**Solución**:
```bash
# En Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process

# O cambiar el puerto en vite.config.ts
server: { port: 5174 }
```

## 📊 Datos de Prueba Sugeridos

### Alumnos
```
1. María García (maria.garcia@example.com, 1999-05-20)
2. Carlos López (carlos.lopez@example.com, 2001-08-10)
3. Ana Martínez (ana.martinez@example.com, 2000-12-03)
```

### Materias
```
1. Álgebra (ALG101, 4 créditos)
2. Química (QUI101, 3 créditos)
3. Literatura (LIT101, 2 créditos)
4. Inglés (ING101, 3 créditos)
```

### Notas (María García)
```
- Álgebra: 4.5
- Química: 3.8
- Literatura: 4.2
- Inglés: 4.8
Promedio esperado: 4.3
```

## ✅ Checklist de Pruebas Completas

### Frontend
- [ ] Instalación de dependencias exitosa
- [ ] Servidor de desarrollo inicia correctamente
- [ ] Navegación entre páginas funciona
- [ ] CRUD de Alumnos completo
- [ ] CRUD de Materias completo
- [ ] Registro de Notas funciona
- [ ] Consulta de Notas por Alumno funciona
- [ ] Estadísticas se calculan correctamente
- [ ] Notificaciones (toast) aparecen
- [ ] UI responsive en móvil
- [ ] Modales funcionan correctamente
- [ ] Validaciones de formulario activas

### Backend
- [ ] Backend inicia en puerto 8080
- [ ] Base de datos conectada
- [ ] CORS habilitado
- [ ] Endpoints responden correctamente
- [ ] Validaciones del lado del servidor funcionan

### Integración
- [ ] Frontend se conecta al backend
- [ ] Datos se persisten en la base de datos
- [ ] Errores del backend se muestran en frontend
- [ ] Actualización en tiempo real funciona

## 🎯 Criterios de Aceptación

### ✅ Proyecto Completo Cuando:
1. Todos los CRUDs funcionan sin errores
2. Las validaciones previenen datos inválidos
3. La UI es intuitiva y responsive
4. Las notificaciones informan al usuario adecuadamente
5. El código está en TypeScript con tipos correctos
6. No hay errores en consola del navegador
7. El proyecto se puede iniciar con un solo comando
8. La documentación está completa

## 📸 Screenshots Esperados

### Página de Inicio
- 3 tarjetas con iconos (Alumnos, Materias, Notas)
- Navegación limpia en la parte superior

### Lista de Alumnos
- Tabla con columnas: ID, Nombre, Apellido, Email, Fecha Nacimiento, Acciones
- Botón "Nuevo Alumno" visible
- Botones de editar y eliminar en cada fila

### Formulario de Alumno
- Modal centrado con campos del formulario
- Botones Cancelar y Guardar
- Botón X para cerrar

### Gestión de Notas
- Selector de alumno
- Tabla de notas con badge de color
- Estadísticas visibles (Promedio, Total, Aprobadas, Reprobadas)

## 🚀 Performance

### Métricas Esperadas
- Tiempo de carga inicial: < 2 segundos
- Tiempo de respuesta de API: < 500ms
- Tiempo de renderizado de tabla: < 100ms
- Smooth animations en modales

## 🔐 Seguridad (Opcional para Mejoras Futuras)

- [ ] Validación de datos en el backend
- [ ] Sanitización de inputs
- [ ] Manejo de errores sin exponer información sensible
- [ ] Rate limiting en API
- [ ] Autenticación JWT (futuro)

---

**Nota**: Este documento debe actualizarse conforme el proyecto evolucione.
