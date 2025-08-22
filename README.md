# sistema-bibliotecario

Sistema CRUD para gerenciamento de livros utilizando Vue 3 no frontend, Node.js/Express no backend e Supabase como banco de dados e autenticação.

## 📋 Funcionalidades

- **Autenticação**: Login com email e senha via Supabase
- **CRUD Completo de Livros**:
  - Criar novo livro
  - Listar todos os livros
  - Atualizar livro existente
  - Deletar livro
- **Validações**: Campos obrigatórios e formatos
- **Mensagens**: Feedback de sucesso/erro para o usuário
- **Interface Responsiva**: Design moderno e intuitivo

## 🛠️ Tecnologias

### Frontend
- **Vue 3** - Framework JavaScript reativo
- **Axios** - Cliente HTTP para consumir APIs
- **Vue Router** - Roteamento
- **Tailwind CSS** - Estilização

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Supabase** - Banco PostgreSQL + Autenticação
- **CORS** - Middleware para permitir requisições cross-origin

## 🗂️ Estrutura do Projeto

```
sistema-livros/
├── client/                 # Frontend Vue 3
│   ├── src/
│   │   ├── components/     # Componentes Vue
│   │   ├── views/          # Páginas/Views
│   │   ├── router/         # Configuração de rotas
│   │   ├── services/       # Serviços (API calls)
│   │   └── main.js         # Arquivo principal
│   ├── public/
│   ├── package.json
│   └── index.html
├── server/                 # Backend Node.js
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares
│   ├── config/             # Configurações
│   ├── server.js           # Arquivo principal do servidor
│   └── package.json
└── README.md
```

## ⚙️ Configuração do Supabase

### 1. Criar conta no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto

### 2. Configurar tabela de livros
Execute este SQL no editor do Supabase:

```sql
-- Criar tabela de livros
CREATE TABLE livros (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor_principal VARCHAR(255) NOT NULL,
  quantidade_paginas INTEGER NOT NULL CHECK (quantidade_paginas > 0),
  ano_publicacao INTEGER NOT NULL CHECK (ano_publicacao > 0),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE livros ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados
CREATE POLICY "Usuários podem gerenciar seus próprios livros" ON livros
  FOR ALL USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_livros_updated_at 
    BEFORE UPDATE ON livros 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### 3. Obter credenciais
No painel do Supabase, vá em Settings > API e copie:
- Project URL
- anon/public key

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- Conta no Supabase configurada

### 1. Clonar o repositório
```bash
git clone <seu-repositorio>
cd sistema-livros
```

### 2. Configurar Backend

```bash
cd server
npm install
```

Criar arquivo `.env`:
```env
PORT=3001
SUPABASE_URL=sua_supabase_url_aqui
SUPABASE_ANON_KEY=sua_supabase_anon_key_aqui
```

Iniciar servidor:
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

### 3. Configurar Frontend

```bash
cd ../client
npm install
```

Criar arquivo `.env`:
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_SUPABASE_URL=sua_supabase_url_aqui
VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key_aqui
```

Iniciar aplicação:
```bash
npm run dev
```

## 📡 API Endpoints

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de novo usuário
- `POST /auth/logout` - Logout

### Livros
- `GET /api/livros` - Listar todos os livros do usuário
- `GET /api/livros/:id` - Buscar livro por ID
- `POST /api/livros` - Criar novo livro
- `PUT /api/livros/:id` - Atualizar livro
- `DELETE /api/livros/:id` - Deletar livro

### Exemplo de requisição - Criar livro:
```json
POST /api/livros
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Dom Casmurro",
  "autor_principal": "Machado de Assis",
  "quantidade_paginas": 208,
  "ano_publicacao": 1899
}
```