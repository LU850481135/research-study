# React

## 安装
**前提条件:**  Node >= 8.10 和 npm >= 5.6
```js
npx create-react-app my-app
cd my-app
npm start
```

**受控组件与非受控组件的区别**
在React中，所谓受控组件和非受控组件，是针对表单而言的。区分： 是否受状态控制

**受控组件**
实例： 实现双向数据绑定

**非受控组件**
- 非受控组件即不受状态的控制，获取数据相当于操作DOM
- 非受控组件的好处是很容易和第三方组件结合

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

1. hook
2. vuex
3. redux

# React Hooks 使用详解
本文是对 16.8 版本之后 React 发布的新特性 Hooks 进行了详细讲解，并对一些常用的代码进行演示，希望可以对需要的朋友提供点帮助。

1. Hooks简介
Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

2. Hooks 初体验
```javascript
import React, { useState } from 'react'

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

export default Example
```
```useState```就是一个```Hook```，通过在函数组件里调用，并且可以通过修改 state 来重新渲染页面。

3. Hook API

- useState
  ```const [state, setState] = useState(initialState)```
  在初始渲染期间，state = initialState
  setState 函数用于更新 state 即```setState(newState)```
  **实例**
  ```javascript
  // useState 中的函数只会执行一次
  function App (props) {
    const [ count, setCount ] = useState(() => {
      return props.count || 0
    })

    return (
      <div>
        点击次数: { count } 
        <button onClick={() => { setCount(count + 1)}}>点我</button>
      </div>
      )
  }
  ```
  **不要在循环，条件或嵌套函数中调用 Hook**

- useEffect
  ```useEffect(() => { doSomething })```

  **实例**
  ```javascript
  // useState 中的函数只会执行一次
  function App () {
    const [ count, setCount ] = useState(0)

    useEffect(() => {
      document.title = count
    })

    return (
      <div>
        页面名称: { count } 
        <button onClick={() => { setCount(count + 1 )}}>点我</button>
      </div>
      )
  }
  ```
  **useEffect 的第二个参数**

  useEffect 的第二个参数，有三种情况
  1. 什么都不传，组件每次 render 之后 useEffect 都会调用，相当于 componentDidMount 和 componentDidUpdate
  2. 传入空数组[]， 只会调用一次，相当于 componentDidMount 和 componentWillUnmount
  3. 传入一个数组，其中包括变量，只有这些变量变动时，useEffect 才会执行

  ```javascript
  function App () {
    const [ count, setCount ] = useState(0)
    const [ width, setWidth ] = useState(document.body.clientWidth)

    const onChange = () => {
      setWidth(document.body.clientWidth)
    }

    useEffect(() => {
      // 相当于 componentDidMount
      console.log('add resize event')
      window.addEventListener('resize', onChange, false)

      return () => {
        // 相当于 componentWillUnmount
        window.removeEventListener('resize', onChange, false)
      }
    }, [])

    useEffect(() => {
      // 相当于 componentDidUpdate
      document.title = count
    })

    useEffect(() => {
      console.log(`count change: count is ${count}`)
    }, [ count ])

    return (
      <div>
        页面名称: { count } 
        页面宽度: { width }
        <button onClick={() => { setCount(count + 1)}}>点我</button>
      </div>
      )
  }
  ```

