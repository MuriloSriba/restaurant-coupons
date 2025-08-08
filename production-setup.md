# Guia de Deploy Completo - FoodCupons

## 📋 Resumo do Projeto
- **Frontend**: HTML/CSS/JavaScript estático
- **Backend**: Node.js/Express com PostgreSQL
- **Banco**: PostgreSQL configurado via `DATABASE_URL`
- **Deploy**: Vercel (serverless)

## 🚀 Opções de Deploy

### Opção 1: Deploy na Vercel (RECOMENDADO)

#### Pré-requisitos:
1. Conta na [Vercel](https://vercel.com)
2. Node.js instalado
3. Git instalado

#### Passos Rápidos:
```bash
# 1. Clone ou prepare o projeto
cd restaurant-coupons

# 2. Torne o script executável
chmod +x deploy.sh

# 3. Execute o deploy
./deploy.sh
```

#### Manual via Vercel CLI:
```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

### Opção 2: Deploy Manual via Interface Web

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

### Endpoints da API:
- **Base**: `https://seu-dominio.vercel.app/api`
- **Auth**: `/api/auth/*`
- **Restaurantes**: `/api/restaurants/*`
- **Cupons**: `/api/coupons/*`
- **Pagamento**: `/api/payment/*`

## 📊 Monitoramento

### Logs:
- Vercel Dashboard → Functions → Logs
- Comando: `vercel logs --follow`

### Performance:
- Vercel Analytics (opcional)
- Google Analytics (já incluído)

## 🔄 Atualizações Futuras

### Para atualizar o site:
```bash
# Após fazer push para Git
git add .
git commit -m "Atualização"
git push origin main

# O deploy é automático via Git
```

### Para atualizar manualmente:
```bash
# Re-executar o deploy
./deploy.sh
```

## 🐛 Solução de Problemas

### Erro comum: "Cannot find module"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro com Banco de Dados no Vercel:
- Certifique-se de que a variável de ambiente `DATABASE_URL` está configurada corretamente no Vercel com a string de conexão do seu banco de dados PostgreSQL.

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste localmente: `npm run dev` no backend
3. Confira as variáveis de ambiente

## ✅ Checklist Final

- [ ] Backend está funcionando localmente
- [ ] Banco de dados está populado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Teste de endpoints da API
- [ ] Teste de funcionalidades do frontend
- [ ] SSL ativado (automático na Vercel)
- [ ] Domínio personalizado (opcional)

## 🎯 Comando Único para Deploy

Execute tudo de uma vez:
```bash
# Linux/Mac
chmod +x deploy.sh && ./deploy.sh

# Windows (Git Bash)
bash deploy.sh

# Ou manual:
vercel --prod
```

## 📱 URL Final
Após o deploy, seu site estará disponível em:
`https://foodcupons.vercel.app`
