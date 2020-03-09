## css盒模型
1. 基本概念： 标准盒子 + IE盒子模型
    盒模型包含了元素的margin/border/padding/content(元素内容)
2. 标准模型与IE模型的区别
    **宽度/高度计算方式不同**
    - 标准盒子模型  width = content的宽度
                   height = content的高度
    - IE盒子模型    width = content的宽度 + padding + border
                   height = content的高度 + padding + border
3. css如何设置这两种模型
    - 标准盒模型
        box-sizing: content-box;(默认)
    - IE盒模型
        box-sizing: border-box;
4. js如何获取盒模型对应的宽和高
    - dom.style.width/height (适用于内联样式的宽高)
    - dom.currentStyle.width/height(只兼容IE浏览器)
    - widows.getComputedStyle(dom).width/height(兼容IE8以上的浏览器/火狐浏览器以及谷歌浏览器)
    - dom.getBoundingClientRect().width/height(兼容性最好)
5. 实例题(根据盒模型解释边据重叠)
6. BFC(边距重叠的解决方案)
    - BFC(块级格式化上下文)
    - BFC的原理
      1. 垂直方向发生重叠
      2. BFC区域不会与浮动元素的box发生重叠
      3. 它是一个独立的容器
      4. 计算BFC的高度时，浮动元素也参与计算
    - 如何创建BFC
      1. overflow 不为 visible
      2. display 的值是inline-block、table-cell、flex、table-caption或者inline-flex
      3. float 不为 none
      4. position 不为 static/relative
    - BFC的使用场景
      1. 创建BFC避免margin重叠
      2. BFC元素不与float元素重叠(自适应两栏布局)
      3. 清除浮动