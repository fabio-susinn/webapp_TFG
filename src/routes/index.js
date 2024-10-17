import { createMemoryHistory, createRouter } from 'vue-router'

import LogInView from '@/components/LogInView.vue'
import FormView from '@/components/FormView.vue'
import HomeView from '@/components/HomeView.vue'
import SignUpView from '@/components/SignUpView.vue'  
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/login', component: LogInView },
  { path: '/signup', component: SignUpView },
  {
    path: '/studworkload-form',
    component: FormView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  /* Check for a user in my store, or fallback to Firebase auth() user */
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      alert('You must be logged in before using this feature!!')
      next('/login')
    }
  } else {
    next()
  }
})

export { router }
