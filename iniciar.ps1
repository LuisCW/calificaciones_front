# Script para iniciar el proyecto completo
# Sistema de Gestión de Calificaciones

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sistema de Gestión de Calificaciones" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js no está instalado. Por favor instálalo desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar si las dependencias están instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠ Instalando dependencias del frontend..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "✓ Dependencias ya instaladas" -ForegroundColor Green
}

Write-Host ""
Write-Host "Opciones de inicio:" -ForegroundColor Cyan
Write-Host "1. Iniciar solo Frontend (React + Vite)" -ForegroundColor White
Write-Host "2. Iniciar solo Backend (Spring Boot)" -ForegroundColor White
Write-Host "3. Iniciar Backend + Frontend (ambos)" -ForegroundColor White
Write-Host "4. Iniciar todo con Docker (DB + Backend + Frontend)" -ForegroundColor White
Write-Host "5. Salir" -ForegroundColor White
Write-Host ""

$opcion = Read-Host "Selecciona una opción (1-5)"

switch ($opcion) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Iniciando Frontend en http://localhost:5173" -ForegroundColor Green
        Write-Host "📡 Asegúrate de que el backend esté corriendo en http://localhost:8080" -ForegroundColor Yellow
        Write-Host ""
        npm run dev
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Iniciando Backend en http://localhost:8080" -ForegroundColor Green
        Write-Host "📡 Asegúrate de que PostgreSQL esté corriendo" -ForegroundColor Yellow
        Write-Host ""
        Set-Location backend
        ./mvnw spring-boot:run
    }
    "3" {
        Write-Host ""
        Write-Host "🚀 Iniciando Backend y Frontend..." -ForegroundColor Green
        Write-Host ""
        
        # Iniciar backend en segundo plano
        Write-Host "📦 Iniciando Backend..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; ./mvnw spring-boot:run"
        
        # Esperar 5 segundos para que el backend inicie
        Write-Host "⏳ Esperando que el backend inicie..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        
        # Iniciar frontend
        Write-Host "📦 Iniciando Frontend..." -ForegroundColor Cyan
        npm run dev
    }
    "4" {
        Write-Host ""
        Write-Host "🐳 Iniciando con Docker..." -ForegroundColor Green
        Write-Host "Esta opción requiere Docker Desktop instalado y corriendo" -ForegroundColor Yellow
        Write-Host ""
        
        # Verificar si Docker está instalado
        try {
            docker --version | Out-Null
            Write-Host "✓ Docker detectado" -ForegroundColor Green
            
            # Iniciar servicios con Docker
            Set-Location backend
            docker-compose up -d
            Set-Location ..
            
            Write-Host ""
            Write-Host "⏳ Esperando que los servicios inicien..." -ForegroundColor Yellow
            Start-Sleep -Seconds 10
            
            Write-Host "🚀 Iniciando Frontend..." -ForegroundColor Cyan
            npm run dev
        } catch {
            Write-Host "✗ Docker no está instalado o no está corriendo" -ForegroundColor Red
            Write-Host "Instala Docker Desktop desde https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
        }
    }
    "5" {
        Write-Host "👋 ¡Hasta luego!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "✗ Opción inválida" -ForegroundColor Red
        exit 1
    }
}
