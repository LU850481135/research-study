
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Storage from '@/utils/storage'
import Path from '@/utils/path'
import RouteConfigs from './routes'
import Login from '@/pages/login'
import {DefaultLayout} from '@/layout/index'
import { message } from 'antd'
import { isEmpty, last } from 'lodash'

function RouterGuard (props) {
    let queryParams = Path.getQuery(window.location.href)
    if (!isEmpty(queryParams)) {
      const pathToken = queryParams && queryParams['token']
      if (pathToken) {
        Storage.setItem('token', pathToken)
        delete queryParams.token

        window.location = Path.getQueryString(window.location.pathname, queryParams)
        return
      }
    }
    const isLogin = true
    const { location } = props
    const { pathname } = location
    let pathArray = pathname.split('')
    if (last(pathArray) === '/') {
      pathArray.splice(-1)
    }
    const newPathName = pathArray.join('')
    const targetRouterConfig = RouteConfigs.find((r) => r.path === newPathName )
    if ((!targetRouterConfig || !isLogin) && (newPathName !== '/login')) {
      if (newPathName !== '/') {
        message.error('无权限访问, 请登录')
      }
      return (
        <Redirect to='/login' />
      )
    }

    const { component: Component } = targetRouterConfig
    if (newPathName === '/login') {
      Storage.removeItem('token')
      return (
        <Route exact path='/login' component={Login} />
      )
    }

    if (isLogin) {
      return (
        <DefaultLayout component={Component} exact path={newPathName} {...props}></DefaultLayout>
      )
    }
}

export default RouterGuard
