# MVVM模式
## 对于MVVM的理解

**面向dom开发(MVC)**

**面向数据进行开发(MVVM)**
 1. M层
 2. V层
 3. VM层

 **vue实现：**
- Object.defineProperty()
- 虚拟DOM

# 生命周期函数
- beforeCreate(创建前)
- created (创建后)  ```data数据初始化```
- beforeMount(载入前)  ```<div id="app"></div> ```在挂载开始之前被调用
```加载dom```
- mounted (载入后)  ```<div>hello word!</div>```
```js
// mounted 不会承诺所有的子组件也都一起被挂载
// 除非使用 vm.$nextTick 
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```
- beforeDestroy (销毁前) 什么时候将被触发? 当实例被销毁之后（vm.$destroy()），会触发beforeDestroy,destroyed这两个函数
- destroyed (销毁后)
- beforeUpdate (更新前) 当数据发生改变。页面还没重新渲染之前触发
- updated (更新后) 当数据发生改变。页面重新渲染之后触发

## 计算属性：
  **当计算属性依赖的值发生改变时，触发计算属性函数**,否则不会触发该函数

  ### 计算属性方法：
  ```js
  computed: {
    fullName: {
        // 计算属性有缓存机制
        get: function () {
            return this.firstName + ' ' + this.lastName;
        },
        set: function (newValue) {
            var names = newValue.split(' ');
            this.firstName = names[0];
            this.lastName = names[names.length - 1];
        }
    }
  }

  // 更改fullName,setter会被调用,vm.firstName以及vm.lastName也会相应的发生改变
  vm.fullName = 'cassie liu';

  method: {
      // 没有缓存,性能低
  }

  watch: {
      // 有缓存,依赖属性发生改变，则会触发
  }
  ```

  **vue会复用页面的dom**
  利用key来破环这种复用(两个元素是完全独立的，不要复用它们)

```js
    <div v-if="show">
        用户名：<input placeholder="Enter your username" />
    </div>
    <div v-else>
        邮箱：<input placeholder="Enter your email address" />
    </div>
    <div v-on:click="changeShow()">切换</div>
    data: {
        return {
            show: false
        }
    },
    methods: {
        changeShow () {
            this.show = true
        }
    }

    // 当用户输入邮箱后，调用changeShow()函数，标签变为用户名，可input内容没有被清空。
    // 存在上面的问题的原因是：vue会复用页面的dom

    // 解决方案
    // 利用key来破环这种复用(两个元素是完全独立的，不要复用它们)
    用户名：<input placeholder="Enter your username" key="username-input" />
    邮箱：<input placeholder="Enter your email address" key="email-input" />
    // 结果：input输入框重新渲染
```

## Vue.set() && vm.$set()
```js
// 遍历数组
<li v-for="(item, index) in lists" :key="item.id" >{{ item }}</li>
// 改变数组的某一项(引用, splice()等方法, set方法)
Vue.set(vm.lists, 1, 'shanxi');
// 等效
vm.$set(vm.lists, 1, 'shanxi');

// 遍历对象
<li v-for="(item, key, index) of lists">{{ item }}</li>

// 改变对象(引用, set方法)
Object.assign({}, vm.lists, {
  age: 27,
  address: 'shanxi'
})
// 通过Vue.set()改变对象
// vm.$set() 
Vue.set(vm.lists, 'address', 'shanxi');
// 等效
vm.$set(vm.lists, 'address', 'shanxi');
```

## 组件相关的小细节

**is的使用**
如果直接使用组件```<row></row>```会存在组件与table同级渲染。所以我们使用```is```属性，在保证组件内容正常显示的同时，不会破坏html原有结构
```<table></table>```
```<select></select>```
```<ul></ul>```
等固定格式的html结构应使用```is```属性来加载组件,eg: ```<tr is="row"></tr>```

```js
<div id="app">
    <table>
        <tbody>
            <row></row>
            <tr is="row"></tr>
        </tbody>
    </table>
</div>
<script>
    Vue.component('row', {
        template: '<tr><td>this is a row</td></tr>'
    });
    var app = new Vue({
        el: '#app'
    });
</script>
```

**子组件内定义data必须是function**

```js
Vue.component('counter', {
    data() {
        return {
            number: 0
        }
    }
});
```

