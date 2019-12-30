
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Storage from '@/utils/storage'
import Path from '@/utils/path'
import RouteConfigs from './routes'
import Login from '@/pages/login'
import { message } from 'antd'
import { isEmpty, last } from 'lodash'
import { injectIntl } from 'react-intl'
import * as common from '@/constants/common'

function RouterGuard (props) {
  const isLogin = true
  const { location, intl } = props
  const { pathname } = location
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
  let pathArray = pathname.split('')
  if (last(pathArray) === common.SLASH) {
    pathArray.splice(-1)
  }
  const newPathName = pathArray.join('')
  const targetRouterConfig = RouteConfigs.find((r) => r.path === newPathName || r.pathMatch.test(newPathName) )
  if ((!targetRouterConfig || !isLogin) && (newPathName !== common.LOGIN)) {
    if (newPathName !== common.SLASH && newPathName !== '') {
      message.error(intl.formatMessage({id: 'error.no_permission'}))
    }
    return (
      <Redirect to={common.LOGIN} />
    )
  }

  const { component: Component, title, path } = targetRouterConfig

  const setTitle = (title) => {
    document.title = title ? title : props.location.state && props.location.state.title ? props.location.state.title : ''
  }

  if (newPathName === common.LOGIN) {
    Storage.removeItem('token')
    Storage.removeItem('currentUser')
    return (
      <Route
        exact
        path={common.LOGIN}
        component={Login}
        onEnter={setTitle(title)}
      />
    )
  }

  if (isLogin) {
    return (
      <Route 
        exact
        path={path}
        component={Component}
        onEnter={setTitle(title)}
      />
    )
  }
}

export default injectIntl(RouterGuard)
