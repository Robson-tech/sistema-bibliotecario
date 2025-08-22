// client/src/services/livrosService.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

class LivrosService {
  async getAllLivros() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/livros`)
      return response.data.livros
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar livros')
    }
  }

  async getLivroById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/livros/${id}`)
      return response.data.livro
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar livro')
    }
  }

  async createLivro(livroData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/livros`, livroData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar livro')
    }
  }

  async updateLivro(id, livroData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/livros/${id}`, livroData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar livro')
    }
  }

  async deleteLivro(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/livros/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao deletar livro')
    }
  }

  // Validações do lado cliente
  validateLivro(livro) {
    const errors = {}

    if (!livro.titulo?.trim()) {
      errors.titulo = 'Título é obrigatório'
    }

    if (!livro.autor_principal?.trim()) {
      errors.autor_principal = 'Autor principal é obrigatório'
    }

    if (!livro.quantidade_paginas || livro.quantidade_paginas <= 0) {
      errors.quantidade_paginas = 'Quantidade de páginas deve ser maior que zero'
    }

    if (!livro.ano_publicacao || livro.ano_publicacao <= 0 || livro.ano_publicacao > new Date().getFullYear()) {
      errors.ano_publicacao = 'Ano de publicação inválido'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}

export const livrosService = new LivrosService()