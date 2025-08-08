@echo off
echo 🚀 Iniciando deploy do FoodCupons no Windows...

REM 1. Instalar dependências do backend
echo 📦 Instalando dependências do backend...
cd backend
call npm install --production
cd ..

REM 2. Verificar se o banco de dados existe
echo 🔍 Verificando banco de dados...
if not exist "backend\database.sqlite" (
    echo ⚠️  Banco de dados não encontrado, criando...
    cd backend
    call npm run init-db
    cd ..
)

REM 3. Preparar para deploy na Vercel
echo 🎯 Preparando deploy na Vercel...

REM 4. Deploy
echo 🚀 Fazendo deploy...
call npx vercel --prod

echo ✅ Deploy concluído!
echo 🔗 Acesse: https://foodcupons.vercel.app
pause
