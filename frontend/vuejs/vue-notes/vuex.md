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
  更改 Vuex 的 store 中的状态的唯一方法是显式地提交(commit) mutation
  - Payload - 向 store.commit 传入额外的参数
  - 同步事务
- action - Action 类似于 mutation，不同在于:
  - Action 提交的是 mutation，而不是直接变更状态
  - Action 可以包含任意异步操作

**展开运算符**
对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
**应用**
1. 合并数组
```js
// 相当于 [1, 2].concat(more)
[1, 2, ...more]
```
```js
arr1 = [1, 2, 3];
arr2 = [4];
arr3 = [5, 6];
// ES5
arr1.concat(arr2, arr3);
// ES6
[...arr1, ...arr2, ...arr3];
```
2. 与解构赋值结合
扩展运算符可以与解构赋值结合起来，用于生成数组
```js
let first = 1;
const second = [2, 3];
[first, ...second]; // [1, 2, 3]
first = "foo"
[first, ...second]; // ["foo", 2, 3]
```
3. 函数的返回值
JavaScript 的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象
4. 字符串
扩展运算符还可以将字符串转为真正的数组
```js
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```
5. 实现了 Iterator 接口的对象
任何 遍历器Iterator 接口的对象，都可以用扩展运算符转为真正的数组
```js
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```
上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 
6. 复制数组
```js
const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]

const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```
7. Map 和 Set 结构，Generator 函数
扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符
```js
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```
```Generator``` 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符
```js
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```
上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组
- mapState 辅助函数
- mapGetters 辅助函数
- mapMutations
- mapActions
