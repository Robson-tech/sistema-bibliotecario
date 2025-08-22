// client/src/services/authService.js
import { ref } from 'vue'
import axios from 'axios'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export const isAuthenticated = ref(!!localStorage.getItem('token'))
export const currentUser = ref(JSON.parse(localStorage.getItem('user') || 'null'))

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token')
    // this.user = JSON.parse(localStorage.getItem('user') || 'null')
    
    // Configurar interceptor do axios para incluir token
    axios.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`
      }
      return config
    })

    // Interceptor para tratar erros de autenticação
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout()
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${VITE_API_BASE_URL}/auth/login`, {
        email,
        password
      })

      const { user, session } = response.data
      
      this.token = session.access_token
      // this.user = user
      isAuthenticated.value = true
      currentUser.value = user
      
      localStorage.setItem('token', this.token)
      localStorage.setItem('user', JSON.stringify(user))

      return { success: true, user }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao fazer login')
    }
  }

  async register(email, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error('Senhas não coincidem')
    }

    try {
      const response = await axios.post(`${VITE_API_BASE_URL}/auth/register`, {
        email,
        password
      })

      return { success: true, message: 'Conta criada com sucesso!' }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Erro ao criar conta')
    }
  }

  async logout() {
    try {
      if (this.token) {
        await axios.post(`${VITE_API_BASE_URL}/auth/logout`)
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      this.token = null
      // this.user = null
      currentUser.value = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  isAuthenticated() {
    return !!this.token && !!currentUser
  }

  // getCurrentUser() {
  //   return this.user
  // }

  getToken() {
    return this.token
  }
}

export const authService = new AuthService()