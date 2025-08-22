// client/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../services/authService'

// Import das views
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import LivroForm from '../views/LivroForm.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/livro/novo',
    name: 'NovoLivro',
    component: LivroForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/livro/:id/editar',
    name: 'EditarLivro',
    component: LivroForm,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guards de rota
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  // Rotas que requerem autenticação
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  // Rotas que requerem usuário não autenticado (login, register)
  if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard')
    return
  }

  next()
})

export default router