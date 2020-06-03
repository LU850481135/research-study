## nrm
nrm 是一个 npm 源管理器

查看npm源地址
```npm config list```
### 安装
```npm install nrm -g --save```
### 使用
- 用nrm ls命令查看默认配置，带*号即为当前使用的配置
```nrm ls```
```
npm ---- https://registry.npmjs.org/
cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
nj ----- https://registry.nodejitsu.com/
rednpm - http://registry.mirror.cqupt.edu.cn/
npmMirror  https://skimdb.npmjs.com/registry/
edunpm - http://registry.enpmjs.org/
  ```
- 查看当前使用的是哪个源
```nrm current```
- 切换源
```nrm use cnpm```
- 增加源
```nrm add 别名  url```
- 删除源
```nrm del  别名```
- 测试速度
```nrm test 别名```

## 安装React Devtools调试工具

安装React Devtools调试工具的步骤：
1. 去git上下载react-devtools文件到本地，https://github.com/facebook/react-devtools
2. 用npm安装依赖
```
cd ~/Downloads/react-devtools-3
npm install
```
3. 安装依赖成功后，打包一份扩展程序
```npm run build:extension:chrome```
**打包完成之后，```~/Downloads/react-devtools-3/shells/chrome```文件夹中多了一个```build/```文件夹**
4. 打开chrome扩展程序chrome://extensions/,加载已解压的扩展程序，选择第3步中的生成的```build/unpacked```文件夹

# 前端基础知识整理

## 盒模型
1. 标准盒模型: ```box-sizing: content-box;```width = content的宽度
2. IE盒模型: ```box-sizing: border-box;```width = border + padding + content的宽度

## BFC
**块级格式化上下文**

## typeof 用于判断一个变量的类型
- 对于基本类型(null, undefined, number, string, boolean, symbol)，除null以外，都可以显示正确的类型
- 对于引用类型(function, array, object)，除函数外都显示object

```javascript
typeof undefined // undefined
typeof 11 // number
typeof 'test' // string
typeof true // boolean
typeof symbol() // symbol
typeof null // object
typeof [] // object
typeof {} // object
typeof console.log // function
```

## Object.prototype.toString.call() 可以正确的获取数据类型

## instanceof —— 判断对象类型

**实现原理：判断对象的__proto__是否与构造函数的prototype指向同一个引用**

```javascript
[] instanceof Array // true
```
```
f instanceof Foo 的判断逻辑
f的__proto__一层一层往上找，看能否找到Foo.prototype()
再试着判断f instanceof Object
```

```javascript
// 手动实现一个instanceof
function instanceof (left, right) {
  // 获取类型的原型
  let prototype = right.prototype
  // 获取对象的隐式原型
  let left = left.__proto__
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null) {
      return false
    }
    if (left === prototype) {
      return true
    }
    left = left.__proto__
  }
}
```

## 原型与原型链


## 闭包
定义: 函数A返回一个函数B，函数B中使用了函数A的变量，函数B就被称为闭包

**闭包解决问题**
解决了局部变量和全局变量的缺陷
反复使用局部变量，又避免了全局污染

**经典面试题**
```javascript
for (var i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
// 6 6 6 6 6 6
```

1. 通过闭包解决var定义函数问题
```javascript
for (var i = 0; i <= 5; i++) {
  (
    function (j) {
      setTimeout(() => {
        console.log(j)
      }, j * 1000)
    }
  )(i)
}
// 0 1 2 3 4 5
```
2. 通过setTimeout 第三个参数解决(第三个参数作为func()的参数传进去)
```javascript
for (var i = 0; i <= 5; i++) {
  setTimeout((i) => {
    console.log(i)
  }, i * 1000, i)
}
// 0 1 2 3 4 5
```
3. 通过let解决
```javascript
for (let i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000, i)
}
// 0 1 2 3 4 5
```

## 深浅拷贝
### 浅拷贝
**仅仅复制了引用，彼此之间的操作会互相影响**
1. Object.assign()
```javascript
let obj = {
  age: 16
}
let obj1 = Object.assign({}, obj)
obj.age = 24
console.log(obj1.age)
```
2. ...
```javascript
let obj = {
  age: 16
}
let obj1 = {...obj}
obj.age = 24
console.log(obj1.age)
```

**数组的浅拷贝**
3. Array.prototype.concat() - 合并两个或多个数组

4. Array.prototype.slice()

**通常浅拷贝就可以解决大部分问题，但当遇到如下情况就需要使用深拷贝**

```javascript
let obj = {
  age: 20,
  jobs: {
    first: 'Math'
  }
}
let obj1 = {...obj}
obj.jobs.first = 'native'
console.log(obj1.jobs.first) // native
```
浅拷贝只解决了第一层的问题，如果接下去的值还有对象时，则两者享有相同的引用。要解决这个问题，引入的深拷贝

### 深拷贝
**在堆中重新分配内存，不同的地址，相同的值，两者互不影响**
1. JSON.parse(JSON.stringify(object))
  JSON.stringify() - 将js对象序列化成json字符串
  JSON.parse() - 将json字符串反序列化成一个js对象
  有局限性：
    - 会忽略undefined
    - 会忽略symbol
    - 不能序列化函数
    - 不能解决循环引用的对象
2. 利用递归实现对象的深拷贝
 
```javascript
function deepClone (obj) {
  if (!obj && typeof obj !== 'object') return obj
  const targetObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    // 对对象的自有属性进行拷贝
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        targetObj[key] = deepClone(obj[key])
      } else {
        targetObj[key] = obj[key]
      }
    }
  }
  return targetObj
}
```

3. 推荐使用lodash 的深拷贝函数

## 模块化
1. ES6模块化
 - export - 定义
 - import - 引入
2. CommonJS
 CommonJS是node 独有的规范
- module.exports = value 或 exports.xxx = value - 暴露模块
- require(xxx) - 引入模块
3. AMD
 AMD是由RequireJS提出的
 - define

 ## promise
 promise 是ES6新增的语法，是一种异步编程的解决方案

 ## 节流和防抖
 ### 节流 - 按照设定的时间固定执行一次函数
```javascript
function throttle (func, wait) {
  let timeout;
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        console.log('节流')
        func.apply(this, arguments)
      }, wait)
    }
  }
}
```
 ### 防抖 - 在抖动停止后的固定时间执行一次函数 实例： input 验证、搜索
 ```javascript
 function debounce (func, wait) {
   let timeout;
   return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, wait)
   }
 }
 ```