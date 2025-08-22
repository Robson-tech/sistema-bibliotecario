<!-- client/src/App.vue -->
<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav v-if="userEmail" class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="text-xl font-bold text-indigo-600">
              📚 Sistema de Livros
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ userEmail }}</span>
            <button 
              @click="logout"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1">
      <router-view />
    </main>

    <!-- Toast de notificações -->
    <div
      v-if="notification.show"
      :class="[
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300',
        notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { authService, isAuthenticated, currentUser } from './services/authService'

export default {
  name: 'App',
  setup() {
    const router = useRouter()
    
    const notification = reactive({
      show: false,
      message: '',
      type: 'success'
    })

    // const user = computed(() => authService.getCurrentUser())
    // const isAuthenticated = computed(() => authService.isAuthenticated())
    const userEmail = computed(() => currentUser.value?.email || '')

    const logout = async () => {
      try {
        await authService.logout()
        showNotification('Logout realizado com sucesso!', 'success')
        
        // Use nextTick para garantir que a DOM foi atualizada
        nextTick(() => {
          router.push('/login')
        })
      } catch (error) {
        showNotification('Erro ao fazer logout', 'error')
      }
    }

    const showNotification = (message, type = 'success') => {
      notification.message = message
      notification.type = type
      notification.show = true
      
      setTimeout(() => {
        notification.show = false
      }, 4000)
    }

    // Verificar autenticação ao iniciar
    onMounted(() => {
      if (!isAuthenticated.value && router.currentRoute.value.path !== '/login' && router.currentRoute.value.path !== '/register') {
        router.push('/login')
      }
    })

    // Expor função globalmente para uso em outros componentes
    window.showNotification = showNotification

    return {
      // isAuthenticated,
      userEmail,
      logout,
      notification,
      showNotification
    }
  }
}
</script>