import React, { useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RouterGuard from '@/router/index'

import '@/styles/index.scss'

function App() {
  let [collapsed, toggle] = useState(true);

  return (
    <Router className="App">
      <Switch>
        <RouterGuard toggleMethod={() => toggle(!collapsed)} toggleState={collapsed} />
      </Switch>
    </Router>
  )
}

export default App