- useContext
  ```const value = useContext(MyContext)```
  ### React 中 Context 的使用
  **Context 提供了一种方式，能够让数据在组件树中传递时不必一级一级的手动传递**
  ```javascript
  import React, { createContext } form 'react'
  // 创建Context
  const ThemeContext = createContext()

  class App extends React.Component {
    state = {
      theme: 'red'
    }
    render () {
      const { theme } = this.state
      return (
        // 使用 Context.Provider传递value值 
        <ThemeContext.Provider value={theme}>
          {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
          <button onClick={() => {this.setState({ theme: 'yellow'})}}>切换</button>
          <Middle></Middle>
        </ThemeContext.Provider>
      )
    }
  }

  class Middle extends React.Component {
    render () {
      return (
        <Result></Result>
      )
    }
  }

  class Result extends React.Component {
    render () {
      return (
        // 使用 Context.consumer接受（消费）value 
        <ThemeContext.consumer>
          {
            theme => <h1>ThemeContext的主题为 {theme}</h1>
          }
        </ThemeContext.consumer>
      )
    }
  }

  export default App
  ```

  **注意：context 类似于全局变量做法，会让组件失去独立性、复用起来更困难，不能滥用、但本身它一定有适合使用的场景，具体看情况使用**

  ### contextType
  **contextType 可以简化 context 的使用，不使用 consumer 也可以共享变量**

  ```javascript
  import React, { createContext } from 'react'

  // 创建Context
  const ThemeContext = createContext()
  const SizeContext = createContext()


  class App extends React.Component {
    state = {
      theme: 'red',
      size: 'small'
    }
    render () {
      const { theme, size } = this.state
      return (
        // 使用 Context.Provider 包裹后续组件，value 指定值 
        <ThemeContext.Provider value={theme}>
          {/* 当出现多个Context的时候，只需要将Context.Provider 嵌套即可 */}
          <SizeContext.Provider value={size}>
            {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
            <button onClick={() => {this.setState({ theme: 'yellow', size: 'big'})}}>按钮</button>
            <Middle></Middle>
          </SizeContext.Provider>
        </ThemeContext.Provider>
      )
    }
  }

  class Bottom extends React.Component {
    // 申明静态变量、contextType 将 context 直接赋值于 contextType
    static contextType = ThemeContext
    
    render () {
      // 在 render 函数中 可以直接 访问 this.context 获取共享变量、这样就可以不使用 consumer
      const theme = this.context
      return (
        // Context.Consumer Consumer消费者使用Context得值
        // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
        // 当出现 多个Consumer的时候，进行嵌套，每个Consumer 的子组件必须是一个函数，即可
        <div>
          <h1>ThemeContext 的 值为 {theme} </h1>
        </div>
      )
    }
  }

  class Middle extends React.Component {
    render () {
      return <Bottom></Bottom>
    }
  }

  export default App;
  ```
  **注意**
  1. **contextType 只能在类组件中使用**
  2. **一个组件如果有多个 consumer ， contextType 只对其中一个有效，所以说，contextType 只能有一个**
  3. **context中的provider和consumer，在类组件以及函数组件中都可以使用。但是contextType只能在类组件中使用，因为它是类的静态属性。**

  ### useContext在函数组件中的应用

  ```javascript
  import React, { createContext, useContext, useState } from 'react'
  // 创建一个context
  const Context = createContext(0)
  // 1. consumer写法
  class Item1 extends PureComponent {
    render () {
      return (
        <Context.consumer>
          {
            count => (<div>{count}</div>)
          }
        </Context.consumer>
      )
    }
  }

  // 2. contextType写法
  class Item2 extends PureComponent {
    static contextType = Context
    render () {
      const count = this.context
      return (
        <div>{count}</div>
      )
    }
  }

  // 3. useContext写法
  function Item3 () {
    const count = useContext(Context)

    render() {
      return (
        <div>{count}</div>
      )
    }
  }

  function App() {
    const [ count, setCount ] = useState(0)

    render() {
      return (
        <div>
          点击次数: { count } 
          <div onClick={() => {setCount(count + 1)}}>点击</div>
          <Context.Provider value={count}>
            <Item1></Item1>
            <Item2></Item2>
            <Item3></Item3>
          </Context.Provider>
        </div>
      )
    }
  }
  export default App
  ```

  **consumer / contextType / useContext 对比学习**
  - consumer 嵌套复杂，consumer的第一个子节点必须是一个函数
  - contextType 只支持类组件的写法，且只能使用一次（不支持多个context）
  - useContext 不需要嵌套，写法简单


