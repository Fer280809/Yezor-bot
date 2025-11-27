#!/bin/bash

# ============================================
# YEZOR BOT - Script de Instalación Termux
# ============================================

echo "🤖 YEZOR BOT - Instalación Automática"
echo "======================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Sin color

# Función de log
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar si estamos en Termux
if [ ! -d "$PREFIX" ]; then
    log_error "Este script debe ejecutarse en Termux"
    exit 1
fi

# Actualizar Termux
log_info "Actualizando paquetes de Termux..."
pkg update -y && pkg upgrade -y

if [ $? -eq 0 ]; then
    log_success "Paquetes actualizados"
else
    log_error "Error actualizando paquetes"
    exit 1
fi

# Instalar Node.js
log_info "Instalando Node.js..."
pkg install -y nodejs

if command -v node &> /dev/null; then
    log_success "Node.js instalado: $(node -v)"
else
    log_error "Error instalando Node.js"
    exit 1
fi

# Instalar Git
log_info "Instalando Git..."
pkg install -y git

if command -v git &> /dev/null; then
    log_success "Git instalado: $(git --version)"
else
    log_error "Error instalando Git"
    exit 1
fi

# Instalar FFmpeg (opcional para multimedia)
log_info "Instalando FFmpeg..."
pkg install -y ffmpeg

# Instalar Python (opcional)
log_info "Instalando Python..."
pkg install -y python

# Dar permisos de almacenamiento
log_info "Solicitando permisos de almacenamiento..."
termux-setup-storage

# Instalar dependencias npm
log_info "Instalando dependencias de Node.js..."
npm install

if [ $? -eq 0 ]; then
    log_success "Dependencias instaladas correctamente"
else
    log_error "Error instalando dependencias"
    exit 1
fi

# Crear carpeta de autenticación
mkdir -p auth_yezor

echo ""
echo "======================================"
log_success "Instalación completada exitosamente!"
echo "======================================"
echo ""
echo "Para iniciar el bot ejecuta:"
echo "  npm start"
echo ""
echo "Para escanear el QR:"
echo "  1. Ejecuta: npm start"
echo "  2. Escanea el código QR con WhatsApp"
echo "  3. Ve a WhatsApp > Menú > Dispositivos vinculados"
echo ""