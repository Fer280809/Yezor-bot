#!/bin/bash
# ============================================
# YEZOR BOT - Script de Instalación Termux
# ============================================

clear

echo "╔════════════════════════════════════════╗"
echo "║                                        ║"
echo "║  🤖 YEZOR BOT - INSTALACIÓN TERMUX   ║"
echo "║                                        ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # Sin color

# Función de log
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${BLUE}➜ $1${NC}"
}

# Verificar si estamos en Termux
if [ ! -d "$PREFIX" ]; then
    log_error "Este script debe ejecutarse en Termux"
    exit 1
fi

log_success "Detectado: Termux Android"
echo ""

# ============================================
# PASO 1: Actualizar Termux
# ============================================
log_step "PASO 1/8: Actualizando paquetes de Termux..."
pkg update -y && pkg upgrade -y

if [ $? -eq 0 ]; then
    log_success "Paquetes actualizados"
else
    log_error "Error actualizando paquetes"
    exit 1
fi
echo ""

# ============================================
# PASO 2: Instalar Node.js
# ============================================
log_step "PASO 2/8: Instalando Node.js..."
pkg install -y nodejs

if command -v node &> /dev/null; then
    log_success "Node.js instalado: $(node -v)"
    log_success "npm instalado: $(npm -v)"
else
    log_error "Error instalando Node.js"
    exit 1
fi
echo ""

# ============================================
# PASO 3: Instalar Git
# ============================================
log_step "PASO 3/8: Instalando Git..."
pkg install -y git

if command -v git &> /dev/null; then
    log_success "Git instalado: $(git --version)"
else
    log_error "Error instalando Git"
    exit 1
fi
echo ""

# ============================================
# PASO 4: Instalar FFmpeg (multimedia)
# ============================================
log_step "PASO 4/8: Instalando FFmpeg (para multimedia)..."
pkg install -y ffmpeg

if command -v ffmpeg &> /dev/null; then
    log_success "FFmpeg instalado"
else
    log_warning "FFmpeg no instalado (funciones multimedia limitadas)"
fi
echo ""

# ============================================
# PASO 5: Instalar Python (opcional)
# ============================================
log_step "PASO 5/8: Instalando Python..."
pkg install -y python

if command -v python &> /dev/null; then
    log_success "Python instalado: $(python --version)"
else
    log_warning "Python no instalado"
fi
echo ""

# ============================================
# PASO 6: Permisos de almacenamiento
# ============================================
log_step "PASO 6/8: Configurando permisos de almacenamiento..."
log_info "Acepta los permisos en la ventana emergente"
termux-setup-storage

if [ -d "$HOME/storage" ]; then
    log_success "Permisos de almacenamiento configurados"
else
    log_warning "No se pudieron configurar permisos (ejecuta: termux-setup-storage)"
fi
echo ""

# ============================================
# PASO 7: Limpiar instalaciones previas
# ============================================
log_step "PASO 7/8: Limpiando instalaciones previas..."

# Eliminar package-lock.json
if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    log_success "package-lock.json eliminado"
fi

# Eliminar node_modules
if [ -d "node_modules" ]; then
    log_info "Eliminando node_modules (esto puede tardar)..."
    rm -rf node_modules
    log_success "node_modules eliminado"
fi

# Limpiar caché de npm
log_info "Limpiando caché de npm..."
npm cache clean --force
log_success "Caché limpiado"

echo ""

# ============================================
# PASO 8: Instalar dependencias de Node.js
# ============================================
log_step "PASO 8/8: Instalando dependencias de Node.js..."
log_info "Esto puede tardar varios minutos..."
echo ""

npm install

if [ $? -eq 0 ]; then
    log_success "Dependencias instaladas correctamente"
else
    log_error "Error instalando dependencias"
    log_info "Intenta ejecutar manualmente: npm install"
    exit 1
fi
echo ""

# ============================================
# Crear carpetas necesarias
# ============================================
log_info "Creando carpetas necesarias..."
mkdir -p auth_yezor
mkdir -p backups
mkdir -p plugins
mkdir -p temp

log_success "Carpetas creadas"
echo ""

# ============================================
# Verificación final
# ============================================
log_step "Verificando instalación..."
echo ""

# Verificar Node.js
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓${NC} Node.js: $(node -v)"
else
    echo -e "${RED}✗${NC} Node.js: No instalado"
fi

# Verificar npm
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} npm: $(npm -v)"
else
    echo -e "${RED}✗${NC} npm: No instalado"
fi

# Verificar Git
if command -v git &> /dev/null; then
    echo -e "${GREEN}✓${NC} Git: Instalado"
else
    echo -e "${RED}✗${NC} Git: No instalado"
fi

# Verificar FFmpeg
if command -v ffmpeg &> /dev/null; then
    echo -e "${GREEN}✓${NC} FFmpeg: Instalado"
else
    echo -e "${YELLOW}⚠${NC} FFmpeg: No instalado"
fi

# Verificar node_modules
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencias: Instaladas"
else
    echo -e "${RED}✗${NC} Dependencias: No instaladas"
fi

echo ""
echo "════════════════════════════════════════"
log_success "¡INSTALACIÓN COMPLETADA!"
echo "════════════════════════════════════════"
echo ""

# ============================================
# Instrucciones finales
# ============================================
echo -e "${CYAN}📝 INSTRUCCIONES:${NC}"
echo ""
echo "1️⃣  Para iniciar el bot:"
echo "   ${YELLOW}npm start${NC}"
echo ""
echo "2️⃣  Métodos de conexión:"
echo "   • Código QR (escanear con WhatsApp)"
echo "   • Código de vinculación (8 dígitos)"
echo ""
echo "3️⃣  Para detener el bot:"
echo "   ${YELLOW}Ctrl + C${NC}"
echo ""
echo "4️⃣  Para actualizar dependencias:"
echo "   ${YELLOW}bash termux.sh${NC}"
echo ""
echo "5️⃣  Carpetas importantes:"
echo "   • ${CYAN}auth_yezor${NC} - Sesión del bot"
echo "   • ${CYAN}plugins${NC} - Comandos personalizados"
echo "   • ${CYAN}backups${NC} - Respaldos de datos"
echo ""

echo -e "${GREEN}🚀 ¡Todo listo! Ejecuta: ${YELLOW}npm start${NC}"
echo ""