**this.$refs的使用**
```js
// 使用场景1
// 在html标签上使用
// this.$refs 获取html里所有的引用
// this.$refs.hello 获取引用是hello的dom元素（标签对应的dom元素）
<div id="app">
    <div ref="hello" @click="handleClick" >hello word</div>
</div>

var app = new Vue({
    el: '#app',
    methods: {
            alert(this.$refs.hello.innerHTML);
        }
    }
})
```

```js
// 使用场景2
// 在组件上使用
// this.$refs.one 获取子组件的引用
<div id="app">
    <counter ref="one" @change="handleChange" ></counter>
    <counter ref="two" @change="handleChange" ></counter>
    <div>{{total}}</div>
</div>

Vue.component('counter', {
    data() {
        return {
            number: 0
        }
    },
    template: '<div @click="addNum">{{number}}</div>',
    methods: {
        addNum: function () {
            this.number ++;
            // 子组件向父组件通信
            this.$emit('change');
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        total: 0,
    },
    methods: {
        handleChange: function () {
            this.total = this.$refs.one.number + this.$refs.two.number
        }
    },
})
```

## 父子组件的数据传递
由于```单向数据流```的概念，父组件可以向子组件传递参数，子组件不能修改父组件传递过来的参数

**props**

```js
// props
// 父组件通过属性的方式将数据传递给子组件
<div id="app">
    <count :count="1" @inc="handleInc" ></count>
    <count :count="2" @inc="handleInc" ></count>

    <div>{{total}}</div>
</div>

var count = {
    props: ['count'],
    data: function() {
        return {
            num: this.count
        }
    },
    template: '<div @click="clickCount">{{num}}</div>',
    methods: {
        clickCount: function () {
            this.num = this.num + 2;
            this.$emit('inc', 2)
        }
    },
}

var app = new Vue({
    el: '#app',
    components: {
        count: count
    },
    data: {
        total: 3
    },
    methods: {
        handleInc: function (step) {
            this.total += step
        }
    },
})
```
**$emit**
**子组件通过事件的形式给父组件传递信息**

## 组件参数校验
```js
Vue.component('child', {
    props: {
        content: String,
        num: Number,
        description: [Number, String],
        count: {
            type: Number,
            required: true,
            default: 'default value',
            validator: function (value) {
                return (value.length > 5 )
            }
        }
    }
})

```

## 给组件绑定原生事件

```js
// 在组件上直接调用@click事件，该事件为自定义事件。需要子组件使用@click事件之后用$emit传递到父组件
<div id="app">
    <child @click="handleClick" ></child>
</div>

var child = {
    template: '<div @click="clickFunction">child</div>',
    methods: {
        clickFunction: function () {
            this.$emit('click')
        }
    },
}

var app = new Vue({
    el: '#app',
    components: {
        child: child
    },
    methods: {
        handleClick: function () {
            alert('click')
        }
    },
})
```
**@click.native**

```等效于,直接使用@click.native,给组件绑定原生的点击事件```
```js
<div id="app">
    <child @click.native="handleClick" ></child>
</div>

var child = {
    template: '<div>child</div>'
}

var app = new Vue({
    el: '#app',
    components: {
        child: child
    },
    methods: {
        handleClick: function () {
            alert('click')
        }
    },
})
```

## 非父子组件间的传值

```父组件通过props向子组件传值，子组件通过事件触发向父组件传值```

- 方案一
**vuex**

- 方案二
**发布订阅模式/观察者模式/总线**

```js
// 功能
// 点击cassie, 兄弟节点同时也跟着改变
// 不同组件之间也可以使用 this.bus.$on('change', function(msg) {}) 进行值传递
<div id="app">
    <children content="cassie"></children>
    <children content="liu"></children>
</div>

Vue.prototype.bus = new Vue();
Vue.component('children', {
    data: function () {
        return {
            selfContent: this.content
        }
    },
    props: {
        content: String
    },
    template: '<div @click="changeContent">{{selfContent}}</div>',
    methods: {
        changeContent: function () {
            this.bus.$emit('change', this.selfContent)
        }
    },
    // 被挂载的时候,执行的生命钩子
    mounted: function () {
        var _this = this
        this.bus.$on('change', function (msg) {
            _this.selfContent = msg;
        })
    }
})
```

## 在vue中使用插槽

### 插槽
组件的起始标签和结束标签之间的内容，要正常输出，因此要使用插槽

