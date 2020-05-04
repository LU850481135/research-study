import Login from '@/pages/login'
import Home from '@/pages/home'
import * as common from '@/constants/common'

export default [
  {
    path: common.LOGIN,
    component: Login,
    title: '登录',
    pathMatch: /\/login$/
  },
  {
    path: '/home',
    component: Home,
    title: '主页',
    pathMatch: /\/home$/
  },
]