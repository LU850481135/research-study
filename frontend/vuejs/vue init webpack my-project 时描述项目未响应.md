# vuejs初始化项目时报错解决方案

## vue init webpack my-project 时，未响应

```
// 命令行
? project name my-project
? project description (A Vue.js project)

```

在网上百度了下解决方案，都说是node版本太高引起的。但事实却不是这样

# 解决方案

根据vue2.0官网重新执行以下操作

```
npm install --global vue-cli
vue init webpack my-project
cd my-projec
npm install
npm run dev

```