### 具名插槽(多个插槽)
- 插槽处声明
```<div class="header" slot="header">header</div>```
- 模板中使用
```<slot name="header"></slot>```
```js
// 如果 ```<body-content>``` 没有包含一个 ```<slot>``` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃
<body-content>
    <div class="header" slot="header">header</div>
    <div class="footer" slot="footer">footer</div>
</body-content>

Vue.component('body-content', {
    template: `<div>
                    <slot name="header">default slot</slot>
                    <div>content</div>
                    <slot name="footer"></slot>
                </div>`
});
```

## vue中的作用域插槽
**应用场景：**
    当子组件作循环或者某一部分dom由父组件决定时
```js
<scope-content>
    <template slot-scope="content">
        <li>{{content.item}} -- hello</li>
    </template>
</scope-content>

// 作用域插槽
Vue.component('scope-content', {
    data: function() {
        return {
            list: [1, 2, 3, 4]
        }
    },
    template: `<div>
                    <ul>
                        <slot
                            v-for="item in list"
                            :item="item"
                        >
                        </slot>
                    </ul>
                </div>`
});
```
### vue2.6.0使用v-slot指令取代slot和slot-scope

#### vue2.5.0 vs vue2.6.0

**vue2.5.0具名插槽**
- 插槽处声明
```<div class="header" slot="header">header</div>```
- 模板中使用
```<slot name="header"></slot>```

**vue2.6.0具名插槽**
- 插槽处声明
```<template v-slot:header><div class="header">header</div></template>```
- 模板中使用
```<slot name="header"></slot>```

**vue2.5.0作用域插槽**
- 由```<template></template>```标签包裹
- 属性值```slot-scope="content"```

**vue2.6.0作用域插槽**
- 多个插槽
```js
<scope-content>
    <template v-slot:default="content">
        {{content.item}}
    </template>
    <template v-slot:other="otherSlotProps">
        {{otherSlotProps.content}}
    </template>
</scope-content>
```
- 独占默认插槽
```<scope-content v-slot:default="content">{{content.item}}</scope-content>```
```<scope-content v-slot="content">{{content.item}}</scope-content>```

## 动态组件与v-once指令

```动态组件 <component :is="type" ></component>```需要根据数据的类型，动态渲染不同的场景，即组件类型不确定
```v-once 第一次加载,放入内存,再次加载时，只需要从内存中读取即可```
```v-once可以有效的提高静态内容的展示效率,从而提高性能```

```js
<component :is="type" ></component>
<button @click="handleBtnClick" >切换</button>

Vue.component('child-one', {
    template: '<div v-once>child-one</div>'
})

Vue.component('child-two', {
    template: '<div v-once>child-two</div>'
})

var app = new Vue({
    el: '#app',
    data: {
        type: 'child-one'
    }
    methods: {
        handleBtnClick: function () {
            this.type = this.type === 'child-one' ? 'child-two' : 'child-one'
        }
    },
})

```

## vue中css动画的原理


### html元素被transition标签包裹时,vue会自动构建动画流程

****
```js
<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.active {
    transform-origin: left center;
    animation: bounce-in 1s;
}

.leave {
    transform-origin: left center;
    animation: bounce-in 1s reverse;
}
</style>
// 在 CSS 过渡和动画中自动应用 class
<transition name="fade">
    <div v-if="show">hello word</div>
</transition>

// 自定义class名称
<transition 
    name="hello"
    enter-active-class="active"
    leave-active-class="leave"
>
    <div v-if="show">hello word enter-active-class</div>
</transition>

// animate.css 动画库
// <link rel="stylesheet" href="animate.css">
// 必须使用自定义class
// animated (必须class)

// 初始渲染的过渡
// appear
// appear-active-class
<transition 
    type="transition"
    name="animate"
    appear
    enter-active-class="animated swing"
    leave-active-class="animated shake"
    appear-active-class="animated swing"
>
    <div v-if="show">hello word animate.css</div>
</transition>
// 显示
// 动画开始,div元素增加class                  fade-enter fade-enter-active
// fade-enter
// fade-enter-active

// 动画开始第一帧,div元素删除fade-enter       fade-enter-active fade-enter-to
// del fade-enter
// fade-enter-to

// 动画结束,还原
// del fade-enter-active
// del fade-enter-to

// 隐藏
// fade-leave fade-leave-active

// fade-leave-active fade-leave-to

// 还原
var app = new Vue({
    el: '#app',
    data: {
        show: true
    }
    methods: {
        translationCss: function () {
            this.show = !this.show;
        }
    },
})
```
**初始渲染的过渡**
可以通过 ```appear``` 特性设置节点在初始渲染的过渡
- appear
- appear-active-class

