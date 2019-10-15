# 移动端开发

## 多页面应用特点
```页面跳转,返回html```
```优点:```**首屏时间快，搜索引擎效果好**
```缺点:```**页面切换慢**

## 单页面应用特点(vue)
```页面跳转,js渲染```
```优点:```**页面切换快**
```缺点:```**首屏时间稍慢，搜索引擎(SEO)优化效果差**

```服务器端渲染可以完美的解决单页面所遇到的问题```

## Viewport 基础
- width          **控制 viewport 的大小, device-width为设备的宽度**
- initial-scale  **初始的缩放比例**
- minimum-scale  **允许用户缩放到的最小比例**
- maximum-scale  **允许用户缩放到的最大比例**
- user-scalable  **用户是否可以手动缩放**
```js
<meta
    name="viewport"
    content="
    width=device-width,
    initial-scale=1.0,
    user-scalable=1.0,
    minimum-scale=1.0,
    maximum-scale=1.0"
>
```

## 移动端300ms延迟

<p>移动端浏览器click事件为什么会有300ms的延迟呢？因为在手机上有个双击方案: 在手机上快速点击两下，实现页面放大；再次双击，恢复到原始比例</p>
<p>那它是如何实现的呢？浏览器在捕捉到第一次点击事件后，会等待一段时间，如果在这段时间内，用户没有再次进行点击操作的话，就执行单击事件；如果用户进行了第二次点击操作的话，就会执行双击事件。这段等待的时间大约300ms</p>

```如何解决这个延迟呢？```
- ```<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,minimum-scale=1, user-scalable=no">```

- 引入第三方库```fastclick```
  1. ```npm install fastclick --save```
  2. 在入口文件引入 ```import FastClick from 'fastclick'```
  3. ```FastClick.attach(document.body)```

## 1px像素问题

```https://juejin.im/post/5c790669e51d453eec65a952#heading-3```

npm install stylus --save
npm install stylus-loader --save
## keep-alive
```js
<keep-alive  exclude="uRankQuestionCategories">
  <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive" />
</keep-alive>
{
  path: '/urank/:type/question_categories/:category_id',
  name: 'uRankQuestionCategories',
  component: uRankQuestionCategories,
  meta: {
    title: '问卷调查',
    keepAlive: false
  }
}
```

**单页面跳转解决路由不刷新问题**
```js
computed: {
  time () {
    return this.$route.name != undefined ? this.$route.name+new Date().getTime() : new Date().getTime()
  }
}
```

**在css引入css文件**
```@import '../../assets/styles/common.scss';```
等效于
```@import '~@/assets/styles/common.scss';```

**在js中引入css文件**
```import '../../assets/styles/common.scss';```
等效于
```import '@/assets/styles/common.scss';```

还可以在```webpack.base.conf.js```进行配置
```'styles': resolve('src/assets/styles')```
```
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'styles': resolve('src/assets/styles')
    }
  },
```
使用
1. 在css中引入文件
```@import '~styles/common.scss'```
2. 在js中引入文件
```@import 'styles/common.scss```
