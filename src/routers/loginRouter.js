import Login from '../components/Login.vue'
import NoFind from '../components/NoFind.vue'

export const loginRouter = [
  {
    path: '*',
    name: '/404',
    component: NoFind
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: Login
  }
]
