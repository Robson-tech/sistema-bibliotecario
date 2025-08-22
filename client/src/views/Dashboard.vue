<!-- client/src/views/Dashboard.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Meus Livros</h1>
      <p class="text-gray-600">Gerencie sua coleção de livros</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total de Livros</dt>
                <dd class="text-lg font-medium text-gray-900">{{ totalLivros }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total de Páginas</dt>
                <dd class="text-lg font-medium text-gray-900">{{ totalPaginas.toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Autores Únicos</dt>
                <dd class="text-lg font-medium text-gray-900">{{ autoresUnicos }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 4.5V12m0-4.5h8m0 0V3a4 4 0 118 0v4m0 0v8m0 0H8m8 0v4a4 4 0 01-8 0v-4" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Média de Páginas</dt>
                <dd class="text-lg font-medium text-gray-900">{{ mediaPaginas }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <div class="flex-1 max-w-lg">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por título, autor ou ano..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              @click="searchQuery = ''"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <!-- Filtro por ordenação -->
        <select
          v-model="sortBy"
          class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="created_at_desc">Mais recentes</option>
          <option value="created_at_asc">Mais antigos</option>
          <option value="titulo_asc">Título (A-Z)</option>
          <option value="titulo_desc">Título (Z-A)</option>
          <option value="autor_asc">Autor (A-Z)</option>
          <option value="autor_desc">Autor (Z-A)</option>
          <option value="ano_desc">Ano (decrescente)</option>
          <option value="ano_asc">Ano (crescente)</option>
          <option value="paginas_desc">Mais páginas</option>
          <option value="paginas_asc">Menos páginas</option>
        </select>

        <router-link
          to="/livro/novo"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
        >
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Livro
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Carregando sua biblioteca...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredLivros.length === 0 && !loading" class="text-center py-16">
      <div class="mx-auto h-24 w-24 text-gray-400 mb-6">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      
      <h3 class="text-xl font-medium text-gray-900 mb-2">
        {{ searchQuery ? 'Nenhum livro encontrado' : 'Sua biblioteca está vazia' }}
      </h3>
      
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        {{ searchQuery 
          ? `Não encontramos livros com "${searchQuery}". Tente buscar por outros termos.` 
          : 'Que tal começar adicionando seu primeiro livro à sua biblioteca pessoal?' 
        }}
      </p>
      
      <div class="space-y-3">
        <router-link
          v-if="!searchQuery"
          to="/livro/novo"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm"
        >
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Adicionar Primeiro Livro
        </router-link>
        
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Limpar Busca
        </button>
      </div>
    </div>

    <!-- Livros Grid -->
    <div v-else>
      <!-- Resultado da busca -->
      <div v-if="searchQuery" class="mb-4">
        <p class="text-sm text-gray-600">
          Encontrados <strong>{{ filteredLivros.length }}</strong> 
          {{ filteredLivros.length === 1 ? 'livro' : 'livros' }} 
          para "<strong>{{ searchQuery }}</strong>"
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="livro in filteredLivros"
          :key="livro.id"
          class="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200 border border-gray-200"
        >
          <div class="p-6">
            <!-- Título e Autor -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2" :title="livro.titulo">
                {{ livro.titulo }}
              </h3>
              <p class="text-sm text-gray-600 mb-1">
                <span class="font-medium">por</span> {{ livro.autor_principal }}
              </p>
            </div>
            
            <!-- Informações do livro -->
            <div class="space-y-2 mb-6">
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ livro.quantidade_paginas.toLocaleString() }} páginas
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 4.5V12m0-4.5h8m0 0V3a4 4 0 118 0v4m0 0v8m0 0H8m8 0v4a4 4 0 01-8 0v-4" />
                </svg>
                Publicado em {{ livro.ano_publicacao }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ formatDate(livro.created_at) }}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
              <router-link
                :to="`/livro/${livro.id}/editar`"
                class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </router-link>
              <button
                @click="confirmDelete(livro)"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      @click="closeDeleteModal"
    >
      <div
        class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto"
        @click.stop
      >
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.966-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h3 class="text-lg font-medium text-gray-900 text-center mb-2">Confirmar Exclusão</h3>
          
          <p class="text-sm text-gray-500 text-center mb-6">
            Tem certeza que deseja excluir o livro 
            <span class="font-semibold text-gray-900">"{{ livroParaExcluir?.titulo }}"</span>?
            <br>
            <span class="text-red-600">Esta ação não pode ser desfeita.</span>
          </p>
          
          <div class="flex space-x-3">
            <button
              @click="closeDeleteModal"
              class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="deleteLivro"
              :disabled="deleting"
              class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="deleting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Excluindo...
              </span>
              <span v-else>Excluir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { livrosService } from '../services/livrosService'

export default {
  name: 'Dashboard',
  setup() {
    const livros = ref([])
    const loading = ref(true)
    const searchQuery = ref('')
    const sortBy = ref('created_at_desc')
    const showDeleteModal = ref(false)
    const livroParaExcluir = ref(null)
    const deleting = ref(false)

    // Computed properties para estatísticas
    const totalLivros = computed(() => livros.value.length)
    const totalPaginas = computed(() => 
      livros.value.reduce((sum, livro) => sum + livro.quantidade_paginas, 0)
    )
    const autoresUnicos = computed(() => 
      new Set(livros.value.map(livro => livro.autor_principal)).size
    )
    const mediaPaginas = computed(() => 
      totalLivros.value > 0 
        ? Math.round(totalPaginas.value / totalLivros.value)
        : 0
    )

    // Computed para filtrar e ordenar livros
    const filteredLivros = computed(() => {
      let result = [...livros.value]
      
      // Aplicar filtro de busca
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(livro => 
          livro.titulo.toLowerCase().includes(query) ||
          livro.autor_principal.toLowerCase().includes(query) ||
          livro.ano_publicacao.toString().includes(query)
        )
      }
      
      // Aplicar ordenação
      result.sort((a, b) => {
        switch (sortBy.value) {
          case 'created_at_desc':
            return new Date(b.created_at) - new Date(a.created_at)
          case 'created_at_asc':
            return new Date(a.created_at) - new Date(b.created_at)
          case 'titulo_asc':
            return a.titulo.localeCompare(b.titulo)
          case 'titulo_desc':
            return b.titulo.localeCompare(a.titulo)
          case 'autor_asc':
            return a.autor_principal.localeCompare(b.autor_principal)
          case 'autor_desc':
            return b.autor_principal.localeCompare(a.autor_principal)
          case 'ano_desc':
            return b.ano_publicacao - a.ano_publicacao
          case 'ano_asc':
            return a.ano_publicacao - b.ano_publicacao
          case 'paginas_desc':
            return b.quantidade_paginas - a.quantidade_paginas
          case 'paginas_asc':
            return a.quantidade_paginas - b.quantidade_paginas
          default:
            return 0
        }
      })
      
      return result
    })

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }

    const loadLivros = async () => {
      try {
        loading.value = true
        livros.value = await livrosService.getAllLivros()
      } catch (error) {
        if (window.showNotification) {
          window.showNotification(error.message, 'error')
        }
        console.error('Erro ao carregar livros:', error)
      } finally {
        loading.value = false
      }
    }

    const confirmDelete = (livro) => {
      livroParaExcluir.value = livro
      showDeleteModal.value = true
    }

    const closeDeleteModal = () => {
      showDeleteModal.value = false
      livroParaExcluir.value = null
    }

    const deleteLivro = async () => {
      if (!livroParaExcluir.value) return

      try {
        deleting.value = true
        await livrosService.deleteLivro(livroParaExcluir.value.id)
        
        // Remover da lista local
        livros.value = livros.value.filter(livro => livro.id !== livroParaExcluir.value.id)
        
        if (window.showNotification) {
          window.showNotification('Livro excluído com sucesso!', 'success')
        }
        
        closeDeleteModal()
      } catch (error) {
        if (window.showNotification) {
          window.showNotification(error.message, 'error')
        }
        console.error('Erro ao excluir livro:', error)
      } finally {
        deleting.value = false
      }
    }

    onMounted(() => {
      loadLivros()
    })

    return {
      livros,
      loading,
      searchQuery,
      sortBy,
      filteredLivros,
      totalLivros,
      totalPaginas,
      autoresUnicos,
      mediaPaginas,
      showDeleteModal,
      livroParaExcluir,
      deleting,
      confirmDelete,
      closeDeleteModal,
      deleteLivro,
      formatDate
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>