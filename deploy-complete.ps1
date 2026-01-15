# Script para completar el despliegue del proyecto

Write-Host "`n🚀 COMPLETANDO DESPLIEGUE" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

# 1. Verificar estado de git
Write-Host "`n📁 1. Verificando repositorio Git..." -ForegroundColor Yellow
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "   Archivos modificados detectados, creando commit..." -ForegroundColor White
    git add .
    git commit -m "feat: Sistema completo de gestión de calificaciones

- Frontend React 19 con TypeScript
- Gestión de alumnos, materias y notas (CRUD)
- Escala 0-5, aprobado >= 3.0
- Docker multi-stage optimizado
- Documentación consolidada"
    Write-Host "   ✅ Commit creado" -ForegroundColor Green
} else {
    Write-Host "   ✅ Repositorio limpio" -ForegroundColor Green
}

# 2. Verificar remote de GitHub
Write-Host "`n🔗 2. Verificando remote de GitHub..." -ForegroundColor Yellow
$remotes = git remote -v
if ($remotes -notmatch "calificaciones_front") {
    Write-Host "   Configurando remote..." -ForegroundColor White
    git remote add origin https://github.com/LuisCW/calificaciones_front.git
    Write-Host "   ✅ Remote configurado" -ForegroundColor Green
} else {
    Write-Host "   ✅ Remote ya configurado" -ForegroundColor Green
}

# 3. Push a GitHub
Write-Host "`n📤 3. Subiendo a GitHub..." -ForegroundColor Yellow
Write-Host "   Ejecuta: git push -u origin main" -ForegroundColor White

# 4. Verificar imagen Docker
Write-Host "`n🐳 4. Verificando imagen Docker..." -ForegroundColor Yellow
$image = docker images luiscepeda7/calificaciones-frontend:latest --format "{{.Repository}}:{{.Tag}}"
if ($image) {
    Write-Host "   ✅ Imagen construida: $image" -ForegroundColor Green
    Write-Host "   Tamaño: " -NoNewline -ForegroundColor White
    docker images luiscepeda7/calificaciones-frontend:latest --format "{{.Size}}"
} else {
    Write-Host "   ❌ Imagen no encontrada" -ForegroundColor Red
}

# 5. Instrucciones finales
Write-Host "`n" -NoNewline
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host "`n✅ PROYECTO PREPARADO" -ForegroundColor Green
Write-Host "`n📝 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "   1. Subir a GitHub: " -NoNewline -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor Yellow
Write-Host "   2. Push Docker Hub: " -NoNewline -ForegroundColor White
Write-Host "docker push luiscepeda7/calificaciones-frontend:latest" -ForegroundColor Yellow
Write-Host "   3. Probar despliegue: " -NoNewline -ForegroundColor White
Write-Host "docker compose -f docker-compose.hub.yml up -d" -ForegroundColor Yellow

Write-Host "`n🌐 URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:8081/api" -ForegroundColor White
Write-Host "   GitHub:   https://github.com/LuisCW/calificaciones_front" -ForegroundColor White
Write-Host "   Docker:   https://hub.docker.com/r/luiscepeda7/calificaciones-frontend" -ForegroundColor White
Write-Host "`n" + "=" * 60 -ForegroundColor Gray
Write-Host ""
