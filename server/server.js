const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const livrosRoutes = require('./routes/livros');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/api/livros', livrosRoutes);

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ message: 'Servidor funcionando!', timestamp: new Date().toISOString() });
});

// Tratamento de rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento global de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});