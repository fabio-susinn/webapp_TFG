import { createMemoryHistory, createRouter } from 'vue-router'

import LogInView from '@/components/LogInView.vue'
import FormView from '@/components/FormView.vue'
import HomeView from '@/components/HomeView.vue'
import SignUpView from '@/components/SignUpView.vue'

const routes = [
  { path: '/login', component: LogInView },
  { path: '/signup', component: SignUpView},
  { path: '/studworkload-form', component: FormView },
  { path: '/home', component: HomeView },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export { router }
