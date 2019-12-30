import Login from '@/pages/login'
import * as common from '@/constants/common'

export default [
  {
    path: common.LOGIN,
    component: Login,
    title: '登录',
    pathMatch: /\/login$/
  }
]