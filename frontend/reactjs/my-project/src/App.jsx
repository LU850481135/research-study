import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RouterGuard from '@/router/index'

import '@/styles/index.scss'

function App(props) {
  let [collapsed, toggle] = useState(true);
  return (
    <Router className="App">
      <Switch>
        <RouterGuard
          intl={props.intl}
          toggleMethod={() => toggle(!collapsed)}
          toggleState={collapsed} />
      </Switch>
    </Router>
  )
}

export default injectIntl(App)
