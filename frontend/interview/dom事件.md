## DOM事件类
1. DOM事件级别
    - DOM0事件  el.onClick = function() {}
    - DOM2事件  el.addEventListener('click', function() {} ,  false)
                false （默认值）在冒泡阶段执行， true代表在捕获阶段执行
    - DOM3事件  el.addEventListener('keyup', function () {}, false)
2. 事件模型
    - 捕获（自上到下）
    - 冒泡（自下到上）
3. 事件流（三阶段）
    捕获 => 目标元素 => 冒泡
4. DOM事件捕获流程
    - 捕获流程
        window => document => html => body => ... => 目标元素
    - 冒泡流程
        目标元素 => ... => body => html => document => window

    通过```document.body```获取boby
    通过```document.documentElement```获取html
5. Event对象
    - event.preventDefault()  阻止默认事件
    - event.stopPropagation() 阻止冒泡事件
    - event.stopImmediatePropagation() 阻止事件冒泡，且在当前事件之后注册的其他事件都不会执行（存在事件响应优先级）
    - event.currentTartget()
    - event.tartget() 具体实例（事件委托）

### 事件委托（事件代理）
**利用事件冒泡，将子元素的事件委托给父元素进行事件处理**
```
<ul id="root">
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
</ul>
<script type="text/javascript">
    window.onload = function() {
        var oUl = document.getElementById('root');
        var aLi = oUl.children;
        console.log(aLi);
        
        //传统方法，li身上添加事件，需要用for循环，找到每个li
        for (var i=0;i<aLi.length;i++) {
            aLi[i].onmouseover = function() {
                this.style.background = 'red';
            }
            aLi[i].onmouseout = function(){
                this.style.background = '';
            }
        }//for结束
    }

    // 事件代理
    window.onload = function(){
        var oUl = document.getElementById('ul1');                
        oUl.onmouseover = function(ev){
            var ev = ev || window.event;
            var oLi = ev.srcElement || ev.target;
            oLi.style.background = 'red';                    
        }
        
        oUl.onmouseout = function(ev){
            var ev = ev || window.event;
            var oLi = ev.srcElement || ev.target;
            oLi.style.background = '';                    
        }
    }
</script>
```