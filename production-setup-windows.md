# Guia de Deploy Completo - FoodCupons (Windows)

## 📋 Resumo do Projeto
- **Frontend**: HTML/CSS/JavaScript estático
- **Backend**: Node.js/Express com SQLite
- **Banco**: SQLite já configurado
- **Deploy**: Vercel (serverless)

## 🚀 Deploy no Windows

### Opção 1: Deploy Automático (RECOMENDADO)
```cmd
# Execute o arquivo batch
deploy-windows.bat
```

### Opção 2: Manual via Vercel CLI
```cmd
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

### Opção 3: Interface Web
1. **Acesse**: [vercel.com](https://vercel.com)
2. **Importe**: Seu repositório Git ou faça upload dos arquivos
3. **Configure**: 
   - Framework: Node.js
   - Root Directory: `.`
   - Build Command: `npm run build` (se houver)
   - Output Directory: `.`
4. **Deploy**: Clique em "Deploy"

## 🔧 Configurações de Produção

### Variáveis de Ambiente (Vercel Dashboard):
```
PORT=3001
NODE_ENV=production
JWT_SECRET=sua_chave_secreta_super_segura
```

## 🎯 Comando Único para Deploy
```cmd
deploy-windows.bat
```

## 📱 URL Final
Após o deploy, seu site estará disponível em:
`https://foodcupons.vercel.app`
