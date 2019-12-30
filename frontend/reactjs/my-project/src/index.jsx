import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import zh from './locales/zh/index'
import { IntlProvider} from 'react-intl'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'
import '@/styles/index.scss'

moment.locale('zh-cn')

ReactDOM.render(
  <IntlProvider locale='zh' messages={zh}>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>
  </IntlProvider>, document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
