#!/bin/bash

# Ekoru UI - Automated Setup Script
# Este script configura todo el proyecto automáticamente

set -e

echo "🌱 Ekoru UI - Setup Automático"
echo "================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instala Node.js >= 18"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js debe ser >= 18. Tienes: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Verificar/Instalar pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Instalando pnpm..."
    npm install -g pnpm@8
fi

echo "✅ pnpm $(pnpm -v) detectado"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
pnpm install

echo ""
echo "✅ Dependencias instaladas"
echo ""

# Inicializar changesets
echo "📝 Inicializando changesets..."
if [ ! -f ".changeset/README.md" ]; then
    pnpm changeset init
fi

echo ""
echo "🎉 Setup completado!"
echo ""
echo "Próximos pasos:"
echo "==============="
echo ""
echo "1. Iniciar Storybook (desarrollo visual):"
echo "   pnpm storybook"
echo ""
echo "2. Correr tests:"
echo "   pnpm test:watch"
echo ""
echo "3. Build de producción:"
echo "   pnpm build"
echo ""
echo "4. Leer la guía rápida:"
echo "   cat QUICKSTART.md"
echo ""
echo "🚀 ¡Listo para desarrollar!"
