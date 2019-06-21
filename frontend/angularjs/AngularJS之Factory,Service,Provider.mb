**依赖注入的优点**

 - 各模块之间的解耦，每个部分专注于自己的功能，对象的注入通过容器来完成
 - 避免全局对象的污染

**Provider**
```
// 语法糖
app.provider('myProvider', function () {
    this.$get = function () {
    };
});
```
是```唯一```一种你可以传进 ```.config() ```函数的 service。当你想要在 service 对象启用之前，先进行模块范围的配置，那就应该用 provider

```
app.provider('myProvider', function () {
	.config(function ($stateProvider, $couchPotatoProvider) {
        .state 'complaint',
	        parent: 'base'
	        url: '/build/complaint'
	        templateUrl: '/build/modules/complaint/index.html'
	        controller: complaintCtrl'
	        resolve:
	          l: $couchPotatoProvider.resolveDependencies(['modules/complaint/controllers/complaintCtrl'])
    })
    this.$get = function ($q, restService, $rootScope, $state, $timeout) {
    	provider = {}
        rvm = $rootScope
        function initComplaintMenu() {
        	var defered = $q.defer();
        	var promise = defer.promise;
        }
		
		rvm.$on('menu:init', function(event, user) {
	      initComplaintMenu().then(function(data) {
	        if (data.isEnabled) {
	          rvm.$broadcast('menu:add', { name: data.name, state: 'complaint', index: 6 })
	          $timeout(function(){
	            if ($state.current.name === 'detail') {
	              $('.navbar-menus a[ui-sref="complaint"]').addClass('active')
	            }
	          }, 0)
	        }
	      })
	    })
    };
});
```
**Factory**
当使用factory来创建服务的时候，相当于新创建了一个对象，然后在这个对象上新添属性，最后返回这个对象。当把这个服务注入控制器的时候，控制器就可以访问在那个对象上的属性了。
**语法糖**
```
app.factory('myFactory', function ($http) {
   var factory = {};
    return factory;
 });
 ```
通过factory方法创建的服务必须有返回值
```javascript
app.controller('myCtrl', ['$scope', 'myFactory', function ($scope, myFactory) {
     console.log(myFactory.getName());  
     myFactory.getData('./test.html').then(function (response) {
         console.log(response);  
     });
 }]);
 app.factory('myFactory', function ($http) {
     var factory = {};
     var _name = 'foo';
     factory.getData = function (url) {
         return $http({
             method: 'get',
             url: url
         });
     };
     factory.getName = function () {
         return _name;
     };
     return factory;
 });
```
**Service**
service 类似于一个构造器， 通过 new 关键字实例化对象，将一些属性和方法直接添加到 this 上，在创建 service 对象时，this 会被作为返回值返回。
**语法糖**
```
app.service('myService', function () {
 });
 ```
 **三种方法的比较**
 - 需要在config中进行全局配置的话，只能选择provider方法
 - factory和service是使用比较频繁的创建服务的方法。他们之间的唯一区别是：service方法用于注入的结果通常是new出来的对象，factory方法注入的结果通常是一系列的functions
 - provider是创建服务最为复杂的方法，除非你需要创建一个可以复用的代码段并且需要进行全局配置，才需要使用provider创建
 - 所有具有特定性目的的对象都是通过factory方法去创建
 
| 特性 | Factory    | Service | Provider      |
|:--------:| -------------:|--------:| -------------:|
| 是否可以依赖注入 | 是 | 是 | 是
| 是否依赖注入友好	 | 否 | 是 | 否
| 是否可在config中进行配置 |  否 | 否 | 是
| 是否可以创建函数 | 是 | 是 | 是
| 是否可以创建基本数据类型 |  是 | 否 | 是|

