#!/bin/bash

echo "🚀 Iniciando deploy do FoodCupons..."

# 1. Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install --production
cd ..

# 2. Verificar se o banco de dados existe
echo "🔍 Verificando banco de dados..."
if [ ! -f "backend/database.sqlite" ]; then
    echo "⚠️  Banco de dados não encontrado, criando..."
    cd backend
    npm run init-db
    cd ..
fi

# 3. Preparar para deploy na Vercel
echo "🎯 Preparando deploy na Vercel..."

# 4. Deploy
echo "🚀 Fazendo deploy..."
npx vercel --prod

echo "✅ Deploy concluído!"
echo "🔗 Acesse: https://foodcupons.vercel.app"
