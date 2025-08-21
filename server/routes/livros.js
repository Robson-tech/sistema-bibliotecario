const express = require('express');
const supabase = require('../config/supabase');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('livros')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ livros: data });
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('livros')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.json({ livro: data });
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { titulo, autor_principal, quantidade_paginas, ano_publicacao } = req.body;

    if (!titulo || !autor_principal || !quantidade_paginas || !ano_publicacao) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (quantidade_paginas <= 0) {
      return res.status(400).json({ error: 'Quantidade de páginas deve ser maior que zero' });
    }

    if (ano_publicacao <= 0 || ano_publicacao > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Ano de publicação inválido' });
    }

    const novoLivro = {
      titulo: titulo.trim(),
      autor_principal: autor_principal.trim(),
      quantidade_paginas: parseInt(quantidade_paginas),
      ano_publicacao: parseInt(ano_publicacao),
      user_id: req.user.id
    };

    const { data, error } = await supabase
      .from('livros')
      .insert([novoLivro])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ 
      message: 'Livro criado com sucesso', 
      livro: data 
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor_principal, quantidade_paginas, ano_publicacao } = req.body;

    if (!titulo || !autor_principal || !quantidade_paginas || !ano_publicacao) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (quantidade_paginas <= 0) {
      return res.status(400).json({ error: 'Quantidade de páginas deve ser maior que zero' });
    }

    if (ano_publicacao <= 0 || ano_publicacao > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Ano de publicação inválido' });
    }

    const livroAtualizado = {
      titulo: titulo.trim(),
      autor_principal: autor_principal.trim(),
      quantidade_paginas: parseInt(quantidade_paginas),
      ano_publicacao: parseInt(ano_publicacao)
    };

    const { data, error } = await supabase
      .from('livros')
      .update(livroAtualizado)
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.json({ 
      message: 'Livro atualizado com sucesso', 
      livro: data 
    });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('livros')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;