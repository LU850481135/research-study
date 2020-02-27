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

// import React, { useState } from 'react'

// function Home () {
//   const [ count, setCount ] = useState(0)

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(0)}>Reset</button>
//       <button onClick={() => setCount(count + 1)}>+</button>
//       <button onClick={() => setCount(count - 1)}>-</button>
//       <button onClick={() => {
//         setCount(count + 1)
//         setCount(count + 1)
//       }}>测试能否连续更新两次</button>
//     </div>
//   )
// }

// export default Home

// // 优化：延迟初始化
// import React, { useReducer } from 'react'

// function init(initialCount) {
//     return {count: initialCount}
//   }
  
// function reducer(state, action) {
//     switch (action.type) {
//         case 'increment':
//             return {count: state.count + 1}
//         case 'decrement':
//             return {count: state.count - 1}
//         case 'reset':
//             return init(action.payload)
//         default:
//             throw new Error()
//     }
// }

// function Home ({initialCount = 0}) {
//     const [state, dispatch] = useReducer(reducer, initialCount, init)
//     return (
//         <div>
//             Count: {state.count}
//             <br />
//             <button
//                 onClick={() => dispatch({type: 'reset', payload: initialCount})}>
//                 Reset
//             </button>
//             <button onClick={() => dispatch({type: 'increment'})}>+</button>
//             <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//         </div>
//     )
// }

// export default Home