**同时使用过渡和动画**
type = animation / transition,以哪种类型的执行时长为准

**过渡持续时间**
```<transition :duration="1000">...</transition>```
- enter 进入持续时间
- leave 移出持续时间
```<transition :duration="{ enter: 500, leave: 800 }">...</transition>```

## vue中js动画与Velocity.js

### JavaScript 钩子
```js
<script src="velocity.min.js"></script>
<transition 
    name="velocity"
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    @after-enter="handleAfterEnter"

    @before-leave="handleBeforeLeave"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
>
    <div v-if="show">js动画 velocity.js</div>
</transition>
<button @click="translationCss" >切换</button>

var app = new Vue({
    el: '#app',
    data: {
        show: true
    }
    methods: {
        translationCss: function () {
            this.show = !this.show;
        },
        // 进入中
        handleBeforeEnter: function (el) {
            el.style.color = 'red'
        },
        // 当与 CSS 结合使用时
        // 回调函数 done 是可选的
        handleEnter: function (el, done) {
            setTimeout(() => {
                el.style.color = 'blue'
            }, 2000)
            setTimeout(() => {
                done()
            }, 3000)
        },
        handleAfterEnter: function (el) {
            el.style.color = '#000'
        },

        handleBeforeLeave: function (el) {
            el.style.opacity = 0
        },
        handleLeave: function (el, done) {
            Velocity(el, {
                opacity: 1
            }, {
                duration: 1000,
                complete: done
            })
        },
        handleAfterLeave: function (el) {
            alert('动画结束')
        }
    },
})
```

## 多个元素的过渡

```js
<transition name="fade" mode="out-in">
    <div v-if="show" key="hello">hello</div>
    <div v-else key="bye">bye</div>
</transition>
<button @click="translationCss">切换</button>
```

### 过渡模式
- in-out：新元素先进行过渡，完成之后当前元素过渡离开

- out-in：当前元素先进行过渡，完成之后新元素过渡进入

**当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分**

## 多个组件的过渡

**多个组件的过渡简单很多 - 我们不需要使用 key 特性。相反，我们只需要使用动态组件：**

```js
<transition name="fade" mode="out-in">
    <fade-child v-if="show"></fade-child>
    <fade-child-one v-else></fade-child-one>
</transition>

<transition name="fade" mode="out-in">
    <component :is="ComponentType" ></component>
</transition>

<button @click="translationCss" >切换</button>
<button @click="translationComponent" >多个组件的过渡</button>

 Vue.component('fade-child', {
    template: '<div>fade-child</div>'
})

Vue.component('fade-child-one', {
    template: '<div>fade-child-one</div>'
})

var app = new Vue({
    el: '#app',
    data: {
        show: true,
        type: 'fade-child'
    }
    methods: {
        translationCss: function () {
            this.show = !this.show;
        },
        translationComponent: function () {
            this.ComponentType = this.ComponentType === 'fade-child' ? 'fade-child-one' : 'fade-child'
        }
    }
})
```

## 列表过渡

```<transition-group></transition-group>```

```js
<transition-group>
    <div v-for="item in list" :key="item.id" >
        {{item.content}}
    </div>
</transition-group>
<button @click="addList" >add</button>

var app = new Vue({
    el: '#app',
    data: {
        list: [],
        count: 0
    }
    methods: {
        addList: function () {
            this.list.push({
                id: this.count++,
                content: 'hello'
            })
        }
    }
})
```

## 封装动画

```js
<fade :show="show" >
    <h3>hello</h3>
</fade>
<button @click="translationCss" >切换</button>

Vue.component('fade', {
    props: ['show'],
    template: `<transition
                    @before-enter="handleBeforeEnter"
                    @enter="handleEnter"
                    @after-enter="handleAfterEnter"
                >
                    <slot v-if="show"></slot>
                </transition>`,
    methods: {
        handleBeforeEnter: function (el) {
            el.style.color = 'red'
        },
        handleEnter: function (el, done) {
            setTimeout(() => {
                el.style.color = 'blue'
            }, 2000)
            setTimeout(() => {
                done()
            }, 3000)
        },
        handleAfterEnter: function (el) {
            el.style.color = '#000'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        show: false
    }
    methods: {
        translationCss: function () {
            this.show = !this.show;
        }
    }
})
```