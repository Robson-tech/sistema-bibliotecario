<!-- client/src/views/LivroForm.vue -->
<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <router-link
        to="/dashboard"
        class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 mb-4"
      >
        <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Voltar para Dashboard
      </router-link>
      
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        {{ isEditing ? 'Editar Livro' : 'Novo Livro' }}
      </h1>
      <p class="text-gray-600">
        {{ isEditing ? 'Atualize as informações do livro' : 'Adicione um novo livro à sua coleção' }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loadingLivro" class="flex justify-center items-center py-12">
      <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="ml-2 text-gray-600">Carregando livro...</span>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <div class="bg-white shadow rounded-lg p-6">
        <div class="grid grid-cols-1 gap-6">
          <!-- Título -->
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-2">
              Título do Livro *
            </label>
            <input
              id="titulo"
              v-model="form.titulo"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.titulo }"
              placeholder="Ex: Dom Casmurro"
            />
            <p v-if="errors.titulo" class="mt-1 text-sm text-red-600">{{ errors.titulo }}</p>
          </div>

          <!-- Autor Principal -->
          <div>
            <label for="autor_principal" class="block text-sm font-medium text-gray-700 mb-2">
              Autor Principal *
            </label>
            <input
              id="autor_principal"
              v-model="form.autor_principal"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': errors.autor_principal }"
              placeholder="Ex: Machado de Assis"
            />
            <p v-if="errors.autor_principal" class="mt-1 text-sm text-red-600">{{ errors.autor_principal }}</p>
          </div>

          <!-- Grid para Páginas e Ano -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Quantidade de Páginas -->
            <div>
              <label for="quantidade_paginas" class="block text-sm font-medium text-gray-700 mb-2">
                Quantidade de Páginas *
              </label>
              <input
                id="quantidade_paginas"
                v-model.number="form.quantidade_paginas"
                type="number"
                min="1"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors.quantidade_paginas }"
                placeholder="Ex: 208"
              />
              <p v-if="errors.quantidade_paginas" class="mt-1 text-sm text-red-600">{{ errors.quantidade_paginas }}</p>
            </div>

            <!-- Ano de Publicação -->
            <div>
              <label for="ano_publicacao" class="block text-sm font-medium text-gray-700 mb-2">
                Ano de Publicação *
              </label>
              <input
                id="ano_publicacao"
                v-model.number="form.ano_publicacao"
                type="number"
                :min="1"
                :max="currentYear"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors.ano_publicacao }"
                placeholder="Ex: 1899"
              />
              <p v-if="errors.ano_publicacao" class="mt-1 text-sm text-red-600">{{ errors.ano_publicacao }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="ml-3 text-sm text-red-600">{{ errorMessage }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4">
        <router-link
          to="/dashboard"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </router-link>
        
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isEditing ? 'Atualizando...' : 'Salvando...' }}
          </span>
          <span v-else>
            {{ isEditing ? 'Atualizar Livro' : 'Salvar Livro' }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { livrosService } from '../services/livrosService'

export default {
  name: 'LivroForm',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    
    const form = reactive({
      titulo: '',
      autor_principal: '',
      quantidade_paginas: null,
      ano_publicacao: null
    })

    const errors = reactive({
      titulo: '',
      autor_principal: '',
      quantidade_paginas: '',
      ano_publicacao: ''
    })

    const loading = ref(false)
    const loadingLivro = ref(false)
    const errorMessage = ref('')
    
    const currentYear = new Date().getFullYear()
    const isEditing = computed(() => !!props.id || !!route.params.id)
    const livroId = computed(() => props.id || route.params.id)

    const resetErrors = () => {
      errors.titulo = ''
      errors.autor_principal = ''
      errors.quantidade_paginas = ''
      errors.ano_publicacao = ''
      errorMessage.value = ''
    }

    const validateForm = () => {
      resetErrors()
      
      const validation = livrosService.validateLivro(form)
      
      if (!validation.isValid) {
        Object.assign(errors, validation.errors)
        return false
      }
      
      return true
    }

    const loadLivro = async () => {
      if (!isEditing.value) return

      try {
        loadingLivro.value = true
        const livro = await livrosService.getLivroById(livroId.value)
        
        form.titulo = livro.titulo
        form.autor_principal = livro.autor_principal
        form.quantidade_paginas = livro.quantidade_paginas
        form.ano_publicacao = livro.ano_publicacao
      } catch (error) {
        errorMessage.value = error.message
        if (error.message.includes('não encontrado')) {
          router.push('/dashboard')
        }
      } finally {
        loadingLivro.value = false
      }
    }

    const handleSubmit = async () => {
      if (!validateForm()) return

      loading.value = true

      try {
        const livroData = {
          titulo: form.titulo.trim(),
          autor_principal: form.autor_principal.trim(),
          quantidade_paginas: parseInt(form.quantidade_paginas),
          ano_publicacao: parseInt(form.ano_publicacao)
        }

        if (isEditing.value) {
          await livrosService.updateLivro(livroId.value, livroData)
          if (window.showNotification) {
            window.showNotification('Livro atualizado com sucesso!', 'success')
          }
        } else {
          await livrosService.createLivro(livroData)
          if (window.showNotification) {
            window.showNotification('Livro criado com sucesso!', 'success')
          }
        }

        router.push('/dashboard')
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadLivro()
    })

    return {
      form,
      errors,
      loading,
      loadingLivro,
      errorMessage,
      currentYear,
      isEditing,
      handleSubmit
    }
  }
}
</script>