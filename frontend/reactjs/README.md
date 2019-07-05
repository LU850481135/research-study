# React

## 安装
**前提条件:**  Node >= 8.10 和 npm >= 5.6
```js
npx create-react-app my-app
cd my-app
npm start
```

## JSX 简介
```const element = <h1>Hello, world!</h1>;```
jsx是一个 JavaScript 的语法扩展

### state
State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件

componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行

componentWillUnmount()

使用 this.setState() 来时刻更新组件 state

### 正确地使用 State
- 不要直接修改 State
  ```js
  // Wrong
  this.state.comment = 'Hello';

  // Correct
  this.setState({comment: 'Hello'});
  ```

- State 的更新可能是异步的
  因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
- State 的更新会被合并

key 只是在兄弟节点之间必须唯一