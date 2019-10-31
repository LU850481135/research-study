# VUE 利用 webpack 给生产环境和测试环境配置不同的接口地址
1. 在config/dev.env.js 以及 config/prod.env.js文件进行相应的配置

```javascript
// config/dev.env.js
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"https://test.data.com/"',
})

// config/prod.env.js
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"https://data.com/"',
}
```
**正确的写法**
```API_URL: '"https://data.com/"'```
**错误的写法**
```API_URL: "https://data.com/"```
**使用**
```process.env.API_URL```

