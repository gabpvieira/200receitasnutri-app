# 200 Receitas Nutri App

Aplicação de área de membros para o produto "200 Receitas Nutricionais" com autenticação via Airtable.

## 🚀 Deploy na Vercel

### Pré-requisitos
1. Conta no GitHub
2. Conta na Vercel
3. Base do Airtable configurada

### Passos para Deploy

1. **Criar repositório no GitHub:**
   - Acesse [GitHub](https://github.com)
   - Clique em "New repository"
   - Nome: `200receitasnutri-app`
   - Deixe como público ou privado conforme preferência
   - NÃO inicialize com README (já temos um)
   - Clique em "Create repository"

2. **Conectar repositório local:**
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/200receitasnutri-app.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy na Vercel:**
   - Acesse [Vercel](https://vercel.com)
   - Clique em "Import Project"
   - Selecione o repositório `200receitasnutri-app`
   - Configure as variáveis de ambiente:
     - `AIRTABLE_ACCESS_TOKEN`: Seu token do Airtable
     - `AIRTABLE_BASE_ID`: ID da sua base do Airtable
     - `NODE_ENV`: production
   - Clique em "Deploy"

## 🔧 Configuração Local

1. Clone o repositório
2. Copie `.env.example` para `.env`
3. Configure suas credenciais do Airtable no `.env`
4. Execute:
   ```bash
   npm install
   npm run dev
   ```

## 📋 Funcionalidades

- ✅ Login com email (senha padrão: receitas123)
- ✅ Dashboard de membros
- ✅ Integração com Airtable
- ✅ Interface responsiva
- ✅ Pronto para deploy na Vercel

## 🛠️ Tecnologias

- React + TypeScript
- Vite
- Tailwind CSS
- Airtable API
- Express.js

## 📝 Estrutura do Projeto

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Tipos compartilhados
├── .env.example     # Exemplo de variáveis de ambiente
└── README.md        # Este arquivo
```

## 🔐 Segurança

- Arquivo `.env` está no `.gitignore`
- Use `.env.example` como referência
- Configure as variáveis de ambiente na Vercel