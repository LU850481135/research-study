import Login from '@/pages/login'
import home from '@/pages/home'

export const initProps = [
  {
    path: '/',
    component: home,
    auth: true,
    icon: {
      type: 'table'
    },
    title: 'home'
  }]

export default [
  ...initProps,
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: home,
    auth: true
  }
]