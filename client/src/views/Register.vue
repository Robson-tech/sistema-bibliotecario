<!-- client/src/views/Register.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          📚 Sistema de Livros
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Crie sua conta
        </p>
      </div>
      
      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.email }"
              placeholder="seu@email.com"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Mínimo 6 caracteres"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.confirmPassword }"
              placeholder="Confirme sua senha"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="text-green-600 text-sm text-center">
          {{ successMessage }}
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
            {{ loading ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Já tem uma conta?
            <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Faça login aqui
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
  name: 'Register',
  setup() {
    const router = useRouter()
    
    const form = reactive({
      email: '',
      password: '',
      confirmPassword: ''
    })

    const errors = reactive({
      email: '',
      password: '',
      confirmPassword: ''
    })

    const errorMessage = ref('')
    const successMessage = ref('')
    const loading = ref(false)

    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      errors.email = ''
      errors.password = ''
      errors.confirmPassword = ''
      errorMessage.value = ''
      successMessage.value = ''

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

      // Validar confirmação de senha
      if (!form.confirmPassword) {
        errors.confirmPassword = 'Confirmação de senha é obrigatória'
        isValid = false
      } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Senhas não coincidem'
        isValid = false
      }

      return isValid
    }

    const handleRegister = async () => {
      if (!validateForm()) return

      loading.value = true
      
      try {
        await authService.register(form.email, form.password, form.confirmPassword)
        
        successMessage.value = 'Conta criada com sucesso! Verifique seu email e faça login.'
        
        // Limpar formulário
        form.email = ''
        form.password = ''
        form.confirmPassword = ''
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      errorMessage,
      successMessage,
      loading,
      handleRegister
    }
  }
}
</script>