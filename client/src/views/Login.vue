<!-- client/src/views/Login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          📚 Sistema de Livros
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Faça login na sua conta
        </p>
      </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Email"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          
          <div>
            <label for="password" class="sr-only">Senha</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Senha"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Não tem uma conta?
            <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
              Cadastre-se aqui
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    
    const form = reactive({
      email: '',
      password: ''
    })

    const errors = reactive({
      email: '',
      password: ''
    })

    const errorMessage = ref('')
    const loading = ref(false)

    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      errors.email = ''
      errors.password = ''
      errorMessage.value = ''

      // Validar email
      if (!form.email) {
        errors.email = 'Email é obrigatório'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Email inválido'
        isValid = false
      }

      // Validar senha
      if (!form.password) {
        errors.password = 'Senha é obrigatória'
        isValid = false
      } else if (form.password.length < 6) {
        errors.password = 'Senha deve ter pelo menos 6 caracteres'
        isValid = false
      }

      return isValid
    }

    const handleLogin = async () => {
      if (!validateForm()) return

      loading.value = true
      
      try {
        await authService.login(form.email, form.password)
        
        // Mostrar notificação de sucesso
        if (window.showNotification) {
          window.showNotification('Login realizado com sucesso!', 'success')
        }
        
        router.push('/dashboard')
      } catch (error) {
        errorMessage.value = error.message
        console.log(error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      errorMessage,
      loading,
      handleLogin
    }
  }
}
</script>