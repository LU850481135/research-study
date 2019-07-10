# vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
```js
new Vue({
  // state - 初始化数据
  data () {
    return {
      count: 0
    }
  },
  // view - 模板
  template: `
    <div>{{ count }}</div>
  `,
  // actions - 操作
  methods: {
    increment () {
      this.count++
    }
  }
})
```

- state - 初始化数据
- getter - 计算属性
- mutation - 变更状态
  更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  - Payload - 向 store.commit 传入额外的参数
  - 同步事务
- action - Action 类似于 mutation，不同在于:
  - Action 提交的是 mutation，而不是直接变更状态
  - Action 可以包含任意异步操作