- useRef
  ### Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素(useRef())
  ```useRef()```

  ```javascript
  import React, { useRef } from 'react'
  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));

  const ref = React.useRef()
  <FancyButton ref={ref}>Click me!</FancyButton>;
  ```

  ```React.createRef()```
  ```React.forwardRef()```
  ```javascript
  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));

  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>;
  ```

  1. 通过调用 React.createRef() 创建了一个 React ref 并将其赋值给 ref 变量
  2. 通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>
  3. React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数
  4. 向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性
  5. 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点

  **React.forwardRef((props, ref) => (...)) ref参数只在使用 React.forwardRef 定义组件时存在**

- useReducer
```const [state, dispatch] = useReducer(reducer, initialArg, init)```
```reducer```接受类型为 (state, action) => newState，并返回与 dispatch 方法配对的当前状态
```initialArg```初始化元素
```useReducer```是```useState```的替代方案

```javascript
import React, { useReducer } from 'react'

function reducer (count, action) {
  switch (action.type) {
    case 'increment':
      return count + 1
    case 'decrement':
      return count - 1
    case 'reset':
      return 0
    default:
      throw new Error()
  }
}

function Home () {
  const [ count, setCount ] = useReducer(reducer, 0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount({type: 'reset'})}>Reset</button>
      <button onClick={() => setCount({type: 'increment'})}>+</button>
      <button onClick={() => setCount({type: 'decrement'})}>-</button>
    </div>
  )
}

export default Home
```
**惰性初始化**
```javascript
// 优化：延迟初始化
import React, { useReducer } from 'react'

function init(initialCount) {
    return {count: initialCount}
  }
  
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1}
        case 'decrement':
            return {count: state.count - 1}
        case 'reset':
            return init(action.payload)
        default:
            throw new Error()
    }
}

function Home ({initialCount = 0}) {
    const [state, dispatch] = useReducer(reducer, initialCount, init)
    return (
        <div>
            Count: {state.count}
            <br />
            <button
                onClick={() => dispatch({type: 'reset', payload: initialCount})}>
                Reset
            </button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </div>
    )
}

export default Home
```
**useReducer与useState的区别**
- 当 state 状态值结构比较复杂时，使用 useReducer 更有优势
- 使用 useState 获取的 setState 方法更新数据时是异步的, 而使用 useReducer 获取的 setState 方法更新数据是同步的

实例: 测试数据是否可以连续更新两次

**使用useState验证**
```javascript
import React, { useState } from 'react'

function Home () {
  const [ count, setCount ] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => {
        setCount(count + 1)
        setCount(count + 1)
      }}>测试能否连续更新两次</button>
    </div>
  )
}

export default Home
```
**结论: 点击 测试能否连续更新两次 按钮，会发现点击一次 count 还是只增加了 1. 由此可见，useState 确实是 异步 更新数据**

**使用useReducer验证**
```javascript
import React, { useReducer } from 'react'
import { injectIntl } from 'react-intl'

function reducer (count, action) {
  switch (action.type) {
    case 'increment':
      return count + 1
    case 'decrement':
      return count - 1
    case 'reset':
      return 0
    default:
      throw new Error()
  }
}

function Home () {
  const [ count, setCount ] = useReducer(reducer, 0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount({type: 'reset'})}>Reset</button>
      <button onClick={() => setCount({type: 'increment'})}>+</button>
      <button onClick={() => setCount({type: 'decrement'})}>-</button>
      <button onClick={() => {
        setCount({type: 'increment'})
        setCount({type: 'increment'})
      }}>测试能否连续更新两次</button>
    </div>
  )
}

export default injectIntl(Home)
```

**结论: 点击 测试能否连续更新两次 按钮，会发现点击一次 count 增加了 2. 由此可见，每次dispatch 一个action就会更新一次数据. useReducer 确实是 同步 更新数据**

## useMemo
